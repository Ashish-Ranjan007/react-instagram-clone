import { collection, query, where, getDocs } from 'firebase/firestore';
import { firebase } from '../lib/firebase';

export async function doesUsernameExists(username) {
	const result = [];
	const colRef = collection(firebase.db, 'users');
	const q = query(colRef, where('username', '==', username));
	const querySnapshot = await getDocs(q);

	querySnapshot.forEach((doc) => {
		if (doc.data().username === username) {
			result.push({ ...doc.data() });
		}
	});

	return result.length > 0 ? true : false;
}
