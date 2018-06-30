/**
 * Insert to DB
 */
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


dbPromise.then((db) => {
    const tx = db.transaction('convertion', 'readonly');
    const store = tx.objectStore('convertion');

    return store.getAll();
  }).then((convertions) => {
    console.log(`Items by name: ${convertions}`);
});

/**
 * Read All From DB
 */
dbPromise.then(db => {
    return db.transaction('convertion')
      .objectStore('convertion').getAll();
  }).then(convertions => console.log(convertions));

  /**
   * Get Single Record
   */
  dbPromise.then(db => {
    return db.transaction('convertion')
      .objectStore('convertion').get(1);
  }).then(convertion => console.log(convertion));