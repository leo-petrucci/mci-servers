import Button from 'components/button';
import Icon from 'components/icon';
import React from 'react';

interface VotePropsInterface {
  voteCount: number;
  serverId: number;
  canVote: boolean;
}

const Vote = ({
  voteCount,
  serverId,
  canVote,
}: VotePropsInterface): JSX.Element => {
  const handleVote = () => {
    console.log('test');
  };

  return (
    <div className="flex flex-col">
      <Button
        className="h-full w-full py-1"
        onClick={() => {
          handleVote();
        }}
        disabled={!canVote}
      >
        <Icon size="large">
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </Icon>
      </Button>
      <div className="text-center py-1 text-gray-600">{voteCount}</div>
    </div>
  );
};

export default Vote;
