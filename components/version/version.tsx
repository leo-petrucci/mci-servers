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
