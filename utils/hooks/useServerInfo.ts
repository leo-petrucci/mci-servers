import { QueryObserverResult, useQuery } from 'react-query';

export interface ServerInfoInterface {
  motd?: {
    clean: string[];
  };
  players: {
    online: number;
    max: number;
  };
  version: string;
  online: boolean;
  icon?: string;
}

export async function getInfo(ip): Promise<ServerInfoInterface> {
  const data = await fetch(`https://api.mcsrvstat.us/2/${ip}`)
    .then((response) => response.json())
    .then((json) => json);
  return data;
}

export const useInfo = (
  id: number,
  ip: string
): QueryObserverResult<ServerInfoInterface, unknown> =>
  useQuery(['info', id], async () => {
    const info = await getInfo(ip);
    return info;
  });
