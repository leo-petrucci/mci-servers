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

export default Col;
