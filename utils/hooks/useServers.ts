import { gql } from 'graphql-request';
import {
  QueryObserverResult,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
} from 'react-query';
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

export interface ServerPostInterface {
  title: string;
  content: string;
  cover: string;
  ip: string;
  tags: string[];
}

interface TagInterface {
  id: number;
  tagName: string;
  popularity: number;
}

interface AuthorInterface {
  id: number;
  username: string;
  photoUrl: string;
}

export interface VersionInterface {
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
            popularity
          }
        }
      }
    `
  );
  return feed;
}

export async function getServersByTag(
  tag: string
): Promise<ServerObjectInterface[]> {
  const { feedByTag } = await graphQLClient.request(
    gql`
      query {
        feedByTag (tag: "${tag}") {
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
            popularity
          }
        }
      }
    `
  );
  return feedByTag;
}

export async function postServer({
  title,
  content,
  tags,
  ip,
  cover,
}: ServerPostInterface): Promise<ServerObjectInterface> {
  const { createServer } = await graphQLClient.request(
    gql`
      mutation {
        createServer (
          title: "${title}",
          content: "${content}",
          tags: ${JSON.stringify(tags)},
          ip: "${ip}",
          cover: "${cover}",
        ) {
          id
          title
        }
      }
    `
  );
  return createServer;
}

export const useServers = (
  date?: string,
  key = 'servers'
): QueryObserverResult<ServerObjectInterface[], unknown> =>
  useQuery(key, async () => {
    const servers = await getServers(date);
    return servers;
  });

export const useServersByTag = (
  tag: string,
  key: string | string[],
  options?: UseQueryOptions<any>
): QueryObserverResult<ServerObjectInterface[], unknown> =>
  useQuery(
    key,
    async () => {
      const servers = await getServersByTag(tag);
      return servers;
    },
    options
  );

export const useServer = (
  id: string,
  options: UseQueryOptions<any>
): QueryObserverResult<ServerObjectInterface, unknown> =>
  useQuery(
    ['server', id],
    async () => {
      const server = await getServer(id);
      return server;
    },
    options
  );

export const useCreateServer = (): UseMutationResult<ServerObjectInterface> =>
  useMutation('addServer', async (body: ServerPostInterface) => {
    const server = await postServer(body);
    return server;
  });
