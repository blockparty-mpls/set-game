// get all the modal click  elements in the dom
const modalClicks = document.querySelectorAll('.modal-click');
const modals = document.querySelectorAll('.modal');
const modalClose = document.querySelector('.modal__close');

modalClicks.forEach(modal => {
    modal.addEventListener('click', (e) => {
        let modalTarget = e.target.getAttribute('data-target');
        let modalElement = document.getElementById(modalTarget);
        modalOverlayElement = `<div class="modal-overlay"></div>`;
        modalElement.insertAdjacentHTML('afterend', modalOverlayElement);
        modalElement.classList.toggle('open');
    });
});

// When the user clicks on <span> (x), close the modal
modalClose.onclick = function () {
    modals.forEach(modal => {
        modal.classList.toggle('open');
    });
    document.querySelector('.modal-overlay').remove();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (e) {
    if (e.target.classList.contains('modal-overlay')) {
        modals.forEach(modal => {
            modal.classList.toggle('open');
        });
        e.target.remove();         
    }
}