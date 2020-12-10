import request, { gql } from "graphql-request";
import { useQuery } from "react-query";
import { endpoint } from "../../pages/_app";

export function useServers() {
  return useQuery("servers", async () => {
    const { feed } = await request(
      endpoint,
      gql`
        query {
          feed(date: "2020-09-01") {
            id
            title
            voteCount
            canVote
          }
        }
      `
    );
    return feed;
  });
}

export function useServer(id) {
  return useQuery("server", async () => {
    const { server } = await request(
      endpoint,
      gql`
          query {
            server(id: ${id}) {
              title
              content
              voteCount
              canVote
            }
          }
        `
    );
    return server;
  });
}
