import React, { useState, useEffect} from "react";
import { projectFirestore} from "../base";
import { Switch, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Album } from "./Album";    
import { Home } from "../Home";
import "../App.css"

const db = projectFirestore;

function AlbumApp() {
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

export default AlbumApp;
