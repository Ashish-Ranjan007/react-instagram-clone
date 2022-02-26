import { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

export default function AddComment({
	docId,
	comments,
	setComments,
	commentInput,
}) {
	const [comment, setComment] = useState('');
	const { firebase } = useContext(FirebaseContext);
	const {
		user: { displayName },
	} = useContext(UserContext);

	const handleSubmitComment = async (event) => {
		event.preventDefault();

		setComments([{ displayName, comment }, ...comments]);
		setComment('');

		const docRef = doc(firebase.db, 'photos', docId);
		await updateDoc(docRef, {
			comments: arrayUnion({ displayName, comment }),
		});
	};

	return (
		<div className="border-t border-gray-primary">
			<form
				className="flex justify-between pl-0 pr-5"
				method="POST"
				onSubmit={(event) =>
					comment.length >= 1
						? handleSubmitComment(event)
						: event.preventDefault()
				}
			>
				<input
					aria-label="Add a Comment"
					autoComplete="off"
					className="text-sm text-gray-base w-full mr-3 py-5 px-4"
					type="text"
					name="add-comment"
					placeholder="Add a comment..."
					value={comment}
					onChange={({ target }) => setComment(target.value)}
					ref={commentInput}
				/>
				<button
					className={`text-sm font-bold text-blue-medium ${
						!comment && 'opacity-25'
					}`}
					type="button"
					disabled={comment.length < 1}
					onClick={handleSubmitComment}
				>
					Post
				</button>
			</form>
		</div>
	);
}

AddComment.propTypes = {
	docId: PropTypes.string,
	comments: PropTypes.array,
	setComments: PropTypes.func,
	commentInput: PropTypes.object,
};
