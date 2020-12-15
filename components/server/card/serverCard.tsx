import Link from 'next/link';
import React from 'react';
import { ServerObjectInterface } from 'utils/hooks/data';
import Typography from 'components/typography';
import Button from 'components/button';
import Icon from 'components/icon';
import Tag from 'components/tag';

const { Paragraph, Title } = Typography;

const ServerCard = ({
  server,
}: {
  server: ServerObjectInterface;
}): JSX.Element => {
  const { id, title, voteCount, cover, content } = server;
  return (
    <>
      <article className="grid grid-cols-12 mb-4 p-2">
        <div
          style={{ backgroundImage: `url(${cover})` }}
          className="bg-cover self-stretch col-span-4 bg-center rounded-xl"
        />
        <div className="col-span-7 px-4 py-2">
          <Title level={3}>
            <Link href={`/server/${id}`}>{title}</Link>
          </Title>
          <Tag onClick={() => console.log('shit')}>Test</Tag>
          <div className="text-gray-400 text-sm">{voteCount} votes</div>
          <Paragraph lines={4}>{content}</Paragraph>
        </div>
        <div className="col-span-1">
          <Button faded className="h-full w-full">
            <Icon size="large">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </Icon>
          </Button>
        </div>
      </article>
    </>
  );
};

export default ServerCard;
