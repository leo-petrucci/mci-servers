import Link from 'next/link';
import React from 'react';
import { ServerObjectInterface } from 'utils/hooks/data';
import Typography from 'components/typography';

const { Paragraph, Title } = Typography;

const ServerCard = ({
  server,
}: {
  server: ServerObjectInterface;
}): JSX.Element => {
  const { id, title, voteCount, cover, content } = server;
  return (
    <>
      <article className="grid grid-cols-12 mb-4">
        <div
          style={{ backgroundImage: `url(${cover})` }}
          className="bg-cover self-stretch col-span-4 bg-center"
        />
        <div className="col-span-8 px-4 py-2">
          <Title level={3}>
            <Link href={`/server/${id}`}>{title}</Link>
          </Title>
          <div className="text-gray-400 text-sm">{voteCount} votes</div>
          <Paragraph lines={4}>{content}</Paragraph>
        </div>
      </article>
    </>
  );
};

export default ServerCard;
