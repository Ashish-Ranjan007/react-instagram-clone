import PropTypes from 'prop-types';
import React from 'react';

export default function Image({ src, caption }) {
	return (
		<>
			<img src={src} alt={caption} />
		</>
	);
}

Image.prototype = {
	src: PropTypes.string,
	caption: PropTypes.caption,
};
