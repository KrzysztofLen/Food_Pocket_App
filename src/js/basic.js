/* global document */
(function () {

	const inputContainer = document.getElementsByClassName('pl-mobile-dictionary__input-container');
	const input = document.getElementsByClassName('pl-mobile-dictionary__input');

	const submitButton = document.querySelector('#pl-mobile-dictionary__submit');
	const inputButton = document.querySelector('#pl-mobile-dictionary__input'),
		  form = document.querySelector('form');

	const dangerMsg = $('.pl-mobile-dictionary__error-message-container');

    // Initialize Firebase
	const config = {
		apiKey: 'AIzaSyAKMHRDyIHpLTLwZH0I1g8FoFoHWfXGY-4',
		authDomain: 'english-56ed3.firebaseapp.com',
		databaseURL: 'https://english-56ed3.firebaseio.com',
		projectId: 'english-56ed3',
		storageBucket: 'english-56ed3.appspot.com',
		messagingSenderId: '634027372852'
	};

	// firebase.initializeApp(config);

	function hideDangerMessage() {
		dangerMsg.addClass('hide');
	}

	submitButton.addEventListener('click', (e) => {
		displayErrorMessage(e);
	});

	const keyPressed = (e) => {

		if(e.code === 'Enter') {
			displayErrorMessage(e);
		}
		return;
	}

	// submitButton.addEventListener('keypress', keyPressed);
	// inputButton.addEventListener('keypress', keyPressed);


	function displayErrorMessage(event) {
		const inputValue = $('#pl-mobile-dictionary__input').val();
		const regexp = new RegExp('^([a-z]{2,})$');

		if ((inputValue === '') || (!regexp.test(inputValue))) {
			dangerMsg.removeClass('hide');
			inputContainer[0].classList.add('has-danger');
			input[0].classList.add('form-control-danger');
			event.preventDefault();
		} else {
			console.log('[Message send]');
		}
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
				term: inputWord.value
			})
		})
			.then(function (res) {
				console.log('[Send data]', res);
			});
	}

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		keyPressed;

		if('serviceWorker' in navigator && 'SyncManager' in window) {
			navigator.serviceWorker.ready
				.then(function (sw) {
					const english = {
						id: new Date().toISOString(),
						term: inputWord.value
					};
					sw.sync.register('sync-new-english');
				});
		} else {
			sendData();
		}
	});

    // Added to DB
	// const database = firebase.database();

	// function writeUserData(userId, name, email) {
	// 	database.ref('/' + userId).set({
	// 		username: name,
	// 		email
	// 	});
	// }

	// writeUserData(2, 'Maciej', 'maciej@gmail.com');

    // Read from DB
	// const ref = firebase.database().ref();

	// ref.on('child_added', data => {
	// 	const user = data.val();
	// 	console.log(user);
	// 	console.log('name: ' + user.email);
	// 	console.log('age: ' + user.username);
	// }, error => {
	// 	console.log('Error: ' + error.code);
	// });

	hideDangerMessage();
})();

