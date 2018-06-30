"use strict";

const dbPromise = idb.open('currenci', 1, (upgradeDb) => {
    console.log('creating DB');
    if (!upgradeDb.objectStoreNames.contains('convertion')) {
        const convertionStore = upgradeDb.createObjectStore('convertion', { keyPath: 'id', autoIncrement:true });
        convertionStore.createIndex('id', 'id', { unique: true });
    }
    if (!upgradeDb.objectStoreNames.contains('currency')) {
        const currencyStore = upgradeDb.createObjectStore('currency', { keyPath: 'id', autoIncrement:true });
        currencyStore.createIndex('id', 'id', { unique: true });
    }
});

dbPromise.then(db => {
    const tx = db.transaction('convertion', 'readwrite');
    tx.objectStore('convertion').put({
        data: {
          from: 'USD 700',
          to: 'GHS 550',
          rate: '4.755 / 0.255',
          created: new Date().getTime()
        }
    });
    return tx.complete;
  }).then(function() {
    console.log('added item to the store Convertion!');
});

/*
dbPromise.then((db) => {
    const tx = db.transaction('convertion', 'readonly');
    const store = tx.objectStore('convertion');
    
    return store.get('1');
  }).then(function(val) {
    console.dir(val);
  });
*/

dbPromise.then((db) => {
    const tx = db.transaction('convertion', 'readonly');
    const store = tx.objectStore('convertion');

    return store.getAll();
  }).then((convertions) => {
    console.log(`Items by name: ${convertions}`);
});