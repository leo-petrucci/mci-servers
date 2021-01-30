import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonCard = (): JSX.Element => (
  <>
    <article className="grid grid-cols-12 gap-4 lg:p-2">
      <div className="col-span-full lg:col-span-5">
        <Skeleton height={180} />
      </div>
      <div className="col-span-full lg:col-span-6 flex flex-col">
        <Skeleton height={36} />
        <div className="mt-4">
          <Skeleton height={16} count={5} />
        </div>
      </div>
    </article>
  </>
);

export default SkeletonCard;
