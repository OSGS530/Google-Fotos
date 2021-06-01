import React, { useState, useEffect, Component} from "react";
import { projectFirestore} from "./base";
import { Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Album } from "./Album/Album";    
import { Home } from "./Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { NewAlbumForm } from "./Album/NewAlbumForm";
import AuthService from "./services/auth.service";
import "./App.css"

const db = projectFirestore;

function AppTwo() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const unmount = db.collection("albums").onSnapshot((snapshot) => {
      const tempAlbums = [];
      snapshot.forEach((doc) => {
        tempAlbums.push({ ...doc.data(), id: doc.id });
      });
      setAlbums(tempAlbums);
    });
    return unmount;
  }, []);

  return (
    <main>
      <Switch>
        <Route exact path="/" render={() => <Home albums={albums}/>}/>
        <Route path="/:album" component={Album} />
      </Switch>
    </main>
  );
}

class App extends Component{
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
  
      this.state = {
        showModeratorBoard: false,
        showAdminBoard: false,
        currentUser: undefined,
      };
    }
  
    componentDidMount() {
      const user = AuthService.getCurrentUser();
  
      if (user) {
        this.setState({
          currentUser: user,
          showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
          showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        });
      }
    }
  
    logOut() {
      AuthService.logout();
    }
  
    render() {
      const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
      
      return(
        <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
          <Link to={"/"} className="navbar-brand">
            GoogleFotos
          </Link>
          <div className="navbar-nav mr-auto">

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  Agregar
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="navbar-brand">
                  {currentUser.username}
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Cerrar Sesion
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Iniciar Sesion
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Registrarse
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={AppTwo} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/user" component={NewAlbumForm} />
            <Route path="/mod" component={NewAlbumForm} />
            <Route path="/admin" component={NewAlbumForm} />
            <Route exact path="/:album" component={Album} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
