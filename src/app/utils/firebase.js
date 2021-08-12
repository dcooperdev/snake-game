import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAigzE7gJ9eDW642jb6VZSOGmgVQbHCnVs",
    authDomain: "react-user-roles.firebaseapp.com",
    projectId: "react-user-roles",
    storageBucket: "react-user-roles.appspot.com",
    messagingSenderId: "139892312344",
    appId: "1:139892312344:web:ba62ed7ffa7de0ef32b66d"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
