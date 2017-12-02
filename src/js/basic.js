/* global document */
import anime from 'animejs';

(function () {
	const tabNav = document.getElementById('tabs-nav');
	const sideNav = document.querySelector('.cd-side-navigation-left');

	const tabContent = document.querySelectorAll('section');


    // Initialize Firebase
	const config = {
		apiKey: 'AIzaSyAKMHRDyIHpLTLwZH0I1g8FoFoHWfXGY-4',
		authDomain: 'english-56ed3.firebaseapp.com',
		databaseURL: 'https://english-56ed3.firebaseio.com',
		projectId: 'english-56ed3',
		storageBucket: 'english-56ed3.appspot.com',
		messagingSenderId: '634027372852'
	};



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
		};

		window.onload = function () {
			animation();
			resizeContent();
		};

		window.onresize = () => {
			animation();
			resizeContent();
		}
	};


	hideTabNav();

})();

