import React from 'react';
import { ServerObjectInterface } from 'utils/hooks/data';

interface ServerInterface {
  server: ServerObjectInterface;
}

const Server = ({ server }: ServerInterface): JSX.Element => (
  <h1 className="text-xl">{server && server.title}</h1>
);

export default Server;
