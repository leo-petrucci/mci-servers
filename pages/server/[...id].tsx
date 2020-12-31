import React from 'react';
import request, { gql } from 'graphql-request';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import slugify from 'slugify';
import { endpoint } from '../_app';
import Server from '../../components/server';
import {
  getServer,
  ServerObjectInterface,
  useServer,
} from '../../utils/hooks/data';

const ServerPage = ({
  server,
}: {
  server: ServerObjectInterface;
}): JSX.Element => {
  const router = useRouter();

  console.log('page');
  console.dir(router.query, { depth: null });
  const { data, isFetching } = useServer(router.query.id && router.query.id[0]);
  if (server) return <Server server={server} />;
  if (isFetching) return <>Loading...</>;
  return <Server server={data} />;
  return null;
};

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('getStaticProps');
  console.dir(context.params, { depth: null });
  const server = await getServer(context.params.id[0] as string);

  return {
    props: { server }, // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { feed }: { feed: ServerObjectInterface[] } = await request(
    endpoint,
    gql`
      query {
        feed {
          id
          title
          voteCount
        }
      }
    `
  );

  let paths = feed.map((server) => {
    if (server.voteCount > 0)
      return {
        params: {
          id: [server.id.toString(), slugify(server.title)],
        },
      };
    return null;
  });

  paths = paths.filter((server) => server !== null);

  console.dir(paths, { depth: null });

  return {
    paths,
    fallback: true,
  };
};

export default ServerPage;
