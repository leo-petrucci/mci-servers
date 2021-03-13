import throttle from 'lodash.throttle';
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
  hostname: string;
  ip: string;
}

export async function getInfo(ip: string): Promise<ServerInfoInterface> {
  const data = await fetch(`https://api.mcsrvstat.us/2/${ip}`)
    .then((response) => response.json())
    .then((json) => json);
  return data;
}

export const useInfo = (
  ip: string,
  enabled = true
): QueryObserverResult<ServerInfoInterface, unknown> => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledSearch = throttle(getInfo, 400);
  return useQuery(
    ['info', ip],
    async () => {
      const info = await throttledSearch(ip);
      return info;
    },
    { enabled }
  );
};
