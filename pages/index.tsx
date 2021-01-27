import React, { useRef } from 'react';
import Typography from 'components/typography';
import ServerCard from 'components/server/card';
import useLastMonth from 'utils/hooks/getLastMonth';
import TopCard from 'components/server/topCard/topCard';
import useTags from 'utils/hooks/useTags';
import Tag from 'components/tag';
import useIntersectionObserver from 'utils/hooks/useIntersectionObserver';
import { useServers } from 'utils/hooks/useServers';
import Button from 'components/button';
import useVersions from 'utils/hooks/useVersions';
import Version from 'components/version';

const { Title } = Typography;

const Home = (): JSX.Element => {
  const loadMoreButtonRef = useRef();
  const {
    data,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useServers();
  const { lastMonthIso, lastMonthName } = useLastMonth();
  const { data: lastmonthData, isSuccess: lastmonthIsSuccess } = useServers(
    lastMonthIso,
    'topServers'
  );
  const { data: tagData, isSuccess: tagIsSuccess } = useTags('');

  const { data: versionData, isSuccess: versionIsSuccess } = useVersions('');

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-full">
        <div className="mb-4">
          {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
          <Title level={2}>Il top server di {lastMonthName}</Title>
        </div>
        {lastmonthIsSuccess && lastmonthData.pages[0].length ? (
          <TopCard server={lastmonthData.pages[0][0]} />
        ) : (
          'Loading...'
        )}
      </div>
      <aside className="col-span-2 py-4">
        {/* Tags Container */}
        <div className="mb-4">
          <div className="mb-2">
            <Title level={5}>Tags poplari</Title>
          </div>
          <div className="flex flex-wrap">
            {tagIsSuccess &&
              tagData.map((tag) => <Tag key={tag.id} tag={tag} />)}
          </div>
        </div>
        {/* Versions Container */}
        <div className="mb-4">
          <div className="mb-2">
            <Title level={5}>Versioni</Title>
          </div>
          <div className="flex flex-wrap">
            {versionIsSuccess &&
              versionData.map((version) => (
                <Version key={version.id} version={version} />
              ))}
          </div>
        </div>
      </aside>
      <div className="col-span-10 py-4">
        <div className="mb-4">
          {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
          <Title level={2}>I nostri server più poplari</Title>
        </div>
        {isSuccess && data.pages.length ? (
          <div className="grid grid-cols-12">
            {data.pages.map((page, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={i}>
                {page.map((server) => (
                  <ServerCard key={server.id} server={server} />
                ))}
              </React.Fragment>
            ))}
          </div>
        ) : (
          'Loading...'
        )}

        <div
          className="col-span-full flex justify-center"
          ref={loadMoreButtonRef}
        >
          <Button
            type="secondary"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {/* eslint-disable-next-line no-nested-ternary */}
            {isFetchingNextPage
              ? 'Caricando più server...'
              : hasNextPage
              ? 'Carica più server'
              : 'Non ci sono più server da caricare.'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
