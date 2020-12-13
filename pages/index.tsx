import React from 'react';
import Link from 'next/link';
import { useServers } from '../utils/hooks/data';

const Home = (): JSX.Element => {
  const { data, isFetching } = useServers();
  return (
    <main className="m-4">
      {isFetching ? (
        'Loading...'
      ) : (
        <>
          {data.map((server) => (
            <article>
              <h3 className="text-indigo-600 hover:text-indigo-500">
                <Link href={`/server/${server.id}`}>{server.title}</Link>
              </h3>
              <div className="text-gray-400 text-sm">
                {server.voteCount} votes
              </div>
            </article>
          ))}
        </>
      )}
    </main>
  );
};

export default Home;
