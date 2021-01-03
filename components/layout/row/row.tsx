/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';

export type Breakpoint = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export type Gutter = number | Partial<Record<Breakpoint, number>>;

const responsiveArray: Breakpoint[] = ['xl', 'lg', 'md', 'sm', 'xs'];

export interface RowPropsInterface {
  children: React.ReactNode;
  className?: string;
  gutter?: Gutter | [Gutter, Gutter];
  style?: React.CSSProperties;
}

export interface RowContexInterface {
  gutter?: [number, number];
}

export const RowContext: React.Context<RowContexInterface> = React.createContext(
  {}
);

const Row = ({
  children,
  className,
  gutter,
  style,
}: RowPropsInterface): JSX.Element => {
  const getGutter = (): [number, number] => {
    const results: [number, number] = [0, 0];
    const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, 0];
    normalizedGutter.forEach((g, index) => {
      if (typeof g === 'object') {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < responsiveArray.length; i++) {
          const breakpoint: Breakpoint = responsiveArray[i];
          if (g[breakpoint] !== undefined) {
            results[index] = g[breakpoint] as number;
            break;
          }
        }
      } else {
        results[index] = g || 0;
      }
    });
    return results;
  };

  const gutters = getGutter();

  const rowStyle = {
    ...(gutters[0]! > 0
      ? {
          marginLeft: gutters[0]! / -2,
          marginRight: gutters[0]! / -2,
        }
      : {}),
    ...(gutters[1]! > 0
      ? {
          marginTop: gutters[1]! / -2,
          marginBottom: gutters[1]! / 2,
        }
      : {}),
    ...style,
  };

  return (
    <RowContext.Provider value={{ gutter: gutters }}>
      <div className={`flex flex-wrap ${className}`} style={rowStyle}>
        {children}
      </div>
    </RowContext.Provider>
  );
};

export default Row;
