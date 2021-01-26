import Icon from 'components/icon';
import confirm from 'components/modal/confirm';
import { useRouter } from 'next/router';
import { queryClient } from 'pages/_app';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { usePublish, useUnPublish } from 'utils/hooks/usePublish';
import { ServerObjectInterface } from 'utils/hooks/useServers';

const Controls = ({ serverId }: { serverId: number }): JSX.Element => {
  const [clicked, setClicked] = useState(false);
  const profileRef = useRef();

  return (
    <>
      {/* @ts-ignore */}
      <div ref={profileRef} className="flex items-center">
        <button
          type="button"
          onClick={() => setClicked(!clicked)}
          className="focus:outline-none text-white"
        >
          <Icon>
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </Icon>
        </button>
        {clicked && (
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          <Dropdown
            setClicked={setClicked}
            serverId={serverId}
            forwardRef={profileRef}
          />
        )}
      </div>
    </>
  );
};

const Dropdown = ({
  setClicked,
  forwardRef,
  serverId,
}: {
  serverId: number;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  forwardRef: React.MutableRefObject<undefined>;
}) => {
  const router = useRouter();

  const isPublished = queryClient.getQueryData<ServerObjectInterface>([
    'server',
    String(serverId),
  ]).published;

  const publishMutation = usePublish(serverId);
  const unPublishMutation = useUnPublish(serverId);

  const onPublish = () => {
    const publishId = toast.loading('Pubblicando il server...');
    publishMutation.mutate(null, {
      onSuccess: () => {
        toast.success("Il server e' stato pubblicato.", {
          duration: 5000,
          id: publishId,
        });
        queryClient.invalidateQueries('servers');
        queryClient.invalidateQueries(['server', String(serverId)]);
      },
    });
  };
  const onUnPublish = () => {
    const unpublishId = toast.loading('Nascondendo il server...');
    unPublishMutation.mutate(null, {
      onSuccess: () => {
        toast.success("Il server e' stato nascosto.", {
          duration: 5000,
          id: unpublishId,
        });
        queryClient.invalidateQueries('servers');
        queryClient.invalidateQueries(['server', String(serverId)]);
      },
    });
  };

  const handler = (e: Event) => {
    // @ts-ignore
    if (!forwardRef.current.contains(e.target)) setClicked(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handler, false);
    return () => {
      document.removeEventListener('mousedown', handler, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex justify-end mt-4">
      <div
        className="flex flex-col mt-2 absolute w-full py-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
        style={{ minWidth: '200px' }}
      >
        <button
          type="button"
          className="flex items-center text-left px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors focus:outline-none"
          onClick={() => {
            router.push(`/server/edit/${router.query.id[0]}`);
          }}
        >
          <svg
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <div className="ml-2">Modifica</div>
        </button>
        {!isPublished && (
          <button
            type="button"
            className="flex items-center text-left px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors focus:outline-none"
            onClick={() => {
              confirm({
                title: 'Sei sicuro di voler ripubblicare questo server?',
                content:
                  "Questo server e' stato probablimente nascosto per una ragione.",
                // eslint-disable-next-line no-console
                onOk: () => {
                  onPublish();
                },
                // eslint-disable-next-line no-console
                onCancel: () => console.log('Cancelled'),
              });
            }}
          >
            <svg
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            <div className="ml-2">Pubblica</div>
          </button>
        )}
        {isPublished && (
          <button
            type="button"
            className="flex items-center text-left px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors focus:outline-none"
            onClick={() => {
              confirm({
                title: 'Sei sicuro di voler rimuovere questo server?',
                content:
                  'Server eliminati possono essere riattivati da moderatori e amministratori.',
                // eslint-disable-next-line no-console
                onOk: () => {
                  onUnPublish();
                },
                // eslint-disable-next-line no-console
                onCancel: () => console.log('Cancelled'),
              });
            }}
          >
            <svg
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                clipRule="evenodd"
              />
              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
            </svg>
            <div className="ml-2">Nascondi</div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Controls;
