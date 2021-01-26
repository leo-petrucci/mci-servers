import { gql } from 'graphql-request';
import { useMutation, UseMutationResult } from 'react-query';
import { graphQLClient } from '../../pages/_app';
import { ServerObjectInterface } from './useServers';

export async function publishServer(
  id: number
): Promise<ServerObjectInterface> {
  const { server } = await graphQLClient.request(
    gql`
      mutation {
        publishServer (id: ${id}) {
          published
        }
      }
    `
  );
  return server;
}

export const usePublish = (
  id: number
): UseMutationResult<ServerObjectInterface, unknown, void, unknown> =>
  useMutation(async () => {
    const server = await publishServer(id);
    return server;
  });

export async function unPublishServer(
  id: number
): Promise<ServerObjectInterface> {
  const { server } = await graphQLClient.request(
    gql`
        mutation {
          deleteServer (id: ${id}) {
            published
          }
        }
      `
  );
  return server;
}

export const useUnPublish = (
  id: number
): UseMutationResult<ServerObjectInterface, unknown, void, unknown> =>
  useMutation(async () => {
    const server = await unPublishServer(id);
    return server;
  });
