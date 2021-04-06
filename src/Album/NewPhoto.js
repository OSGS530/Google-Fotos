import React, {useState} from 'react'
import firebase from 'firebase'
import {projectStorage, projectFirestore} from '../base'

const db = projectFirestore;
const storage = projectStorage;

export const NewPhoto = ({currentAlbum}) => {
  const [file, setFile] = useState(null)

  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const onUpload = async () => {
    const storageRef = storage.ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    db.collection("albums").doc(currentAlbum).update({
      images: firebase.firestore.FieldValue.arrayUnion({
        name: file.name,
        url: await fileRef.getDownloadURL()
      })
    })
  }

  return <>
    <footer align="center">
    <input id="inp" type="file" onChange={onFileChange}/>
    <button onClick={onUpload}>Cargar imagen</button>
    </footer>
  </>
}