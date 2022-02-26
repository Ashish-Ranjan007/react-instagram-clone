import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function ProtectedRoutes({ children }) {
	const { firebase } = useContext(FirebaseContext);

	if (!firebase.auth.currentUser) {
		return <Navigate to={ROUTES.LOGIN} />;
	}

	return children;
}
