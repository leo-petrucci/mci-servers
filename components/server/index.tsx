import React from 'react';
import Typography from 'components/typography';
import { ServerObjectInterface } from 'utils/hooks/data';
import Tag from 'components/tag';
import Vote from './vote';

const { Title } = Typography;

interface ServerInterface {
  server: ServerObjectInterface;
}

const Server = ({ server }: ServerInterface): JSX.Element => {
  const { title, content, tags, voteCount, id } = server;
  return (
    <div className="grid grid-cols-12 gap-4">
      <aside className="col-span-2 p-4">
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
      </aside>
      <div className="col-span-1 py-4 pl-4">
        <Vote voteCount={voteCount} serverId={id} />
      </div>
      <main className="col-span-9 pr-4 py-4">
        <div className="mb-2">
          <Title level={1}>{title && title}</Title>
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
