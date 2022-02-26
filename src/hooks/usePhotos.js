import { useContext, useEffect, useState } from 'react';

import UserContext from '../context/user';
import { getPhotos, getUserByUserId } from '../services/firebase';

export default function usePhotos() {
	const [photos, setPhotos] = useState(null);

	const { user } = useContext(UserContext);

	useEffect(() => {
		async function getTimelinePhotos() {
			let followingUserPhotos;
			const following = await getUserByUserId(user.uid);

			if (following.following.length > 0) {
				followingUserPhotos = await getPhotos(
					user.uid,
					following.following
				);
			}

			followingUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);

			setPhotos(followingUserPhotos);
		}

		if (user) {
			getTimelinePhotos();
		}
	}, [user]);

	return { photos };
}
