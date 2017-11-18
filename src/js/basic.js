/* global document */
import anime from 'animejs';

(function () {
	const inputContainer = document.getElementsByClassName('pl-mobile-dictionary__input-container');
	const input = document.getElementsByClassName('pl-mobile-dictionary__input');
	const tabNav = document.getElementById('tabs-nav');
	const sideNav = document.querySelector('.cd-side-navigation-left');
	const submitButton = document.querySelector('#pl-mobile-dictionary__submit');
	const tabContent = document.querySelectorAll('section');

	const inputFirst = document.querySelector('#pl-mobile-dictionary__input-first'),
		  inputSecond = document.querySelector('#pl-mobile-dictionary__input-second'),
		  form = document.querySelector('form'),
		  error = document.querySelector('.pl-mobile-dictionary__error-message-container');

    // Initialize Firebase
	const config = {
		apiKey: 'AIzaSyAKMHRDyIHpLTLwZH0I1g8FoFoHWfXGY-4',
		authDomain: 'english-56ed3.firebaseapp.com',
		databaseURL: 'https://english-56ed3.firebaseio.com',
		projectId: 'english-56ed3',
		storageBucket: 'english-56ed3.appspot.com',
		messagingSenderId: '634027372852'
	};

	function hideDangerMessage() {
		error.classList.add('hide');
	}

	function showDangerMessage() {
		error.classList.remove('hide');
	}

	submitButton.addEventListener('click', e => {
		displayErrorMessage(e);
	});

	const keyPressed = e => {
		if (e.code === 'Enter') {
			displayErrorMessage(e);
		}
	};

	function displayErrorMessage(event) {
		const inputValue = inputFirst.value;
		const regexp = new RegExp('^([a-z]{2,})$');

		if ((inputValue === '') || (!regexp.test(inputValue))) {
			showDangerMessage();
			inputContainer[0].classList.add('has-danger');
			input[0].classList.add('form-control-danger');
			event.preventDefault();
		} else {
			console.log('[Message send]');
		}
	}

	function updateUI() {
		// Here will be code to update UI
	}

	function sendData() {
		fetch('https://english-56ed3.firebaseio.com/english.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				id: new Date().toISOString(),
				term: inputFirst.value,
				term1: inputSecond.value
			})
		})
			.then(res => {
				console.log('[Send data]', res);
				updateUI();
			});
	}

	form.addEventListener('submit', event => {
		event.preventDefault();
		keyPressed;

		if ('serviceWorker' in navigator && 'SyncManager' in window) {
			navigator.serviceWorker.ready
				.then(sw => {
					// Object with value from Input's
					const english = {
						id: new Date().toISOString(),
						term: inputFirst.value,
						term1: inputSecond.value
					};
					// Save Data in IndexCB
					writeData('sync-data', english)
						.then(() => {
							return sw.sync.register('sync-new-english');
						})
						.then(() => {
							console.log('%c [From IndexDB]: Successfully saved data', 'color: #bada55');
						})
						.catch(err => {
							console.log('%c [Error from IndexDB]: ', 'color: #FF0006', err);
						});
					form.reset();
				});
		} else {
			// Without background-sync
			sendData();
		}
	});

	/**
	 * @desc Hidden tab navigation
	 */

	const hideTabNav = () => {
		function animation() {
			let innerWidth = window.innerWidth;

			if(innerWidth >= 767) {
				tabNav.classList.add('hide');
				sideNav.classList.remove('hide');
				anime({
					targets: '#tabs-nav',
					translateY: -100,
					duration: 2500
				});
			} else {
				tabNav.classList.remove('hide');
				sideNav.classList.add('hide');
				anime({
					targets: '#tabs-nav',
					translateY: 0,
					duration: 3000
				});
			}
		}

		const resizeContent = () => {
			const [ CookieName ] = Object.keys(Cookies.get());
			let innerWidth = window.innerWidth;

			if((innerWidth >= 767) && (CookieName === 'Menu-is-for-leftHanded-handed')) {
				tabContent.forEach(_tabContent => {
					_tabContent.classList.add('column');
				});
			} else {
				tabContent.forEach(_tabContent => {
					_tabContent.classList.remove('column');
				});
			}
		}

		window.onload = function () {
			animation();
			resizeContent();
		}

		window.onresize = () => {
			animation();
			resizeContent();
		}
	}


	hideTabNav();

	hideDangerMessage();
})();

