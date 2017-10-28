importScripts('/js/vendor/idb.js');
importScripts('/js/utility.js');

self.addEventListener('install', (event) => {
	console.log('%c [Service Worker]: Installing Service Worker ...', 'color: #bada55', event);
});

self.addEventListener('activate', (event) => {
	console.log('%c [Service Worker]: Activating Service Worker ...', 'color: #bada55', event);
});

self.addEventListener('sync', (event) => {
	console.log('%c [Service Worker] Background syncing', 'color: #bada55', event);

	if(event.tag === 'sync-new-english') {
		console.log('%c [Service Worker] Syncing new Data', 'color: #bada55');
		event.waitUntil(
			readAllData('sync-data')
				.then((data) => {
				// Loop through all data in indexDB
				for(var dt of data) {
					console.log('%c [IndexDB] All objects from DB: ', 'color: #bada55', dt);
					fetch('https://english-56ed3.firebaseio.com/english.json', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json'
						},
						body: JSON.stringify({
							id: dt.id,
							term: dt.term,
							term1: dt.term1
						})
					})
						.then(function (res) {
							console.log('%c [Data send]', 'color: #bada55', res);
							if(res.ok) {
								deleteItemFromData('sync-data', dt.id); // Isn't working correctly!
							}
						})
						.catch(function(err) {
							console.log('%c [Error while sending data]', 'color: #bada55', err);
						});
					}
				})
		)
	}
});
