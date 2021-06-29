import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDVFLSbgX8id8ZiZGWX9BJPT07qmrjt81Y",
  authDomain: "first-react-test-database.firebaseapp.com",
  databaseURL: "https://first-react-test-database-default-rtdb.firebaseio.com",
  projectId: "first-react-test-database",
  storageBucket: "first-react-test-database.appspot.com",
  messagingSenderId: "274259070620",
  appId: "1:274259070620:web:aa1fe2f7b05d2dba126759",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { storage, auth, provider };
export default db;
