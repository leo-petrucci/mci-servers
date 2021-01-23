import Button from 'components/button';
import { useRouter } from 'next/router';
import React from 'react';
import { useUserInfo } from 'utils/hooks/useUserInfo';
import Auth from '../auth/auth';

const Top = (): JSX.Element => {
  const router = useRouter();
  const { query } = useUserInfo();
  return (
    <nav className="w-full flex justify-between items-center px-4 py-2 border-b border-gray-100 text-sm text-gray-500">
      <div>Search</div>
      <div className="flex">
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
