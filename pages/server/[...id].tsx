import React from 'react';
import { gql } from 'graphql-request';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import slugify from 'slugify';
import { graphQLClient } from 'pages/_app';
import Server from '../../components/server';
import {
  getServer,
  ServerObjectInterface,
  useServer,
} from '../../utils/hooks/useServers';

const ServerPage = ({
  server,
}: {
  server: ServerObjectInterface;
}): JSX.Element => {
  const router = useRouter();
  const { data, isSuccess } = useServer(router.query.id && router.query.id[0], {
    enabled: Boolean(router.query.id),
  });

  if (isSuccess) return <Server server={data} />;
  return <Server server={server} />;

  // if (server && !data) return <Server server={server} />;
  // if (isFetching) return <>Loading...</>;
  // return <Server server={data} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const server = await getServer(context.params.id[0] as string);
  return {
    props: { server }, // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    allServers,
  }: { allServers: ServerObjectInterface[] } = await graphQLClient.request(
    gql`
      query {
        allServers {
          id
          title
          voteCount
        }
      }
    `
  );

  let paths = allServers.map((server) => ({
    params: {
      id: [server.id.toString(), slugify(server.title)],
    },
  }));

  paths = paths.filter((server) => server !== null);

  return {
    paths,
    fallback: true,
  };
};

export default ServerPage;
