import React from 'react';
import Typography from 'components/typography';
import ServerCard from 'components/server/card';
import useLastMonth from 'utils/hooks/getLastMonth';
import TopCard from 'components/server/topCard/topCard';
import { useServers } from '../utils/hooks/data';

const { Title } = Typography;

const Home = (): JSX.Element => {
  const { data, isSuccess } = useServers();
  const { lastMonthIso, lastMonthName } = useLastMonth();
  const { data: lastmonthData, isSuccess: lastmonthIsSuccess } = useServers(
    lastMonthIso,
    'topServers'
  );

  return (
    <div className="grid grid-cols-12 gap-4">
      <aside className="col-span-2 p-4">Sidebar</aside>
      <div className="col-span-10 p-4">
        <div className="mb-4">
          {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
          <Title level={2}>Il top server di {lastMonthName}</Title>
        </div>
        {lastmonthIsSuccess && lastmonthData.length ? (
          <TopCard server={lastmonthData[0]} />
        ) : (
          'Loading...'
        )}
        <div className="mb-4">
          {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
          <Title level={2}>I nostri server più poplari</Title>
        </div>
        {isSuccess && data.length ? (
          <>
            {data.map((server) => (
              <ServerCard server={server} />
            ))}
          </>
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  );
};

export default Home;
