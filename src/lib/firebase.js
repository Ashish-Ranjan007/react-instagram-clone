import { initializeApp } from 'firebase/app';
import { FieldValue, getFirestore } from 'firebase/firestore';

import 'firebase/auth';
// import { seedDatabase } from '../seed';

const config = {
	// Paste your config here
};

const firebase = initializeApp(config);
const db = getFirestore();

// Call the seed file only once to populate firestore with data to get started with
// seedDatabase(db);

export { firebase, FieldValue };
