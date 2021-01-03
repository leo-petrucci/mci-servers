import React from 'react';
import Col from './col';
import { ColPropsInterface } from './col/col';
import Row from './row';
import { RowPropsInterface } from './row/row';

const Layout: React.FC & {
  Row: (props: RowPropsInterface) => JSX.Element;
  Col: (props: ColPropsInterface) => JSX.Element;
} = () => <></>;

Layout.Col = Col;
Layout.Row = Row;

export default Layout;
