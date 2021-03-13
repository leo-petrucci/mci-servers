import React from 'react';
import { ServerInfoInterface } from 'utils/hooks/useServerInfo';

interface StatusPropsInterface {
  info: ServerInfoInterface;
}

const Status = ({ info }: StatusPropsInterface): JSX.Element => (
  <div className="text-gray-600 text-sm flex items-center">
    {info.online ? `${info.players.online}/${info.players.max}` : '0/0'}
    <div
      className={`ml-2 h-2 w-2 rounded-full ${
        info.online ? 'bg-green-500' : 'bg-red-500'
      }`}
    />
  </div>
);

export default Status;
