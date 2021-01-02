import { gql } from 'graphql-request';
import { QueryObserverResult, useQuery } from 'react-query';
import { graphQLClient } from '../../pages/_app';

export interface ServerObjectInterface {
  id: number;
  title: string;
  ip: string;
  content: string;
  createdAt: string;
  slots: number;
  cover: string;
  voteCount: number;
  canVote: boolean;
  tags: TagInterface[];
  author: AuthorInterface;
  version: VersionInterface;
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

interface VersionInterface {
  id: number;
  versionName: string;
}

export async function getServer(id: string): Promise<ServerObjectInterface> {
  const { server } = await graphQLClient.request(
    gql`
        query {
          server(id: ${id}) {
            id
            title
            ip
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
            version {
              id
              versionName
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
  const { feed } = await graphQLClient.request(
    gql`
      query {
        feed ${date ? `(date: "${date}")` : ''} {
          id
          title
          ip
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
          version {
            id
            versionName
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
  useQuery(['server', id], async () => {
    const server = await getServer(id);
    return server;
  });
