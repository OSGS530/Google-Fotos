import firebase from 'firebase';

var firebaseConfig = {
  projectId: "fotos-57ce6",
  appId: "1:424821634498:web:ca01a89f44b870622d125b",
  storageBucket: "fotos-57ce6.appspot.com",
  locationId: "us-central",
  apiKey: "AIzaSyCMIxABGIDftHZOAMPg-q1dIf03oeRocww",
  authDomain: "fotos-57ce6.firebaseapp.com",
  messagingSenderId: "424821634498",
  measurementId: "G-BGX2BCY702"
};

const firebaseApp  = firebase.initializeApp(firebaseConfig);

const projectStorage = firebaseApp.storage();
const projectFirestore = firebase.firestore();
const firebaseAuth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, firebase,projectFirestore, firebaseAuth,timestamp, firebaseApp,googleAuthProvider};

