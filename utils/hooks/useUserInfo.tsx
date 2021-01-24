import React, { useContext } from 'react';
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
  try {
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
  } catch (err) {
    try {
      await graphQLClient.request(
        gql`
          mutation {
            refresh {
              user {
                username
              }
            }
          }
        `
      );
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
    } catch {
      throw new Error('User is not logged in.');
    }
  }
}

export const useUser = (): QueryObserverResult<AuthorInterface, unknown> =>
  useQuery('me', async () => getUser(), { retry: false });

const UserInfoContext = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const query = useUser();

  return <ContextProvider value={{ query }}>{children}</ContextProvider>;
};

export default UserInfoContext;
