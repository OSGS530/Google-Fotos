import React, { useState, useEffect } from "react";
import { projectFirestore} from "./base";
import { Switch, Route} from "react-router-dom";
import { Album } from "./Album/Album";    
import { Home } from "./Home";
//import Login from "./Login/Login";
//import Register from "./Register/Register";


const db = projectFirestore;

function App() {
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
    <>
      <Switch>
        <Route exact path="/" render={() => <Home albums={albums}/>}/>
        <Route path="/:album" component={Album} />
      </Switch>
    </>
  );
}

export default App;
