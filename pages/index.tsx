import React from 'react';
import Typography from 'components/typography';
import ServerCard from 'components/server/card';
import Overlay from 'components/server/overlay';
import { useServers } from '../utils/hooks/data';

const { Title } = Typography;

const { open } = Overlay;

const Home = (): JSX.Element => {
  const { data, isFetching } = useServers();
  return (
    <div className="grid grid-cols-12 gap-4">
      <aside className="col-span-2 p-4">Sidebar</aside>
      <div className="col-span-10 p-4">
        <div className="mb-4">
          {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
          <Title level={2}>{"I nostri server piu' poplari"}</Title>
        </div>
        {isFetching ? (
          'Loading...'
        ) : (
          <>
            {data.map((server) => (
              <ServerCard server={server} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
