import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDbSew2HvE1U0lWF3TKDHO6QlduJqlPQkU",
    authDomain: "bt3103-week-6-3f42a.firebaseapp.com",
    projectId: "bt3103-week-6-3f42a",
    storageBucket: "bt3103-week-6-3f42a.appspot.com",
    messagingSenderId: "977067010388",
    appId: "1:977067010388:web:3101ce087bfe5ef8cd40c1",
    measurementId: "G-TZ0CZCYWRX"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;