import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import FirebaseContext from '../context/firebase';

export default function Login() {
	const [error, setError] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const { firebase } = useContext(FirebaseContext);

	const isInvalid = password === '' || email === '';

	useEffect(() => {
		document.title = 'Login - Instagram';
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			await firebase.authentication.signIn(
				firebase.authentication.auth,
				email,
				password
			);
			navigate(ROUTES.DASHBOARD);
		} catch (error) {
			setEmail('');
			setPassword('');
			setError('Invalid Email or Password');
		}
	};

	return (
		<div className="container flex mx-auto max-w-screen-md items-center h-screen">
			<div className="flex w-3/5">
				<img
					src="/images/iphone-with-profile.jpg"
					alt="iPhone with instagram"
				/>
			</div>
			<div className="flex flex-col w-2/5">
				<div className="flex flex-col rounded items-center bg-white p-4 border border-gray-primary mb-4">
					<h1 className="flex justify-center w-full">
						<img
							src="/images/logo.png"
							alt="Instagram Logo"
							className="mt-2 w-6/12 mb-4"
						/>
					</h1>

					{error && (
						<p className="mb-4 text-xs text-red-primary">{error}</p>
					)}

					<form onSubmit={handleLogin} method="POST">
						<input
							aria-label="Enter your email address"
							type="text"
							placeholder="Email Address"
							className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						<input
							aria-label="Enter your password"
							type="password"
							placeholder="Password"
							className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
						<button
							disabled={isInvalid}
							type="submit"
							className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
								isInvalid && `opacity-50`
							}`}
						>
							Log In
						</button>
					</form>
				</div>
				<div className="flex justify-center items-center rounded flex-col w-full bg-white p-4 border border-gray-primary">
					<p className="text-sm">
						Don't have an account?{' '}
						<Link
							to="/signup"
							className="font-bold text-blue-medium"
						>
							Signup
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
