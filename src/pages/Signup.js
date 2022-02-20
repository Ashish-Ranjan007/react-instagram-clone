import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import * as ROUTES from '../constants/routes';
import { doesUsernameExists } from '../services/firebase';
import FirebaseContext from '../context/firebase';

export default function Signup() {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [username, setUsername] = useState('');
	const [fullName, setFullName] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const { firebase } = useContext(FirebaseContext);

	const isInvalid = password === '' || email === '';

	useEffect(() => {
		document.title = 'Sign Up - Instagram';
	}, []);

	const handleSignup = async (event) => {
		event.preventDefault();
		const usernameExists = await doesUsernameExists(username);

		if (usernameExists) {
			setError('That username is already taken please try another');
		} else {
			try {
				// Create user
				const createdUser = await createUserWithEmailAndPassword(
					firebase.auth,
					email,
					password
				);

				// Set the displayName property of user object of auth to username
				await updateProfile(createdUser.user, {
					displayName: username,
				});

				// add a document to user collection in firestore
				const colRef = collection(firebase.db, 'users');
				await addDoc(colRef, {
					userId: createdUser.user.uid,
					username: username.toLowerCase(),
					fullName: fullName,
					emailAddress: email,
					following: [],
					followers: [],
					dateCreated: Date.now(),
				});

				// navigate to dashboard
				navigate(ROUTES.DASHBOARD);
			} catch (error) {
				setEmail('');
				setPassword('');
				setFullName('');
				setError(error.message);
			}
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

					<form onSubmit={handleSignup} method="POST">
						<input
							aria-label="Enter your username"
							type="text"
							placeholder="Username"
							className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={(e) => setUsername(e.target.value)}
							value={username}
						/>
						<input
							aria-label="Enter your full name"
							type="text"
							placeholder="Full Name"
							className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={(e) => setFullName(e.target.value)}
							value={fullName}
						/>
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
							Sign Up
						</button>
					</form>
				</div>
				<div className="flex justify-center items-center rounded flex-col w-full bg-white p-4 border border-gray-primary">
					<p className="text-sm">
						Have an account?{' '}
						<Link
							to={ROUTES.LOGIN}
							className="font-bold text-blue-medium"
						>
							Log In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
