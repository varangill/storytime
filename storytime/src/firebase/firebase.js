import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAmwDRoubN9yq_OyqPJkPGhphVH3J4zoSQ",
    authDomain: "storyline-9a9b2.firebaseapp.com",
    databaseURL: "https://storyline-9a9b2-default-rtdb.firebaseio.com/",
    projectId: "storyline-9a9b2",
    storageBucket: "storyline-9a9b2.appspot.com",
    messagingSenderId: "759495346730",
    appId: "1:759495346730:web:604ced3a71dc0e56459153",
    measurementId: "G-07EE54B2YT"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {database as default, firebase, googleAuthProvider};