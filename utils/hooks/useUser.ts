import { gql } from 'graphql-request';
import { QueryObserverResult, useQuery } from 'react-query';
import { graphQLClient } from '../../pages/_app';

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
