// get all the modal click  elements in the dom
// const modalClicks = document.querySelectorAll('.modal-click');

// modalClicks.forEach(modal => {
//     modal.addEventListener('click', (e) => {
//         console.log('modal clicked!');
//         console.log(e.target);
//         let modalTarget = e.target.getAttribute('data-target');
//         console.log(modalTarget);
//         document.getElementById(modalTarget).classList.add('open');
//         modalOverlay.style.display = 'block';
//     });
// });

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var modalClose = document.querySelector('.modal__close');

// When the user clicks the button, open the modal 
btn.onclick = function () {
    // create the modal overlay element
    modalOverlayElement = `<div class="modal-overlay"></div>`;
    modal.insertAdjacentHTML('afterend', modalOverlayElement);
    modal.classList.toggle('open');
}

// When the user clicks on <span> (x), close the modal
modalClose.onclick = function () {
    modal.classList.toggle('open');
    document.querySelector('.modal-overlay').remove();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (e) {
    if (e.target.classList.contains('modal-overlay')) {
        modal.classList.toggle('open');
        e.target.remove();         
    }
}