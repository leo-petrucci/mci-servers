import React from 'react';
import Button from 'components/button';

interface TagPropsInterface {
  children: React.ReactNode;
  onClick: () => void;
}

const Tag = ({ children, onClick }: TagPropsInterface): JSX.Element => (
  <Button faded size="xsmall" onClick={onClick}>
    {children}
  </Button>
);

export default Tag;
