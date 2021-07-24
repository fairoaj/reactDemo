import React from "react"
import "firebase/storage";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDxhzZ8YG7-SXSgxTp-On7dD2u4IpNaPc0",
    authDomain: "reactpractice-bd8f0.firebaseapp.com",
    databaseURL: "https://reactpractice-bd8f0-default-rtdb.firebaseio.com",
    projectId: "reactpractice-bd8f0",
    storageBucket: "reactpractice-bd8f0.appspot.com",
    messagingSenderId: "133549737441",
    appId: "1:133549737441:web:2b64dc7edbbaafec117ea0",
    measurementId: "G-4C4VM66C9E"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);

