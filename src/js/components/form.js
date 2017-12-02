const submitButton = document.querySelector('#pl-mobile-dictionary__submit'),
			 error = document.querySelector('.main-form__error-container');
const inputContainer = document.getElementsByClassName('main-form__input-container');
const input = document.getElementsByClassName('main-form__input');
console.log(input);
const inputFirst = document.querySelector('#product-name-input'),
	inputSecond = document.querySelector('#pl-mobile-dictionary__input-second'),
	form = document.querySelector('form');

// inputs
const productName = document.querySelector('#product-name-input');
const productDescription = document.querySelector('#product-description-input');
const productPrice = document.querySelector('#product-price-input');
const productType = document.querySelector('#product-type');

productType.addEventListener('change', function () {
	onChange();
	console.log(product);
});

const product = {
	id: new Date().toISOString(),
	productName: productName.value,
	productDesc: productDescription.value,
	productPrice: productPrice.value
};

function onChange() {
	let productTypeValue = productType.options[productType.selectedIndex].value;
	product.productType = productTypeValue;
}

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
	const productNameValue = productName.value;
	const productDescriptionValue = productDescription.value;
	const productPriceValue = productPrice.value;

	const regexp = new RegExp('^([a-z]{2,})$');

	if ((productNameValue === '') || (!regexp.test(productNameValue))) {
		showDangerMessage();
		inputContainer[0].classList.add('has-danger');
		inputContainer[1].classList.add('has-danger');
		inputContainer[2].classList.add('has-danger');
		input[0].classList.add('form-control-danger');
		input[1].classList.add('form-control-danger');
		input[2].classList.add('form-control-danger');
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
			productName: product.productName,
			productDesc: product.productDesc,
			productPrice: product.productPrice,
			productType: product.productType
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
				console.log(product);
				//Object with value from Input's
				const productObject = {
					id: product.id,
					productName: productName.value,
					productDesc: productDescription.value,
					productPrice: productPrice.value,
					productType: product.productType
				};
				// Save Data in IndexCB
				writeData('sync-data', productObject)
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

hideDangerMessage();
