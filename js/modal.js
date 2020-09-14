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
var span = document.getElementsByClassName("modal__close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
  }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}