/* global document */
// import './utility.js';

(function () {

	const inputContainer = document.getElementsByClassName('pl-mobile-dictionary__input-container');
	const input = document.getElementsByClassName('pl-mobile-dictionary__input');

	const submitButton = document.querySelector('#pl-mobile-dictionary__submit');
	const inputButton = document.querySelector('#pl-mobile-dictionary__input'),
		  inputButton1 = document.querySelector('#pl-mobile-dictionary__input1'),
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

	// firebase.initializeApp(config);

	function hideDangerMessage() {
		error.classList.add('hide');
	}

	function showDangerMessage() {
		error.classList.remove('hide');
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

	function displayErrorMessage(event) {
		const inputValue = inputButton.value;
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
				term: inputButton.value,
				term1: inputButton1.value
			})
		})
			.then(function (res) {
				console.log('[Send data]', res);
				updateUI();
			});
	}

	// function writeData(st, data) {
	// 	return dbPromise
	// 		.then(function(db) {
	// 			var tx = db.transaction(st, 'readwrite');
	// 			var store = tx.objectStore(st);
	// 			store.put(data);
	// 			return tx.complete;
	// 		});
	// }

	// var dbPromise = idb.open('data-store', 1, function (db) {
	// 	if (!db.objectStoreNames.contains('sync-data')) {
	// 		db.createObjectStore('sync-data', {keyPath: 'id'});
	// 	}
	// });

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		keyPressed;

		if('serviceWorker' in navigator && 'SyncManager' in window) {
			navigator.serviceWorker.ready
				.then(function (sw) {
					// Object with value from Input's
					const english = {
						id: new Date().toISOString(),
						term: inputButton.value,
						term1: inputButton1.value
					};
					// Save Data in IndexCB
					writeData('sync-data', english)
						.then(() => {
							return sw.sync.register('sync-new-english');
						})
						.then(() => {
							console.log('%c [From IndexDB]: Successfully saved data', 'color: #bada55');
						})
						.catch(function(err) {
							console.log('%c [Error from IndexDB]: ', 'color: #FF0006', err);
						});
				});
		} else {
			// Without background-sync
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

