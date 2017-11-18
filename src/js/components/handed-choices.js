class Chosen {
	constructor(body, content, choiceButtons, sideNavigation) {
		this.body = body;
		this.content = content;
		this.choiceButtons = choiceButtons;
		this.sideNavigation = sideNavigation;

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
		let _this = this;
		const getAllCookies = Cookies.get();
		const [ CookieName ] = Object.keys(getAllCookies);
		// const nav = document.querySelector('.cd-side-navigation-left');

		if (Object.keys(getAllCookies).length === 0 && getAllCookies.constructor === Object) {
			console.log('%c [Cookies]: empty', 'color: #0288D1');
			this.body.classList.add('full-overlay');
			this.content.style.opacity = 1;
		} else {
			this.content.style.display = 'none';
			console.log('%c [Cookies]: not empty', 'color: #ff600c', getAllCookies);

			if(CookieName === 'Menu-is-for-rightHanded-handed') {
				_this.sideNavigation.classList.remove('cd-side-navigation-left');
				_this.sideNavigation.classList.add('cd-side-navigation-right');
			}
		}
	}

	sideChoice() {
		let _this = this;
		// const nav = document.querySelector('.cd-side-navigation-left');

		this.choiceButtons.forEach(_btn => {
			_btn.addEventListener('click', (e) => {

				_this.removeOverlay();

				if (e.target.dataset.button === 'right') {
					_this.setCookie('rightHanded');
					_this.sideNavigation.classList.remove('cd-side-navigation-left');
					_this.sideNavigation.classList.add('cd-side-navigation-right');

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
