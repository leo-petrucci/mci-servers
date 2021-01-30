import Button from 'components/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useUserInfo } from 'utils/hooks/useUserInfo';
import Auth from '../auth/auth';

const Top = (): JSX.Element => {
  const router = useRouter();
  const { query } = useUserInfo();
  return (
    <nav className="w-full flex justify-between items-center px-4 border-b border-gray-100 text-sm text-gray-500">
      <div className="flex">
        <div className="py-2">
          <Link href="/">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <img src="/logo.png" alt="logo" className="h-8" />
            </a>
          </Link>
        </div>
        <div
          className="ml-4 items-end hidden md:flex"
          style={{ fontSize: '1.05rem', marginBottom: '-4px' }}
        >
          <Link href="/">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="hover:text-green-600 transition-colors pb-3 px-3 border-b-2 border-transparent hover:border-green-600">
              Home
            </a>
          </Link>
          <Link href="https://minecraftitalia.net">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="hover:text-green-600 transition-colors pb-3 px-3 border-b-2 border-transparent hover:border-green-600">
              Forum
            </a>
          </Link>
        </div>
      </div>
      <div className="flex py-2">
        {query.isSuccess && (
          <div className="mr-4">
            <Button
              type="secondary"
              size="small"
              onClick={() => router.push('/server/add')}
            >
              Aggiungi server
            </Button>
          </div>
        )}
        <Auth />
      </div>
    </nav>
  );
};

export default Top;
