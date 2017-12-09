importScripts('/js/vendor/idb.js');
importScripts('/js/utility.js');

/*
/* @desc
REMEMBER TO SKIP ACTIVE SERVICE WORKER ###############################################
 */

self.addEventListener('install', event => {
	console.log('%c [Service Worker]: Installing Service Worker ...', 'color: #bada55', event);
});

self.addEventListener('activate', event => {
	console.log('%c [Service Worker]: Activating Service Worker ...', 'color: #bada55', event);
});

self.addEventListener('sync', event => {
	console.log('%c [Service Worker] Background syncing', 'color: #bada55', event);

	if (event.tag === 'sync-new-english') {
		console.log('%c [Service Worker] Syncing new Data', 'color: #bada55');
		event.waitUntil(
			readAllData('sync-data')
				.then(data => {
				// Loop through all data in indexDB
					for (var dt of data) {
						console.log('%c [IndexDB] All objects from DB: ', 'color: #bada55', dt);
						fetch('https://english-56ed3.firebaseio.com/english.json', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								'Accept': 'application/json'
							},
							body: JSON.stringify({
								id: dt.id,
								main: {
									productName: dt.productName,
									productDesc: dt.productDesc,
									productPrice: dt.productPrice
								},
								additional: {
									productType: dt.productType,
									productUnit: dt.productUnit,
									productWeight: dt.productWeight
								}
							})
						})
						.then(res => {
							console.log('%c [Data send]', 'color: #bada55', res);
							if (res.ok) {
								deleteItemFromData('sync-data', dt.id); // Isn't working correctly!
							}
						})
						.catch(err => {
							console.log('%c [Error while sending data]', 'color: #bada55', err);
						});
					}
				})
		);
	}
});
