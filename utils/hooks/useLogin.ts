import { gql } from 'graphql-request';
import { QueryObserverResult, useQuery } from 'react-query';
import { graphQLClient } from '../../pages/_app';

interface AuthorInterface {
  id: number;
  username: string;
  photoUrl: string;
}

export async function postLogin(code: string): Promise<AuthorInterface> {
  const { oAuthLogin } = await graphQLClient.request(
    gql`
      mutation {
        oAuthLogin(code: "${code}") {
          user {
            id
            photoUrl
            username
          }
        }
      }
    `
  );
  return oAuthLogin;
}

export const useLogin = (
  code: string
): QueryObserverResult<AuthorInterface, unknown> =>
  useQuery('me', async () => {
    const user = await postLogin(code);
    return user;
  });
