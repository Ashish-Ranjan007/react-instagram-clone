import User from './User';
import Suggestions from './Suggestions';
import useUser from '../../hooks/useUser';

export default function Sidebar() {
	const {
		user: { fullName, username, userId, following, docId },
	} = useUser();

	return (
		<div className="p-5">
			<User username={username} fullName={fullName} />
			<Suggestions userId={userId} following={following} docId={docId} />
		</div>
	);
}
