import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Redirect = dynamic(() => import(`components/redirect`), { ssr: false });

const RedirectPage = (): JSX.Element => {
  const router = useRouter();
  if (router.query.code) {
    return <Redirect />;
  }
  return null;
};

export default RedirectPage;
