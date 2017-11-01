const navElements = document.querySelectorAll('.pl-mobile-dictionary__menu li a');

function addActive() {
	for (let i = 0; i < navElements.length; i++) {
		navElements[i].classList.remove('active');
	}
	this.classList.toggle('active');
}

navElements.forEach(link => link.addEventListener('click', addActive));
