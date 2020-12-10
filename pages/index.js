import Head from "next/head";
import Link from "next/link";
import { request, gql } from "graphql-request";
import { useQuery, useQueryCache } from "react-query";
import { endpoint } from "./_app";
import { useServers } from "../utils/hooks/data";

export default function Home() {
  const cache = useQueryCache();
  const { status, data, error, isFetching } = useServers();
  return (
    <main className={"m-4"}>
      {isFetching ? (
        "Loading..."
      ) : (
        <>
          {data.map((server) => (
            <article>
              <h3 className={"text-indigo-600 hover:text-indigo-500"}>
                <Link href={`/server/${server.id}`}>{server.title}</Link>
              </h3>
              <div class={"text-gray-400 text-sm"}>
                {server.voteCount} votes
              </div>
            </article>
          ))}
        </>
      )}
    </main>
  );
}
