import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
	return (
		<Router>
			<Suspense fallback={<p>Loading...</p>}>
				<Routes>
					<Route path={ROUTES.LOGIN} element={<Login />} />
					<Route path={ROUTES.Sign_UP} element={<Signup />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
