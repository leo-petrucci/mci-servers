import React from 'react';

interface TextPropsInterface {
  type: string;
  children: React.ReactNode;
  strong?: boolean;
  className?: string;
}

const Text = ({
  type,
  children,
  strong,
  className,
}: TextPropsInterface): JSX.Element => {
  switch (type) {
    default:
      return (
        <span
          className={`${className} text-gray-800 ${strong && 'text-strong'}`}
        >
          {children}
        </span>
      );
    case 'secondary':
      return (
        <span
          className={`${className} text-gray-600 ${strong && 'text-strong'}`}
        >
          {children}
        </span>
      );
    case 'success':
      return (
        <span
          className={`${className} text-green-600 ${strong && 'text-strong'}`}
        >
          {children}
        </span>
      );
    case 'danger':
      return (
        <span
          className={`${className} text-red-600 ${strong && 'text-strong'}`}
        >
          {children}
        </span>
      );
    case 'warning':
      return (
        <span
          className={`${className} text-yellow-600 ${strong && 'text-strong'}`}
        >
          {children}
        </span>
      );
  }
};

Text.defaultProps = {
  strong: false,
  className: '',
};

export default Text;
