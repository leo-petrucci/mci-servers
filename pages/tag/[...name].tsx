import ServerCard from 'components/server/card';
import { useRouter } from 'next/router';
import React from 'react';
import { useServersByTag } from 'utils/hooks/useServers';

const TagPage = (): JSX.Element => {
  const router = useRouter();
  const { data, isSuccess } = useServersByTag(
    router.query.name && router.query.name[0],
    ['serversByTag', router.query.name[0]],
    { enabled: Boolean(router.query.name) }
  );
  if (isSuccess) {
    return (
      <>
        <div className="grid grid-cols-12">
          {data.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
      </>
    );
  }
  return <>Loading...</>;
};

export default TagPage;
