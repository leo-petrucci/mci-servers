import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import ReactMarkdown from 'react-markdown';
import Typography from 'components/typography';
import { ServerObjectInterface } from 'utils/hooks/useServers';
import Tag from 'components/tag';
import Author from 'components/author';
import confirm from 'components/modal/confirm';
import Version from 'components/version';
import { useInfo, ServerInfoInterface } from 'utils/hooks/useServerInfo';
import Vote from 'components/server/vote';
import Status from 'components/server/status';
import { useRouter } from 'next/router';

const { Title, Text } = Typography;

interface ServerInterface {
  server: ServerObjectInterface;
}

const Server = ({ server }: ServerInterface): JSX.Element => {
  const {
    title,
    content,
    tags,
    voteCount,
    slots,
    hasEditPrivileges,
    id,
    author,
    createdAt,
    cover,
    canVote,
    version,
    ip,
  } = server;

  const router = useRouter();

  const [info, setInfo] = useState({
    players: { online: 0, max: slots },
    online: true,
  } as ServerInfoInterface);

  const { data, status } = useInfo(ip);

  useEffect(() => {
    if (status === 'success') {
      setInfo(data);
    }
  }, [status, data]);

  const onDelete = () => {
    console.log('delete');
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Sidebar */}
      <aside className="col-span-3 px-4 pb-4 mt-4 border-r border-gray-100">
        {/* Profile Container */}
        <div className="mb-4">
          <div className="mb-2">
            <Title level={5}>Postato da</Title>
          </div>
          <Author
            id={author.id}
            username={author.username}
            photoUrl={author.photoUrl}
            subtitle={DateTime.fromISO(createdAt).toLocaleString(
              DateTime.DATE_FULL
            )}
          />
        </div>
        {/* Tags Container */}
        <div className="mb-4">
          <div className="mb-2">
            <Title level={5}>Tags</Title>
          </div>
          <div className="flex flex-wrap">
            {tags && tags.map((tag) => <Tag key={tag.id} tag={tag} />)}
          </div>
        </div>
        {/* Version Container */}
        <div className="mb-4">
          <div className="mb-2">
            <Title level={5}>Versione</Title>
          </div>
          <div className="flex flex-wrap">
            <Version version={version} />
          </div>
        </div>
        {/* Status Container */}
        <div className="mb-4">
          <div className="mb-2">
            <Title level={5}>Status</Title>
          </div>
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <Status
            slots={`${info.players.online}/${info.players.max}`}
            online={info.online}
          />
        </div>
        {/* Ip Container */}
        <div className="mb-4">
          <div className="mb-2">
            <Title level={5}>Ip</Title>
          </div>
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <Text type="secondary">{ip}</Text>
        </div>
        {/* MOTD Container */}
        <div className="mb-4">
          <div className="mb-2">
            <Title level={5}>MOTD</Title>
          </div>
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          {info.motd?.clean.map((motd, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Text key={i} type="secondary">
              {motd}
            </Text>
          ))}
        </div>
      </aside>
      <div className="col-span-1 py-4">
        <Vote voteCount={voteCount} serverId={id} canVote={canVote} />
      </div>
      <main className="col-span-8 pr-4 py-4">
        <div
          className="mb-4 h-64 w-full bg-cover bg-center rounded-md overflow-hidden"
          style={{ backgroundImage: `url(${cover})` }}
        >
          <div
            className="relative h-full w-full flex items-end p-4"
            style={{
              background:
                'linear-gradient(0deg, rgba(2,0,36,.5) 0%, rgba(0,0,0,0) 50%)',
            }}
          >
            {hasEditPrivileges && (
              <div className="absolute flex right-0 top-0 px-4 py-4">
                <button
                  onClick={() =>
                    router.push(`/server/edit/${router.query.id[0]}`)
                  }
                  type="button"
                  className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 bg-gradient-to-b from-white to-gray-100 mr-4"
                >
                  Modifica
                </button>
                <button
                  onClick={() => {
                    confirm({
                      title: 'Sei sicuro di voler rimuovere questo server?',
                      content:
                        'Server eliminati possono essere riattivati da moderatori e amministratori.',
                      // eslint-disable-next-line no-console
                      onOk: () => {
                        onDelete();
                      },
                      // eslint-disable-next-line no-console
                      onCancel: () => console.log('Cancelled'),
                    });
                  }}
                  type="button"
                  className="bg-red-100 border border-red-600 rounded-md px-4 py-2 bg-gradient-to-b from-red-500 to-red-600 text-white"
                >
                  Elimina
                </button>
              </div>
            )}
            <Title level={1} className="text-white">
              {title && title}
            </Title>
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-2">
            <Title level={5}>Descrizione</Title>
          </div>
          <article className="prose">
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
        </div>
      </main>
    </div>
  );
};

export default Server;
