// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBoNDPoBUzEVcgU3gwyysYVcUcMHcVvLV4",
    authDomain: "nik-and-ryan.firebaseapp.com",
    databaseURL: "https://nik-and-ryan.firebaseio.com",
    projectId: "nik-and-ryan",
    storageBucket: "nik-and-ryan.appspot.com",
    messagingSenderId: "908495731606",
    appId: "1:908495731606:web:d277c8e0407ab192adfbb7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();