import { gql } from 'graphql-request';
import throttle from 'lodash.throttle';
import { QueryObserverResult, useQuery } from 'react-query';
import { graphQLClient } from '../../pages/_app';
import { VersionInterface } from './useServers';

async function getVersions(searchString: string): Promise<VersionInterface[]> {
  const versions = graphQLClient.request(
    gql`
      query {
        searchVersions(searchString: "${searchString}") {
          id
          versionName
        }
      }
    `
  );
  return versions;
}

export const useVersions = (
  searchString: string
): QueryObserverResult<VersionInterface[], unknown> => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledSearch = throttle(getVersions, 500);
  return useQuery(['versions', searchString], async () => {
    const { searchVersions } = await throttledSearch(searchString);
    return searchVersions;
  });
};

export default useVersions;
