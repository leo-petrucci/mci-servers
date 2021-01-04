import { gql } from 'graphql-request';
import throttle from 'lodash.throttle';
import { useCallback } from 'react';
import { QueryObserverResult, useQuery } from 'react-query';
import { graphQLClient } from '../../pages/_app';

interface TagInterface {
  id: number;
  tagName: string;
  popularity: number;
}

async function getTags(searchString: string): Promise<TagInterface[]> {
  const tags = graphQLClient.request(
    gql`
      query {
        searchTags(searchString: "${searchString}") {
          id
          tagName
          popularity
        }
      }
    `
  );
  return tags;
}

export const useTags = (
  searchString: string
): QueryObserverResult<TagInterface[], unknown> => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledSearch = useCallback(throttle(getTags, 500), []);
  return useQuery(['tags', searchString], async () => {
    const { searchTags } = await throttledSearch(searchString);
    return searchTags;
  });
};

export default useTags;
