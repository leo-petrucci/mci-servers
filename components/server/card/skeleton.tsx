import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonCard = (): JSX.Element => (
  <>
    <div className="relative col-span-12 lg:col-span-4 md:col-span-6 mb-4 p-2">
      <Skeleton height={144} />
      <div className="mt-4 mx-2 flex items-stretch">
        <Skeleton circle width={32} height={32} />
        <div className="w-full ml-2">
          <Skeleton height={32} />
        </div>
      </div>
      <div className="mt-4 mx-2">
        <Skeleton height={24} count={2} />
      </div>
    </div>
  </>
);

export default SkeletonCard;
