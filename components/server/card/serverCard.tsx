import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { ServerObjectInterface } from 'utils/hooks/useServers';
import Typography from 'components/typography';
import Button from 'components/button';
import Icon from 'components/icon';
import Tag from 'components/tag';
import slugify from 'slugify';
import Vote from '../vote';

const { Paragraph, Title } = Typography;

const ServerCard = ({
  server,
}: {
  server: ServerObjectInterface;
}): JSX.Element => {
  const router = useRouter();
  const { id, title, voteCount, cover, content, tags, canVote } = server;
  return (
    <>
      <article className="col-span-12 lg:col-span-4 md:col-span-6 grid grid-cols-12 mb-4 p-2">
        <div className="col-span-2 px-2">
          <Vote voteCount={voteCount} serverId={id} canVote={canVote} />
        </div>
        <div className="col-span-10">
          <div
            style={{ backgroundImage: `url(${cover})` }}
            className="grid grid-cols-12 bg-cover self-stretch col-span-4 bg-center rounded-md h-36 overflow-hidden"
          >
            <div
              className="col-span-full flex items-end p-2"
              style={{
                background:
                  ' linear-gradient(0deg, rgba(76,76,76,0.7) 0%, rgba(0,0,0,0) 100%)',
              }}
            >
              <h3 className="text-xl font-semibold tracking-tight text-white">
                <Link href={`/server/${id}/${slugify(title)}`}>{title}</Link>
              </h3>
            </div>
          </div>
          <div className="col-span-6 p-2">
            <div className="pt-2 flex flex-wrap">
              {tags &&
                tags.map((tag) => (
                  <Tag key={tag.id} onClick={() => console.log('shit')}>
                    {tag.tagName}
                  </Tag>
                ))}
            </div>
            <Paragraph lines={4}>{content}</Paragraph>
          </div>
          <div className="pt-2">
            <Button
              className="w-full"
              onClick={() => {
                router.push(`/server/${id}/${slugify(title)}`);
              }}
            >
              Apri
              <Icon size="large">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </Icon>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
};

export default ServerCard;
