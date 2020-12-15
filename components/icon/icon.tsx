import React from 'react';
import Spinner from './spinner';

interface IconPropsInterface {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

const Icon = ({ children, size }: IconPropsInterface): JSX.Element => {
  const sizeFunc = () => {
    switch (size) {
      case 'small':
        return 16;
      default:
      case 'medium':
        return 20;
      case 'large':
        return 24;
    }
  };

  return (
    <svg
      height={sizeFunc()}
      width={sizeFunc()}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="inline -mt-1"
    >
      {children}
    </svg>
  );
};

Icon.defaultProps = {
  size: 'medium',
};

Icon.Spinner = Spinner;

export default Icon;
