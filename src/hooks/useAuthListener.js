import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect, useContext } from 'react';

import FirebaseContext from '../context/firebase';

function useAuthListener() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	const { firebase } = useContext(FirebaseContext);

	useEffect(() => {
		const unSubscribeAuth = onAuthStateChanged(
			firebase.auth,
			(authUser) => {
				if (authUser) {
					localStorage.setItem('user', JSON.stringify(authUser));
					setUser(authUser);
				} else {
					localStorage.removeItem('user');
					setUser(null);
				}
			}
		);

		return () => unSubscribeAuth();
	}, [firebase.auth]);

	return { user };
}

export default useAuthListener;
