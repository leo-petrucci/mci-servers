import React from 'react';

interface TitlePropsInterface {
  level: number;
  children: React.ReactNode;
}

const Title = ({ level, children }: TitlePropsInterface): JSX.Element => {
  switch (level) {
    case 1:
    default:
      return (
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 className="text-lg font-bold text-gray-900 tracking-tight">
          {children}
        </h4>
      );
    case 5:
      return (
        <h5 className="text-md font-semibold text-gray-900 tracking-tight">
          {children}
        </h5>
      );
  }
};

export default Title;
