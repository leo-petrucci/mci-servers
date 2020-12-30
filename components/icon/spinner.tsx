import React from 'react';

const Spinner = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <div className="animate-spin">
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="inline -mt-1"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  </div>
);

export default Spinner;
