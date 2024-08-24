import { useState } from 'react';

function TruncatedText({ text = '', maxWords = 40 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = text.split(' ');
  const isLongText = words.length > maxWords;

  const displayedText = isExpanded
    ? text
    : words.slice(0, maxWords).join(' ') + (isLongText ? '...' : '');

  return (
    <div className="mt-4 text-gray-600">
      <p>{displayedText}</p>
      {isLongText && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 font-semibold mt-2 hover:underline"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
}

export default TruncatedText;
