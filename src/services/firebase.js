import {
	collection,
	query,
	where,
	getDocs,
	limit,
	doc,
	updateDoc,
	arrayUnion,
	arrayRemove,
} from 'firebase/firestore';
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

export async function getUserByUsername(username) {
	const result = [];
	const colRef = collection(firebase.db, 'users');
	const q = query(colRef, where('username', '==', username));
	const querySnapshot = await getDocs(q);

	querySnapshot.forEach((doc) => {
		if (doc.data().username === username) {
			result.push({ ...doc.data(), docId: doc.id });
		}
	});

	return result.length > 0 ? result[0] : false;
}

export async function getUserByUserId(userId) {
	const result = [];
	const colRef = collection(firebase.db, 'users');
	const q = query(colRef, where('userId', '==', userId));
	const querySnapshot = await getDocs(q);

	querySnapshot.forEach((doc) => {
		result.push({
			...doc.data(),
			docId: doc.id,
		});
	});

	return result[0];
}

export async function getSuggestedProfiles(userId, following) {
	const result = [];
	const colRef = collection(firebase.db, 'users');
	const q = query(colRef, where('userId', '!=', userId), limit(10));
	const querySnapshot = await getDocs(q);

	querySnapshot.forEach((doc) => {
		if (!following.includes(doc.data().userId)) {
			result.push({
				...doc.data(),
				docId: doc.id,
			});
		}
	});

	return result;
}

export async function updateCurrentUserFollowing(
	currentUserDocId,
	profileId,
	isFollowingProfile
) {
	const docRef = doc(firebase.db, 'users', currentUserDocId);

	await updateDoc(docRef, {
		following: isFollowingProfile
			? arrayRemove(profileId)
			: arrayUnion(profileId),
	});
}

export async function updateFollowedUserFollowers(
	userDocId,
	currentUserId,
	isFollowingProfile
) {
	const docRef = doc(firebase.db, 'users', userDocId);

	await updateDoc(docRef, {
		followers: isFollowingProfile
			? arrayRemove(currentUserId)
			: arrayUnion(currentUserId),
	});
}

export async function getPhotos(userId, following) {
	const result = [];
	const colRef = collection(firebase.db, 'photos');
	const q = query(colRef, where('userId', 'in', following));
	const querySnapshot = await getDocs(q);

	querySnapshot.forEach((doc) => {
		result.push({
			...doc.data(),
			docId: doc.id,
		});
	});

	const photosWithUserDetails = await Promise.all(
		result.map(async (photo) => {
			let userLikedPhoto = false;
			if (photo.likes.includes(userId)) {
				userLikedPhoto = true;
			}
			const user = await getUserByUserId(photo.userId);
			const username = user.username;

			return { username, ...photo, userLikedPhoto };
		})
	);

	return photosWithUserDetails;
}

export async function getUserPhotosByUserId(userId) {
	const result = [];
	const colRef = collection(firebase.db, 'photos');
	const q = query(colRef, where('userId', '==', userId));
	const querySnapshot = await getDocs(q);

	querySnapshot.forEach((doc) => {
		result.push({ ...doc.data(), docId: doc.id });
	});

	return result;
}

export async function isUserFollowingProfile(username, profileUserId) {
	const result = [];
	const colRef = collection(firebase.db, 'users');
	const q = query(
		colRef,
		where('username', '==', username),
		where('following', 'array-contains', profileUserId)
	);
	const querySnapshot = await getDocs(q);

	querySnapshot.forEach((doc) => {
		result.push({ ...doc.data(), docId: doc.id });
	});

	return result.length > 0 ? true : false;
}

export async function toggleFollow(
	isFollowingProfile,
	activeUserDocId,
	profileDocId,
	profileUserId,
	followingUserId
) {
	await updateCurrentUserFollowing(
		activeUserDocId,
		profileUserId,
		isFollowingProfile
	);
	await updateFollowedUserFollowers(
		profileDocId,
		followingUserId,
		isFollowingProfile
	);
}
