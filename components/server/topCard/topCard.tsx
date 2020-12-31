import Link from 'next/link';
import React from 'react';
import slugify from 'slugify';
import { useRouter } from 'next/router';
import { ServerObjectInterface } from 'utils/hooks/data';
import Typography from 'components/typography';
import Button from 'components/button';
import Icon from 'components/icon';
import Tag from 'components/tag';

const { Paragraph, Title } = Typography;

const TopCard = ({
  server,
}: {
  server: ServerObjectInterface;
}): JSX.Element => {
  const router = useRouter();
  const { id, title, voteCount, cover, content, tags } = server;
  return (
    <>
      <article className="grid grid-cols-12 mb-4 p-2">
        <div className="col-span-1 mr-4 bg-amber-100 text-yellow-600 flex justify-center items-center flex-col">
          <Icon>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </Icon>
          <div className="text-center py-1">{voteCount}</div>
        </div>
        <div
          style={{ backgroundImage: `url(${cover})` }}
          className="bg-cover self-stretch col-span-4 bg-center rounded-xl"
        />
        <div className="col-span-6 px-4 py-2">
          <Title level={3}>
            <Link href={`/server/${id}/${slugify(title)}`}>{title}</Link>
          </Title>
          <div className="py-1">
            {tags &&
              tags.map((tag) => (
                <Tag key={tag.id} onClick={() => console.log('shit')}>
                  {tag.tagName}
                </Tag>
              ))}
          </div>
          <Paragraph lines={4}>{content}</Paragraph>
        </div>
        <div className="col-span-1">
          <Button
            faded
            className="h-full w-full"
            onClick={() => {
              router.push(`/server/${id}/${slugify(title)}`);
            }}
          >
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

export default TopCard;
