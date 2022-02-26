import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import SuggestedProfile from './SuggestedProfile';
import { getSuggestedProfiles } from '../../services/firebase';

export default function Suggestions({ userId, following, docId }) {
	const [profiles, setProfiles] = useState([]);

	useEffect(() => {
		async function getProfiles() {
			const userProfiles = await getSuggestedProfiles(userId, following);
			setProfiles(userProfiles);
		}

		if (userId) {
			getProfiles();
		}
	}, [userId]);

	return profiles.length == 0 ? (
		<Skeleton count={1} height={150} className="mt-5" />
	) : (
		<div className="rounded flex flex-col">
			<div className="text-sm flex items-center align-items justify-between mb-2">
				<p className="font-bold text-gray-base">Suggestions for you</p>
			</div>
			<div className="mt-4 grid gap-5">
				{profiles.map((profile) => {
					return (
						<SuggestedProfile
							key={profile.docId}
							userDocId={profile.docId}
							username={profile.username}
							profileId={profile.userId}
							currentUserId={userId}
							currentUserDocId={docId}
						/>
					);
				})}
			</div>
		</div>
	);
}

Suggestions.propTypes = {
	userId: PropTypes.string,
	following: PropTypes.array,
	docId: PropTypes.string,
};
