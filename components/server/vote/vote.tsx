import Button from 'components/button';
import Icon from 'components/icon';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useVote } from 'utils/hooks/useVote';

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
  const mutation = useVote(serverId);
  const [votes, setVotes] = useState(voteCount);
  const [canVoteState, setCanVoteState] = useState(canVote);

  useEffect(() => {
    setCanVoteState(canVote);
  }, [canVote]);

  const handleVote = () => {
    const voteId = toast.loading('Votando...');
    mutation.mutate(null, {
      onSuccess: () => {
        toast.success('Voto aggiunto!', {
          id: voteId,
        });
        setVotes(votes + 1);
        setCanVoteState(false);
      },
    });
  };

  return (
    <div className="flex flex-col">
      <button
        type="button"
        className="h-full w-full py-1 bg-emerald-50 hover:bg-emerald-100 text-green-600 rounded-md"
        onClick={() => {
          handleVote();
        }}
        disabled={!canVoteState}
      >
        <Icon size="large" className="">
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </Icon>
      </button>
      <div className="text-center py-1 text-gray-600">{votes}</div>
    </div>
  );
};

export default Vote;
