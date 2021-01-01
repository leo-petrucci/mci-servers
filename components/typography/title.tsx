import React from 'react';

interface TitlePropsInterface {
  level: number;
  children: React.ReactNode;
  className?: string;
}

const Title = ({
  level,
  children,
  className,
}: TitlePropsInterface): JSX.Element => {
  switch (level) {
    case 1:
    default:
      return (
        <h1 className={`text-3xl font-extrabold tracking-tight ${className}`}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 className={`text-2xl font-bold tracking-tight ${className}`}>
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 className={`text-xl font-bold tracking-tight ${className}`}>
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 className={`text-lg font-bold tracking-tight ${className}`}>
          {children}
        </h4>
      );
    case 5:
      return (
        <h5
          className={`uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900 ${className}`}
        >
          {children}
        </h5>
      );
  }
};

Title.defaultProps = {
  className: '',
};

export default Title;
