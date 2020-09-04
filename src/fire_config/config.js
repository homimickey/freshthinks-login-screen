import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyDYr1ZhIyOVz_2zeetxIdC1jQfFB6qw58E",
    authDomain: "freshthinks-practice.firebaseapp.com",
    databaseURL: "https://freshthinks-practice.firebaseio.com",
    projectId: "freshthinks-practice",
    storageBucket: "freshthinks-practice.appspot.com",
    messagingSenderId: "555886493004",
    appId: "1:555886493004:web:3d19bb07a890e15eb1e3e9",
    measurementId: "G-P44QEB853D"
};

firebase.initializeApp(firebaseConfig);

export default firebase