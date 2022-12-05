import React from 'react';
import DOMPurify from 'isomorphic-dompurify';

const SanitizeHTML = ({ content }: { content: string | Node }) => {
	return (
		<div
			className='pl-4 overflow-hidden line-clamp-3'
			dangerouslySetInnerHTML={{
				__html: DOMPurify.sanitize(content),
			}}></div>
	);
};

export default SanitizeHTML;
