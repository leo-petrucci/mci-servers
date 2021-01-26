import Link from 'next/link';
import React from 'react';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { ServerObjectInterface } from 'utils/hooks/useServers';
import Button from 'components/button';
import Icon from 'components/icon';
import Tag from 'components/tag';
import Author from 'components/author';
import slugify from 'slugify';
import Vote from '../vote';
import Tooltip from 'components/tooltip';

const ServerCard = ({
  server,
}: {
  server: ServerObjectInterface;
}): JSX.Element => {
  const router = useRouter();
  const {
    id,
    title,
    voteCount,
    cover,
    published,
    author,
    tags,
    canVote,
    createdAt,
  } = server;
  return (
    <>
      <article
        className={`relative col-span-12 lg:col-span-4 md:col-span-6 grid grid-cols-12 mb-4 p-2 ${
          !published && 'opacity-50'
        }`}
      >
        {!published && (
          <Tooltip
            placement="top"
            overlay="Questo server non è visible al pubblico."
          >
            <div className="absolute top-0 right-0 py-4 px-6">
              <Icon>
                <path
                  fillRule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clipRule="evenodd"
                />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </Icon>
            </div>
          </Tooltip>
        )}
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

          <div className="col-span-6 px-2 pt-4">
            <Author
              photoSize="small"
              id={author.id}
              username={author.username}
              photoUrl={author.photoUrl}
              subtitle={DateTime.fromISO(createdAt).toLocaleString(
                DateTime.DATE_FULL
              )}
            />
          </div>
          <div className="col-span-6 px-2 pt-4">
            <div className="flex flex-wrap">
              {tags && tags.map((tag) => <Tag key={tag.id} tag={tag} />)}
            </div>
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
