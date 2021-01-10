import Button from 'components/button';
import { useRouter } from 'next/router';
import React from 'react';
import Auth from '../auth/auth';

const Top = (): JSX.Element => {
  const router = useRouter();
  return (
    <nav
      style={{ maxWidth: '1152px' }}
      className="w-full flex justify-between items-center px-4 py-2 border-b border-gray-100 text-sm text-gray-500"
    >
      <div>Search</div>
      <div className="flex">
        <div className="mr-4">
          <Button
            type="secondary"
            size="small"
            onClick={() => router.push('/server/add')}
          >
            Aggiungi server
          </Button>
        </div>
        <Auth />
      </div>
    </nav>
  );
};

export default Top;
