import React from 'react';
import request, { gql } from 'graphql-request';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
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
  console.log('id is', router.query);
  const { data, isFetching } = useServer(router.query.id as string);
  console.log('data is', data);
  console.log('server', server);
  if (server) return <Server server={server} />;
  if (isFetching) return <>Loading...</>;
  return <Server server={data} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const server = await getServer(context.params.id as string);

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
          id: server.id.toString(),
        },
      };
    return null;
  });

  paths = paths.filter((server) => server !== null);

  return {
    paths,
    fallback: true,
  };
};

export default ServerPage;
