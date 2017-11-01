const dbPromise = idb.open('data-store', 1, db => {
	if (!db.objectStoreNames.contains('sync-data')) {
		db.createObjectStore('sync-data', {keyPath: 'id'});
	}
});

function readAllData(st) {
	return dbPromise
		.then(db => {
			const tx = db.transaction(st, 'readonly');
			const store = tx.objectStore(st);
			return store.getAll();
		});
}

function deleteItemFromData(st, id) {
	dbPromise
		.then(db => {
			const tx = db.transaction(st, 'readwrite');
			const store = tx.objectStore(st);
			store.delete(id);
			return tx.complete;
		})
		.then(() => {
			console.log('%c [IndexDB] Item deleted!...', 'color: #bada55');
		});
}

function writeData(st, data) {
	return dbPromise
		.then(db => {
			const tx = db.transaction(st, 'readwrite');
			const store = tx.objectStore(st);
			store.put(data);
			return tx.complete;
		});
}
