// listen for auth status changes
auth.onAuthStateChanged(user => {
    console.log(user);
    if(user) {
        console.log('user logged in: ', user.email);
        setupUI(user);
    } else {
        console.log('user logged out');
        setupUI();
    }
});

// get the UI elements from the dom
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const profileLink = document.getElementById('profile');
const profileContent = document.getElementById('profile-content');

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value.trim();
    const password = signupForm['signup-password'].value.trim();

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {

        const username = signupForm['signup-username'].value.trim().toString();
        const user = firebase.auth().currentUser;

        if(user){
            user.updateProfile({
                displayName: username
            }).then(
                (res)=> setupUI(user)
            )
        }        

    }).then(() => {

        console.log('user created!');
        signupForm.reset();
        document.querySelector('.modal-overlay').remove();
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('open');
        });

    }).catch(err => {
        document.querySelector('.error').textContent = err.message;
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
    const modalElement = document.getElementById('modal-logout');
    modalOverlayElement = `<div class="modal-overlay"></div>`;
    // log the user out then display the logout message modal and exit game if playing
    if(isPlayingGame) {
        if(confirm('Do you want to exit the game?')) {
            showHomeScreen();
            auth.signOut().then(() => {
                modalElement.insertAdjacentHTML('afterend', modalOverlayElement);
                modalElement.classList.toggle('open');
                modalElement.classList.add('modal-fade-in');
            });
        } else {
            console.log('still playing the game');
        }
    } else {
        auth.signOut().then(() => {
            modalElement.insertAdjacentHTML('afterend', modalOverlayElement);
            modalElement.classList.toggle('open');
            modalElement.classList.add('modal-fade-in');
        });
    }
});

// hide/show UI elements depending on user state
const setupUI = (user) => {
    if(user) {
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
        // display username in nav
        profileLink.style.display = 'block';
        profileLink.innerText = user.displayName;
        // add user info to the profile modal
        profileContent.innerHTML = `
            <div class="text-center">
                <h4>${auth.currentUser.displayName}</h4>
                <p>${auth.currentUser.email}</p>
            </div>
        `;
    } else {
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
        // clear the user profile info
        profileContent.innerHTML = '';
    }
}