import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserContext from './context/user';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/useAuthListener';
import IsUserLoggedIn from './helpers/IsUserLoggedIn';
import ProtectedRoutes from './helpers/ProtectedRoutes';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const App = () => {
	const { user } = useAuthListener();

	return (
		<UserContext.Provider value={{ user }}>
			<Router>
				<Suspense fallback={<p>Loading...</p>}>
					<Routes>
						<Route
							path={ROUTES.LOGIN}
							element={
								<IsUserLoggedIn
									user={user}
									loggedInPath={ROUTES.DASHBOARD}
								>
									<Login />
								</IsUserLoggedIn>
							}
						/>
						<Route
							path={ROUTES.Sign_UP}
							element={
								<IsUserLoggedIn
									user={user}
									loggedInPath={ROUTES.DASHBOARD}
								>
									<Signup />
								</IsUserLoggedIn>
							}
						/>
						<Route path={ROUTES.PROFILE} element={<Profile />} />
						<Route
							path={ROUTES.DASHBOARD}
							element={
								<ProtectedRoutes>
									<Dashboard />
								</ProtectedRoutes>
							}
						/>

						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</Router>
		</UserContext.Provider>
	);
};

export default App;
