// Your web app's Firebase configuration
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

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log('user created!');
        signupForm.reset();
        document.querySelector('.modal-overlay').remove();
        
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('open');
        });

    }).catch(err => {
        // alert(err.message);
        document.querySelector('.error').textContent = err.message;
        console.log(err);
    });
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        loginForm.reset();
        document.querySelector('.modal-overlay').remove();
        
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('open');
        });
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    // auth.signOut().then(() => {
    //     console.log('the user has signed out');
    // });
});