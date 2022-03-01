import Proptypes from 'prop-types';
import { useEffect, useReducer } from 'react';

import Header from './Header';
import {
	getUserPhotosByUsername,
	getUserByUsername,
} from '../../services/firebase';

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
	profile: {},
	photosCollection: {},
	followerCount: 0,
};

export default function Profile({ username }) {
	const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(() => {
		async function getProfileInfoAndPhotos() {
			const userObject = await getUserByUsername(username);
			const photos = await getUserPhotosByUsername(username);

			dispatch({
				profile: userObject,
				photosCollection: photos,
				followerCount: userObject.followers.length,
			});
		}

		if (username) {
			getProfileInfoAndPhotos();
		}
	}, [username]);

	return (
		<>
			<Header />
		</>
	);
}

Profile.propTypes = {
	username: Proptypes.string,
};
