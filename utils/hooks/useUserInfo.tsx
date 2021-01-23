import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { gql } from 'graphql-request';
import { QueryObserverResult, useQuery, UseQueryResult } from 'react-query';
import { graphQLClient } from '../../pages/_app';

interface UserContextInterface {
  query: UseQueryResult<any, unknown>;
}

const ctxt = React.createContext<UserContextInterface>(
  {} as UserContextInterface
);

const ContextProvider = ctxt.Provider;

export const useUserInfo = (): UserContextInterface => {
  const query = useContext(ctxt);

  return query;
};

interface AuthorInterface {
  id: number;
  username: string;
  photoUrl: string;
}

export async function getUser(): Promise<AuthorInterface> {
  const { me } = await graphQLClient.request(
    gql`
      query {
        me {
          id
          photoUrl
          username
        }
      }
    `
  );
  return me;
}

export const useUser = (): QueryObserverResult<AuthorInterface, unknown> =>
  useQuery(
    'me',
    async () => {
      const user = await getUser();
      return user;
    },
    { retry: false }
  );

const UserInfoContext = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const query = useUser();

  return <ContextProvider value={{ query }}>{children}</ContextProvider>;
};

export default UserInfoContext;
