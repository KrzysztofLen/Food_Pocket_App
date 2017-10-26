if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/serviceWorker.js')
			.then((registration) => {
				// Registration was successful
				console.log('%c [Service worker registered!]', 'color: #bada55', registration.scope);
			})
			.catch((err) => {
				console.log('%c [ServiceWorker registration failed]: ', 'color: #FF0006', err);
			});
	});
}
