class Chosen {
	constructor(body, content, choiceButtons) {
		this.body = body;
		this.content = content;
		this.choiceButtons = choiceButtons;

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

		Cookies.set(cookieName, cookieValue, {expires: expirationDate});
	}

	getCookie() {
		const getAllCookies = Cookies.get();

		if (Object.keys(getAllCookies).length === 0 && getAllCookies.constructor === Object) {
			console.log('%c [Cookies]: empty', 'color: #0288D1');
			this.body.classList.add('full-overlay');
			this.content.style.opacity = 1;
		} else {
			this.content.style.display = 'none';
			console.log('%c [Cookies]: not empty', 'color: #ff600c', getAllCookies);
		}
	}

	sideChoice() {
		let _this = this;

		this.choiceButtons.forEach(_btn => {
			_btn.addEventListener('click', (e) => {

				_this.removeOverlay();

				if (e.target.dataset.button === 'right') {
					_this.setCookie('rightHanded');
				} else {
					_this.setCookie('leftHanded');
				}

			})
		});
	}

	init() {
		this.sideChoice();
		this.getCookie();
	}
}

export {Chosen};
