import Author from 'components/author';
import Button from 'components/button';
import { useRouter } from 'next/router';
import React from 'react';
import { useUserInfo } from 'utils/hooks/useUserInfo';

const redirectUrl = `${process.env.NEXT_PUBLIC_REDIRECT_URL}`;

const Auth = (): JSX.Element => {
  const router = useRouter();
  const { query } = useUserInfo();

  if (query.isFetching) return <div>Loading...</div>;

  if (query.isError)
    return (
      <>
        <Button
          type="secondary"
          size="small"
          onClick={() =>
            router.push(`
              https://www.minecraftitalia.net/oauth/authorize/?client_id=92b7cfcd26fa40ec186e6a5a727208f7&redirect_uri=${redirectUrl}/redirect&response_type=code&scope=profile`)
          }
        >
          Login / Register
        </Button>
      </>
    );

  return (
    <Author
      photoSize="small"
      username={query.data.username}
      photoUrl={query.data.photoUrl}
    />
  );
  return null;
};

export default Auth;
