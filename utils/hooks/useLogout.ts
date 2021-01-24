import { gql } from 'graphql-request';
import { useMutation, UseMutationResult } from 'react-query';
import { graphQLClient } from '../../pages/_app';

interface LogoutInterface {
  outcome: string;
}

export async function postLogout(): Promise<LogoutInterface> {
  const { logout } = await graphQLClient.request(
    gql`
      mutation {
        logout {
          outcome
        }
      }
    `
  );
  return logout;
}

export const useLogout = (): UseMutationResult<LogoutInterface, unknown> =>
  useMutation('logout', async () => {
    const outcome = await postLogout();
    return outcome;
  });
