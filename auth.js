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