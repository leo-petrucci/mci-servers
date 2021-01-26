import Author from 'components/author';
import Button from 'components/button';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useUserInfo } from 'utils/hooks/useUserInfo';
import { queryClient } from 'pages/_app';
import { useLogout } from 'utils/hooks/useLogout';

const redirectUrl = `${process.env.NEXT_PUBLIC_REDIRECT_URL}`;

const Auth = (): JSX.Element => {
  const [clicked, setClicked] = useState(false);
  const profileRef = useRef();
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
    // @ts-ignore
    <div ref={profileRef} className="flex items-center">
      <button
        type="button"
        onClick={() => !clicked && setClicked(!clicked)}
        className="focus:outline-none"
      >
        <Author
          photoSize="small"
          username={query.data.username}
          photoUrl={query.data.photoUrl}
        />
      </button>
      {clicked && (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        <Dropdown setClicked={setClicked} forwardRef={profileRef} />
      )}
    </div>
  );
};

const Dropdown = ({
  setClicked,
  forwardRef,
}: {
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  forwardRef: React.MutableRefObject<undefined>;
}) => {
  const logoutMutation = useLogout();

  const onLogout = () => {
    logoutMutation.mutate(null, {
      onSuccess: () => {
        toast.success('Logout effettuato.', {
          duration: 5000,
        });
        queryClient.invalidateQueries('me');
      },
    });
  };

  const handler = (e: Event) => {
    // @ts-ignore
    if (!forwardRef.current.contains(e.target)) setClicked(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handler, false);
    return () => {
      document.removeEventListener('mousedown', handler, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex justify-end mt-8">
      <div
        className="flex flex-col mt-2 absolute w-full py-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
        style={{ minWidth: '200px' }}
      >
        <button
          type="button"
          className="flex items-center text-left px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors focus:outline-none"
          onClick={() => {
            onLogout();
          }}
        >
          <svg
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          <div className="ml-2">Logout</div>
        </button>
      </div>
    </div>
  );
};

export default Auth;
