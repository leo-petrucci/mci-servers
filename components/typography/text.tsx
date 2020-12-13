import React from 'react';

interface TextPropsInterface {
  type: string;
  children: React.ReactNode;
  strong?: boolean;
}

const Text = ({ type, children, strong }: TextPropsInterface): JSX.Element => {
  switch (type) {
    default:
      return (
        <span className={`text-gray-800 ${strong && 'text-strong'}`}>
          {children}
        </span>
      );
    case 'secondary':
      return (
        <span className={`text-gray-600 ${strong && 'text-strong'}`}>
          {children}
        </span>
      );
    case 'success':
      return (
        <span className={`text-green-600 ${strong && 'text-strong'}`}>
          {children}
        </span>
      );
    case 'danger':
      return (
        <span className={`text-red-600 ${strong && 'text-strong'}`}>
          {children}
        </span>
      );
    case 'warning':
      return (
        <span className={`text-yellow-600 ${strong && 'text-strong'}`}>
          {children}
        </span>
      );
  }
};

Text.defaultProps = {
  strong: false,
};

export default Text;
