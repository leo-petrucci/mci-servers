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
