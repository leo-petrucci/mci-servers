import request, { gql } from "graphql-request";
import { endpoint } from "../_app";
import Server from "../../components/server";
import { useRouter } from "next/router";
import { useServer } from "../../utils/hooks/data";

export default function ServerPage({ server }) {
  const router = useRouter();
  const { data, isFetching } = useServer(router.query.id);
  if (server)
    return (
      <main className={"m-4"}>
        <Server server={server} />
      </main>
    );
  if (isFetching) return <>Loading...</>;
  return (
    <main className={"m-4"}>
      <Server server={data} />
    </main>
  );
}

export async function getStaticProps(context) {
  const { server } = await request(
    endpoint,
    gql`
      query {
        server(id: ${context.params.id}) {
          title
          content
          voteCount
          canVote
        }
      }
    `
  );

  console.log("generating server", context.params.id);

  return {
    props: { server }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
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
  });

  paths = paths.filter((server) => server != undefined);

  console.log(paths);

  return {
    paths,
    fallback: true,
  };
}
