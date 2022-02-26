import { useEffect, useContext, useState } from 'react';

import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

function useUser() {
	const [activeUser, setActiveUser] = useState({});
	const { user } = useContext(UserContext);

	useEffect(() => {
		async function getUserObjectByUserId() {
			const response = await getUserByUserId(user.uid);
			setActiveUser(response);
		}

		if (user && user.uid) {
			getUserObjectByUserId();
		}
	}, [user]);

	return { user: activeUser };
}

export default useUser;
