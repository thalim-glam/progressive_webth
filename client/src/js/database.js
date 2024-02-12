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

// TODO: Add logic to a method that accepts some content and adds it to the database------------------------------------
export const putDb = async (content) => {
  console.log('PUT to the database');

  const contactDb = await openDB('jate', 1); // Creating connection to the database and version to use.

  const tx = contactDb.transaction('jate', 'readwrite');   // Creating a new transaction and specify the database and data privilege

  const store = tx.objectStore('jate'); //Openning the desired objedt store 

  const request = store.put({ id: 1, value: content }); //Storing and passing content

  const result = await request; // Confirmation of the request is assigned to result
  console.log('Data is saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database-------------------------------------------------
export const getDb = async () => {

  console.error('GET from the database');

  const contactDb = await openDB('jate', 1); // Creating connection to the db and needed version

  const tx = contactDb.transaction('jate', 'readonly'); // Creating new transaction and specify the database and data privileges

  const store = tx.objectStore('jate');// Opennig the desired object store

  const request = store.getAll(); // Using .getAll() methood to fetch all data

  const result = await request; // Confirmation of the request is assigned

  console.log('result.value', result);
  return result?.value;
};

initdb();
