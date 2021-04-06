import React, { Component } from "react"
import "../App.css"
import "./Login.css"
import { Link } from 'react-router-dom';
import {firebaseApp,firebaseAuth,facebookAuthProvider} from '../base'
import App from "../App"

class Login extends Component {
  state = { isSignedIn: false }
  uiConfig = {
  signInOptions: [
    facebookAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: '/signedIn',  
  callbacks: {
      signInSuccess: () => false
  }
}

  componentDidMount = () => {
    firebaseApp.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  socialLogin = async (provider) =>   {
    provider.addScope('public_profile')
    provider.addScope('email')
    await firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        if (result != null) {
          console.log(result);
        }
      })
      .catch(error => {
        alert("Intentelo nuevamente");
      });
  }
  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <nav class="navbar">
            <Link to="/" className="linkbanner">GOOGLE FOTOS</Link>
            <button onClick={() => firebaseAuth.signOut()}>Salir</button>
            <h3 className="linkbanner">{firebaseAuth.currentUser.displayName}</h3>
            <img
              alt="profile picture"
              src={firebaseAuth.currentUser.photoURL}
            />
            </nav>
            <App />
          </span>
        ) : (
          <button
            onClick={() => this.socialLogin(facebookAuthProvider)}
          >Iniciar sesion con facebook</button>
        )}
      </div>
    )
  }
}

export default Login
