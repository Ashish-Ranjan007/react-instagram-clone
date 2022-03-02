import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '../components/Header';
import * as ROUTES from '../constants/routes';
import UserProfile from '../components/profile';
import { getUserByUsername } from '../services/firebase';

function Profile() {
	const navigate = useNavigate();
	const { username } = useParams();
	const [user, setUser] = useState(null);

	useEffect(() => {
		async function checkUserExists() {
			const userObject = await getUserByUsername(username);

			if (userObject) {
				setUser(userObject);
			} else {
				navigate(ROUTES.NOT_FOUND);
			}
		}

		checkUserExists();
	}, [username]);

	return user ? (
		<div className="bg-gray-background">
			<Header />
			<div className="mx-auto max-w-screen-lg">
				<UserProfile user={user} />
			</div>
		</div>
	) : null;
}

export default Profile;
