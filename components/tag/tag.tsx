import Link from 'next/link';
import React from 'react';
import { TagInterface } from 'utils/hooks/useTags';

interface TagPropsInterface {
  tag: TagInterface;
}

const Tag = ({ tag }: TagPropsInterface): JSX.Element => (
  <Link href={`/tag/${tag.tagName}`}>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a className="flex items-start mr-2 mb-2 bg-emerald-50 hover:bg-emerald-100 text-green-600 rounded-md h-6 px-2">
      <svg
        className="self-center mr-1"
        width="18"
        height="18"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
      <span
        className="overflow-hidden"
        style={{
          WebkitLineClamp: 1,
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {tag.tagName}
      </span>
      {tag.popularity && (
        <span className="text-xs ml-1 self-center">({tag.popularity})</span>
      )}
    </a>
  </Link>
);

export default Tag;
