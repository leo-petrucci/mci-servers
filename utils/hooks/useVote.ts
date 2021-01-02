import { gql } from 'graphql-request';
import { useMutation, UseMutationResult } from 'react-query';
import { graphQLClient } from '../../pages/_app';

interface VoteInterface {
  outcome: string;
}

export async function postVote(id: number): Promise<VoteInterface> {
  const { vote } = await graphQLClient.request(
    gql`
      mutation {
        vote(id: ${id}) {
          outcome
        }
      }
    `
  );
  return vote;
}

export const useVote = (
  id: number
): UseMutationResult<VoteInterface, unknown, void, unknown> =>
  useMutation(async () => {
    const vote = await postVote(id);
    return vote;
  });
