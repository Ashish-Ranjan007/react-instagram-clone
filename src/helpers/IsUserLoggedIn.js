import { Navigate } from 'react-router-dom';

export default function IsUserLoggedIn({ user, loggedInPath, children }) {
	if (!user) {
		return children;
	}

	if (user) {
		return <Navigate to={loggedInPath} />;
	}

	return null;
}
