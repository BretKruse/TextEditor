import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  export const putDb = async (content) => {
    console.log("PUT to the database");

    // Create a connection to the database.
    const contactDb = await openDB("jate", 1);

    // Create a new transaction.
    const tx = contactDb.transaction("jate", "readwrite");

    // Open up the object store.
    const store = tx.objectStore("jate");

    const request = store.put({ id: 1, value: content });

    // Get confirmation.
    const result = await request;
    console.log("🚀 - data saved to the database", result);
  };

  export const getDb = async () => {
    console.log("GET from the database");

    // Create a connection to the database.
    const contactDb = await openDB("jate", 1);

    // Create a new transaction.
    const tx = contactDb.transaction("jate", "readonly");

    // Open the object store.
    const store = tx.objectStore("jate");

    // Use the .getAll() to gather all data.
    const request = store.getAll();

    // Get confirmation of the request.
    const result = await request;
    console.log("result.value", result);
    return result?.value;
  };

initdb();
