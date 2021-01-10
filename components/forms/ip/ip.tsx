import Icon from 'components/icon';
import React, { useEffect, useState } from 'react';
import { useInfo } from 'utils/hooks/useServerInfo';
import { useFormData } from '../form/form';
import { useFormItemData } from '../form/item';

const Ip = (): JSX.Element => {
  const { form } = useFormData();
  const { rules } = useFormItemData();
  const [ip, setIp] = useState('');
  const [enabled, setEnabled] = useState(false);
  const { data, isFetching } = useInfo(ip, enabled);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIp(e.target.value);
    if (!enabled) {
      setEnabled(true);
    }
  };

  useEffect(() => {
    if (data?.online) {
      form.clearErrors();
    } else if (!data?.online) {
      form.setError('ip', {
        type: 'manual',
        message: "L'ip non è valido.",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <div className="flex flex-row py-2 px-3 justify-center shadow-sm transition border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 w-full invalid:border-red-600 placeholder-gray-300 ">
        <input
          onChange={onChange}
          type="text"
          name="ip"
          ref={form && form.register(rules)}
          className="w-full"
          placeholder="L'ip del tuo server"
        />
        <div className="text-green-500">
          {isFetching && (
            <Icon.Spinner>
              <path
                d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                fill="currentColor"
              />
            </Icon.Spinner>
          )}
        </div>
      </div>
      {enabled && (
        <div className="text-gray-600 text-sm flex items-center mt-1">
          {data && data.online
            ? data.hostname
            : 'Non abbiamo potuto trovare il server'}
          <div
            className={`ml-2 h-2 w-2 rounded-full ${
              data && data.online ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
        </div>
      )}
    </>
  );
};

export default Ip;
