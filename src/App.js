import React, { useState, useEffect } from "react";
import { projectFirestore,firebaseAuth } from "./base";
import { Switch, Route, Link} from "react-router-dom";
import { Album } from "./Album/Album";    
import { Home } from "./Home";

const db = projectFirestore;

function App() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const unmount = db.collection("users/"+firebaseAuth.currentUser.uid+"/albums").onSnapshot((snapshot) => {
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
