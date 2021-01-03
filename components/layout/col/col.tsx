/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-lonely-if */
import React from 'react';
import { RowContext } from '../row';

export interface ColPropsInterface extends ColTypes {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface ColTypes {
  span?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

// TODO: Implement column offset by adding extra css rules to global styles

const Col = ({
  children,
  span,
  sm,
  md,
  lg,
  xl,
  className,
  style,
}: ColPropsInterface): JSX.Element => {
  const { gutter } = React.useContext(RowContext);

  let mergedStyle: React.CSSProperties = { ...style };
  if (gutter) {
    mergedStyle = {
      ...(gutter[0]! > 0
        ? {
            paddingLeft: gutter[0]! / 2,
            paddingRight: gutter[0]! / 2,
          }
        : {}),
      ...(gutter[1]! > 0
        ? {
            paddingTop: gutter[1]! / 2,
            paddingBottom: gutter[1]! / 2,
          }
        : {}),
      ...mergedStyle,
    };
  }

  const colFunc = () => {
    let generatedClass = '';
    if (span) generatedClass += span < 12 ? `w-${span}/12 ` : 'w-full ';
    if (sm) generatedClass += sm < 12 ? `sm:w-${sm}/12 ` : 'w-full ';
    if (md) generatedClass += md < 12 ? `md:w-${md}/12 ` : 'w-full ';
    if (lg) generatedClass += lg < 12 ? `lg:w-${lg}/12 ` : 'w-full ';
    if (xl) generatedClass += xl < 12 ? `xl:w-${xl}/12 ` : 'w-full ';
    return generatedClass;
  };
  return (
    <div
      className={`flex flex-wrap ${colFunc()} ${className}`}
      style={mergedStyle}
    >
      {children}
    </div>
  );
};

Col.defaultProps = {
  children: null,
  span: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,
  className: '',
  style: null,
};

// w-1/12 w-2/12 w-3/12 w-4/12 w-5/12 w-6/12 w-7/12 w-8/12 w-9/12 w-10/12 w-11/12 w-full
// sm:w-1/12 sm:w-2/12 sm:w-3/12 sm:w-4/12 sm:w-5/12 sm:w-6/12 sm:w-7/12 sm:w-8/12 sm:w-9/12 sm:w-10/12 sm:w-11/12 sm:w-full
// md:w-1/12 md:w-2/12 md:w-3/12 md:w-4/12 md:w-5/12 md:w-6/12 md:w-7/12 md:w-8/12 md:w-9/12 md:w-10/12 md:w-11/12 md:w-full
// lg:w-1/12 lg:w-2/12 lg:w-3/12 lg:w-4/12 lg:w-5/12 lg:w-6/12 lg:w-7/12 lg:w-8/12 lg:w-9/12 lg:w-10/12 lg:w-11/12 lg:w-full
// xl:w-1/12 xl:w-2/12 xl:w-3/12 xl:w-4/12 xl:w-5/12 xl:w-6/12 xl:w-7/12 xl:w-8/12 xl:w-9/12 xl:w-10/12 xl:w-11/12 xl:w-full

export default Col;
