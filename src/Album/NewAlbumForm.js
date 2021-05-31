 import React, { useState } from "react";
 import { projectFirestore } from "../base";

const db = projectFirestore;

export const NewAlbumForm = () => {
  const [albumName, setAlbumName] = useState("");

  const onAlbumNameChange = (e) => {
    setAlbumName(e.target.value);
  };

  const onAlbumCreate = () => {
    if (!albumName) {
      return;
    }
    db.collection("albums").doc(albumName).set({
      name: albumName,
    });
    setAlbumName("");
  };

  return (
    <>
    <footer align="center">
      <h3>Nombre del nuevo album:</h3>
      <input id="inp" value={albumName} onChange={onAlbumNameChange} type="text" />
      <button onClick={onAlbumCreate}>Crear album</button>
    </footer>
    </>
  );
};
