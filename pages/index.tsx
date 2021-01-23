import React from 'react';
import Typography from 'components/typography';
import ServerCard from 'components/server/card';
import useLastMonth from 'utils/hooks/getLastMonth';
import TopCard from 'components/server/topCard/topCard';
import useTags from 'utils/hooks/useTags';
import Tag from 'components/tag';
import { useServers } from '../utils/hooks/data';

const { Title } = Typography;

const Home = (): JSX.Element => {
  const { data, isSuccess } = useServers();
  const { lastMonthIso, lastMonthName } = useLastMonth();
  const { data: lastmonthData, isSuccess: lastmonthIsSuccess } = useServers(
    lastMonthIso,
    'topServers'
  );
  const { data: tagData, isSuccess: tagIsSuccess } = useTags('');

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-full">
        <div className="mb-4">
          {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
          <Title level={2}>Il top server di {lastMonthName}</Title>
        </div>
        {lastmonthIsSuccess && lastmonthData.length ? (
          <TopCard server={lastmonthData[0]} />
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
          {tagIsSuccess &&
            tagData.map((tag) => (
              <Tag key={tag.id} onClick={() => console.log('shit')}>
                <span
                  className="overflow-hidden"
                  style={{
                    WebkitLineClamp: 1,
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {tag.tagName}
                </span>
                <span className="text-xs ml-1 self-center">
                  ({tag.popularity})
                </span>
              </Tag>
            ))}
        </div>
      </aside>
      <div className="col-span-10 py-4">
        <div className="mb-4">
          {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
          <Title level={2}>I nostri server più poplari</Title>
        </div>
        {isSuccess && data.length ? (
          <div className="grid grid-cols-12">
            {data.map((server) => (
              <ServerCard key={server.id} server={server} />
            ))}
          </div>
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  );
};

export default Home;
