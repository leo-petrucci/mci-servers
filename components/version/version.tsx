import Link from 'next/link';
import React from 'react';
import { VersionInterface } from 'utils/hooks/useServers';

interface VersionPropsInterface {
  version: VersionInterface;
}

const Version = ({ version }: VersionPropsInterface): JSX.Element => (
  <Link href={`/version/${version.versionName}`}>
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
          d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z"
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
        {version.versionName}
      </span>
    </a>
  </Link>
);

export default Version;
