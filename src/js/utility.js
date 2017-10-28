var dbPromise = idb.open('data-store', 1, function (db) {
	if (!db.objectStoreNames.contains('sync-data')) {
		db.createObjectStore('sync-data', {keyPath: 'id'});
	}
});

function readAllData(st) {
	return dbPromise
		.then(function(db) {
			var tx = db.transaction(st, 'readonly');
			var store = tx.objectStore(st);
			return store.getAll();
		});
}

function deleteItemFromData(st, id) {
	dbPromise
		.then(function(db) {
			var tx = db.transaction(st, 'readwrite');
			var store = tx.objectStore(st);
			store.delete(id);
			return tx.complete;
		})
		.then(function() {
			console.log('%c [IndexDB] Item deleted!...', 'color: #bada55');
		});
}

function writeData(st, data) {
	return dbPromise
		.then(function(db) {
			var tx = db.transaction(st, 'readwrite');
			var store = tx.objectStore(st);
			store.put(data);
			return tx.complete;
		});
}
