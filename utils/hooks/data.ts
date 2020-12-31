import request, { gql } from 'graphql-request';
import { QueryObserverResult, useQuery } from 'react-query';
import { endpoint } from '../../pages/_app';

export interface ServerObjectInterface {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  slots: number;
  cover: string;
  voteCount: number;
  canVote: boolean;
  tags: TagInterface[];
  author: AuthorInterface;
}

interface TagInterface {
  id: number;
  tagName: string;
}

interface AuthorInterface {
  id: number;
  username: string;
  photoUrl: string;
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
            createdAt
            slots
            cover
            voteCount
            canVote
            author {
              id
              photoUrl
              username
            }
            tags {
              id
              tagName
            }
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
          createdAt
          voteCount
          canVote
          cover
          content
          author {
            id
            username
            photoUrl
          }
          tags {
            id
            tagName
          }
        }
      }
    `
  );
  return feed;
}

export const useServers = (
  date?: string,
  key = 'servers'
): QueryObserverResult<ServerObjectInterface[], unknown> =>
  useQuery(key, async () => {
    const servers = await getServers(date);
    return servers;
  });

export const useServer = (
  id: string
): QueryObserverResult<ServerObjectInterface, unknown> =>
  useQuery('server', async () => {
    const server = await getServer(id);
    return server;
  });
