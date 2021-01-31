import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { DateTime } from 'luxon';
import ReactMarkdown from 'react-markdown';
import Typography from 'components/typography';
import { ServerObjectInterface } from 'utils/hooks/useServers';
import Tag from 'components/tag';
import Author from 'components/author';
import Version from 'components/version';
import { useInfo, ServerInfoInterface } from 'utils/hooks/useServerInfo';
import Vote from 'components/server/vote';
import Status from 'components/server/status';
import Controls from './controls';

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
    published,
    version,
    ip,
  } = server;

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

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>{title} - Minecraft Italia Server Dedicato</title>
        <meta name="description" content={content} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content={`${title} - Minecraft Italia Server Dedicato`}
        />
        <meta property="og:description" content={content} />
        <meta property="og:image" content={cover} />
        <meta
          property="og:url"
          content={`https://servers.minecraftitalia.net/server/${id}/${title}`}
        />
        <meta
          name="twitter:title"
          content={`${title} - Minecraft Italia Server Dedicato`}
        />
        <meta name="twitter:description" content={content} />
        <meta name="twitter:image" content={cover} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content="Minecraft Italia Server" />
      </Head>
      <div className="grid grid-cols-12 gap-4">
        {!published && (
          <div
            className="col-span-full bg-orange-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
            role="alert"
          >
            <p className="font-bold">Attenzione</p>
            <p>Questo server non è visible al pubblico.</p>
          </div>
        )}
        {/* Sidebar */}
        <aside className="col-span-full order-2 lg:col-span-3 lg:px-4 lg:pb-4 lg:mt-4 border-r border-gray-100">
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
        <div className="col-span-2 lg:col-span-1 lg:py-4">
          <Vote voteCount={voteCount} serverId={id} canVote={canVote} />
        </div>
        <main className="col-span-10 lg:col-span-8 lg:pr-4 lg:py-4">
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
                <div className="absolute right-0 top-0 px-4 py-4">
                  <Controls serverId={server.id} />
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
    </>
  );
};

export default Server;
