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
  const { data, isFetching } = useServer(router.query.id as string);
  if (server)
    return (
      <main className="m-4">
        <Server server={server} />
      </main>
    );
  if (isFetching) return <>Loading...</>;
  return (
    <main className="m-4">
      <Server server={data} />
    </main>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const server = await getServer(context.params.id as string);

  return {
    props: { server }, // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { feed } = await request(
    endpoint,
    gql`
      query {
        feed {
          id
          voteCount
        }
      }
    `
  );

  let paths = feed.map((server) => {
    if (server.voteCount > 0) return { params: { id: server.id.toString() } };
    return null;
  });

  paths = paths.filter((server) => server !== null);

  return {
    paths,
    fallback: true,
  };
};

export default ServerPage;
