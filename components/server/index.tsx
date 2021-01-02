import React from 'react';
import { DateTime } from 'luxon';
import Typography from 'components/typography';
import { ServerObjectInterface } from 'utils/hooks/data';
import Tag from 'components/tag';
import Author from 'components/author';
import Vote from './vote';
import Status from './status';

const { Title } = Typography;

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
    id,
    author,
    createdAt,
    cover,
    canVote,
  } = server;
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
          {tags &&
            tags.map((tag) => (
              <Tag key={tag.id} onClick={() => console.log('shit')}>
                {tag.tagName}
              </Tag>
            ))}
        </div>
        {/* Status Container */}
        <div className="mb-4">
          <div className="mb-2">
            <Title level={5}>Status</Title>
          </div>
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <Status slots={slots} online={true} />
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
            className="h-full w-full flex items-end p-4"
            style={{
              background:
                'linear-gradient(0deg, rgba(2,0,36,.5) 0%, rgba(0,0,0,0) 50%)',
            }}
          >
            <Title level={1} className="text-white">
              {title && title}
            </Title>
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-2">
            <Title level={5}>Descrizione</Title>
          </div>
          <article className="prose">{content && content}</article>
        </div>
      </main>
    </div>
  );
};

export default Server;
