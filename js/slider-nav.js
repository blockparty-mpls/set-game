(function() {
	const toggler = document.querySelector('.slider-menu__toggler');
	const menu = document.querySelector('.slider-menu');
	const spanTogglers = document.querySelector('.slider-menu__toggler span');
	const menuItems = document.querySelectorAll('a[href^="#section"]');

	// Helper Function - check for all children of an element
	function isDescendantOrSelf(parent, child) {
		let node = child;
		while (node != null) {
			if (node == parent) {
				return true;
			}
			node = node.parentNode;
		}
		return false;
	}
	/*
	 * Toggles on and off the 'active' class on the menu
	 * and the toggler button, and the 'dimmed' class on the body
	 */
	function toggleMenuClasses() {
		toggler.classList.toggle('active');
		menu.classList.toggle('active');
		document.body.classList.toggle('dimmed');
	}
	toggler.addEventListener('click', () => {
		toggleMenuClasses();
	});
	menuItems.forEach(item => {
		item.addEventListener('click', () => {
			if(-1 !== menu.className.indexOf('active')) {
				toggleMenuClasses();
			}
		});
	});
	
	// Close the slider menu if a click is not the parent node or any of its children
	window.addEventListener('mouseup', function (event) {
		const root = menu;
		console.log(event.target.tagName);
		if (-1 !== toggler.className.indexOf('active') && !isDescendantOrSelf(root, event.target) && event.target != spanTogglers && event.target != toggler && event.target.tagName != 'A') {
			toggleMenuClasses();
		}
	});
})();