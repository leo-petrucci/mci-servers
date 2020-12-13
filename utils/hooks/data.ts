import request, { gql } from 'graphql-request';
import { QueryResult, useQuery } from 'react-query';
import { endpoint } from '../../pages/_app';

export interface ServerObjectInterface {
  id: number;
  title: string;
  content: string;
  slots: number;
  cover: string;
  voteCount: number;
  canVote: boolean;
}

export async function getServer(id: string): Promise<ServerObjectInterface> {
  const { server } = await request(
    endpoint,
    gql`
        query {
          server(id: ${id}) {
            id
            title
            content
            slots
            cover
            voteCount
            canVote
          }
        }
      `
  );
  return server;
}
export async function getServers(
  date?: string
): Promise<ServerObjectInterface[]> {
  const { feed } = await request(
    endpoint,
    gql`
      query {
        feed ${date ? `(date: "${date}")` : ''} {
          id
          title
          voteCount
          canVote
        }
      }
    `
  );
  return feed;
}

export const useServers = (
  date?: string
): QueryResult<ServerObjectInterface[], unknown> =>
  useQuery('servers', async () => {
    const servers = await getServers(date);
    return servers;
  });

export const useServer = (
  id: string
): QueryResult<ServerObjectInterface, unknown> =>
  useQuery('server', async () => {
    const server = await getServer(id);
    return server;
  });
