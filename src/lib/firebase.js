import { initializeApp } from 'firebase/app';
import { FieldValue, getFirestore } from 'firebase/firestore';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';

// import { seedDatabase } from '../seed';

const config = {
	// Paste your config here
	apiKey: 'AIzaSyBvpOjl_quKIu-4txr7lbsL1-JIjSvhZjY',
	authDomain: 'react-instagram-clone-5e550.firebaseapp.com',
	projectId: 'react-instagram-clone-5e550',
	storageBucket: 'react-instagram-clone-5e550.appspot.com',
	messagingSenderId: '260211671946',
	appId: '1:260211671946:web:ec291d4dd5c00fe84bbe73',
};

initializeApp(config);

const db = getFirestore();
const auth = getAuth();

const firebase = {
	db: db,
	authentication: {
		auth: auth,
		signUp: createUserWithEmailAndPassword,
		signIn: signInWithEmailAndPassword,
	},
};

// Call the seed file only once to populate firestore with data to get started with
// seedDatabase(db);

export { firebase, FieldValue };
