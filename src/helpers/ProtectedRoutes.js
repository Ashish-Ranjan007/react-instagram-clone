import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import UserContext from '../context/user';

export default function ProtectedRoutes({ children }) {
	const { user } = useContext(UserContext);

	if (!user) {
		return <Navigate to={ROUTES.LOGIN} />;
	}

	return children;
}
