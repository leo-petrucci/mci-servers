import React from 'react';

interface StatusPropsInterface {
  online: boolean;
  slots: string;
}

const Status = ({ online, slots }: StatusPropsInterface): JSX.Element => (
  <div className="text-gray-600 text-sm flex items-center">
    {slots}
    <div className="ml-2 h-2 w-2 rounded-full bg-green-500" />
  </div>
);

export default Status;
