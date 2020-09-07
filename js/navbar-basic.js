(function() {

    const navbarBasic = document.querySelector(".navbar-basic");
    const navbarBasicToggle = navbarBasic.querySelector(".navbar-basic__toggle");

    function openMobileNavbar() {
        navbarBasic.classList.add("opened");
        navbarBasicToggle.setAttribute("aria-label", "Close navigation menu.");
    }

    function closeMobileNavbar() {
        navbarBasic.classList.remove("opened");
        navbarBasicToggle.setAttribute("aria-label", "Open navigation menu.");
    }

    navbarBasicToggle.addEventListener("click", () => {
    if (navbarBasic.classList.contains("opened")) {
        closeMobileNavbar();
    } else {
        openMobileNavbar();
    }
    });

    const navbarBasicMenu = navbarBasic.querySelector(".navbar-basic__menu");
    const navbarBasicLinksContainer = navbarBasic.querySelector(".navbar-basic__links");

    navbarBasicLinksContainer.addEventListener("click", (clickEvent) => {
        clickEvent.stopPropagation();
    });

    navbarBasicMenu.addEventListener("click", closeMobileNavbar);

    const navbarBasicItems = document.querySelectorAll('.navbar-basic__link');

    navbarBasicItems.forEach(item => {
        item.addEventListener('click', closeMobileNavbar);
    })

})();