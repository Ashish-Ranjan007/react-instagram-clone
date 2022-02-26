import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import usePhotos from '../hooks/usePhotos';
import Post from './post';

function Timeline() {
	const { photos } = usePhotos();

	return (
		<div className="container col-span-2">
			{!photos ? (
				<>
					<Skeleton
						count={4}
						width={640}
						height={500}
						className="mb-4"
					/>
				</>
			) : photos?.length > 0 ? (
				photos.map((content) => {
					return <Post key={content.docId} content={content} />;
				})
			) : (
				<p className="text-center text-2xl">
					Follow people to see posts
				</p>
			)}
		</div>
	);
}

export default Timeline;
