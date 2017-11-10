class Chosen {
	constructor(body, content, leftBtn, rightBtn) {
		this.body = body;
		this.content = content;
		this.leftBtn = leftBtn;
		this.rightBtn = rightBtn;

		this.init();
	}

	removeOverlay() {
		this.content.style.display = 'none';
		this.body.classList.remove('full-overlay');
		console.log('clicked');
	}

	setCookie(choice) {
		const cookieName = 'Menu-is-for-' + choice + '-handed';
		const cookieValue = choice;
		const expirationDate = 30;

		Cookies.set(cookieName, cookieValue, { expires: expirationDate });
	}

	rightChoose() {
		this.rightBtn.addEventListener('click', () => {
			this.removeOverlay();
			this.setCookie('rightHanded');
		});
	}

	leftChoose() {
		this.leftBtn.addEventListener('click', () => {
			this.removeOverlay();
			this.setCookie('leftHanded');
		});
	}

	init() {
		this.body.classList.add('full-overlay');
		this.rightChoose();
		this.leftChoose();
	}
}

export { Chosen };
