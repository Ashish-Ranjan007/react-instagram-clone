import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useUser from '../../hooks/useUser';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';

export default function Header({
	photosCount,
	profile,
	followerCount,
	setFollowerCount,
}) {
	const { user } = useUser();
	const [isFollowingProfile, setIsFollowingProfile] = useState(false);
	const activeBtnFollow = user.username && user.username !== profile.username;

	const handleToggleFollow = async () => {
		setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
		setFollowerCount({
			followerCount: isFollowingProfile
				? followerCount - 1
				: followerCount + 1,
		});

		if (user && profile) {
			await toggleFollow(
				isFollowingProfile,
				user.docId,
				profile.docId,
				profile.userId,
				user.userId
			);
		}
	};

	useEffect(() => {
		const isLoggedInUserFollowingProfile = async () => {
			const isFollowing = await isUserFollowingProfile(
				user.username,
				profile.userId
			);
			setIsFollowingProfile(isFollowing);
		};

		if (user.username && profile.userId) {
			isLoggedInUserFollowingProfile();
		}
	}, [user, profile]);

	return (
		<div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
			<div className="container flex justify-center items-center">
				{profile.username ? (
					<img
						className="rounded-full h-40 w-40 flex"
						alt={`${profile.fullName} profile picture`}
						src={`/images/avatars/${profile.username}.jpg`}
					/>
				) : (
					<Skeleton circle height={150} width={150} count={1} />
				)}
			</div>
			<div className="flex items-center justify-center flex-col col-span-2">
				<div className="container flex items-center">
					<p className="text-2xl mr-4">{profile.username}</p>
					{activeBtnFollow && isFollowingProfile === null ? (
						<Skeleton count={1} width={80} height={32} />
					) : (
						activeBtnFollow && (
							<button
								className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
								type="button"
								onClick={handleToggleFollow}
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										handleToggleFollow();
									}
								}}
							>
								{isFollowingProfile ? 'Unfollow' : 'Follow'}
							</button>
						)
					)}
				</div>
				<div className="container flex mt-4">
					{!profile.followers || !profile.following ? (
						<Skeleton count={1} width={677} height={24} />
					) : (
						<>
							<p className="mr-10">
								<span className="font-bold">{photosCount}</span>{' '}
								photos
							</p>
							<p className="mr-10">
								<span className="font-bold">
									{followerCount}
								</span>
								{` `}
								{followerCount === 1 ? `follower` : `followers`}
							</p>
							<p className="mr-10">
								<span className="font-bold">
									{profile.following?.length}
								</span>{' '}
								following
							</p>
						</>
					)}
				</div>
				<div className="container mt-4">
					<p className="font-medium">
						{!profile.fullName ? (
							<Skeleton count={1} height={24} />
						) : (
							profile.fullName
						)}
					</p>
				</div>
			</div>
		</div>
	);
}

Header.propTypes = {
	photosCount: PropTypes.number,
	followerCount: PropTypes.number,
	setFollowerCount: PropTypes.func,
	profile: PropTypes.shape({
		docId: PropTypes.string,
		userId: PropTypes.string,
		fullName: PropTypes.string,
		following: PropTypes.array,
		docId: PropTypes.string,
	}),
};
