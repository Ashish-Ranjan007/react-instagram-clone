import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	updateCurrentUserFollowing,
	updateFollowedUserFollowers,
} from '../../services/firebase';

export default function SuggestedProfile({
	userDocId,
	username,
	profileId,
	currentUserId,
	currentUserDocId,
}) {
	const [followed, setFollowed] = useState(false);

	async function handleFollowUser() {
		setFollowed(true);

		await updateCurrentUserFollowing(currentUserDocId, profileId);
		await updateFollowedUserFollowers(userDocId, currentUserId);
	}

	return !followed ? (
		<div className="flex flex-row items-center align-items justify-between">
			<div className="flex items-center justify-between">
				<img
					className="rounded-full w-8 flex mr-3"
					src={`/images/avatars/dali.jpg`}
					alt="user profile"
				/>
				<Link to={`/p/${username}`}>
					<p className="font-bold text-sm">{username}</p>
				</Link>
			</div>
			<button
				className="text-xs font-bold text-blue-medium"
				type="button"
				onClick={handleFollowUser}
			>
				Follow
			</button>
		</div>
	) : null;
}

SuggestedProfile.propTypes = {
	username: PropTypes.string,
	profileId: PropTypes.string,
	userDocId: PropTypes.string,
	currentUserId: PropTypes.string,
};
