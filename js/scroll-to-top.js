(function() {

    const scrollToTopButton = document.querySelector('.scroll-top-button');

    function scrollToTop() {
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
    }

    scrollToTopButton.addEventListener('click', scrollToTop);

    window.addEventListener('scroll', function() {
        if(this.pageYOffset > 50) {
            scrollToTopButton.style.opacity = '1';
        } else {
            scrollToTopButton.style.opacity = '0';
        }
    });

})();