import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLogin } from 'utils/hooks/useLogin';
import Icon from 'components/icon';

const Redirect = (): JSX.Element => {
  const router = useRouter();
  const { status } = useLogin(router.query.code as string);
  useEffect(() => {
    if (status === 'success') {
      router.push('/');
    }
  }, [status, router]);
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white flex items-center justify-center text-green-600">
      <Icon.Spinner>
        <path
          opacity="0.2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          fill="currentColor"
        />
        <path
          d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
          fill="currentColor"
        />
      </Icon.Spinner>
    </div>
  );
};

export default Redirect;
