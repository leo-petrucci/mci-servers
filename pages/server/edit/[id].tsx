import EditServer from 'components/server/add';
import { useRouter } from 'next/router';
import React from 'react';
import { useServer } from 'utils/hooks/useServers';

const EditServerPage = (): JSX.Element => {
  const router = useRouter();
  const { data, isSuccess } = useServer(router.query.id as string, {
    enabled: Boolean(router.query.id),
  });
  return (
    <>
      {router.query.id && isSuccess && (
        <EditServer
          serverId={Number(router.query.id)}
          defaultValues={{
            title: data.title,
            content: data.content,
            ip: data.ip,
            cover: data.cover,
            tags: data.tags.map((tags) => tags.tagName),
          }}
          submitText="Aggiorna server"
        />
      )}
    </>
  );
};

export default EditServerPage;
