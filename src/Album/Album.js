import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { NewPhoto } from "./NewPhoto";
import { projectFirestore } from "../base";

const db = projectFirestore;

export const Album = () => {
  const [images, setImages] = useState([]);
  const [albumName, setAlbumName] = useState("");

  const match = useRouteMatch("/:album");
  const { album } = match.params;

  useEffect(() => { 
    const unmount = db.collection("albums")
      .doc(album)
      .onSnapshot((doc) => {
        setImages(doc.data().images || []);
        setAlbumName(doc.data().name);
      });
      return unmount
  }, [album]);

  return (
    <>
      <section>
        <header>
          <h1>{albumName}</h1>
        </header>
        {images.map((image) => (
          <aside key={image.name}>
            <img src={image.url} alt="album" />
          </aside>
        ))}
      </section>
      <footer>
        <NewPhoto currentAlbum={album} />
      </footer>
    </>
  );
};
