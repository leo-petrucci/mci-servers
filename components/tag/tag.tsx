import React from 'react';
import Button from 'components/button';

interface TagPropsInterface {
  children: React.ReactNode;
  onClick?: () => void;
}

const Tag = ({ children, onClick }: TagPropsInterface): JSX.Element => (
  <Button className="mr-2 mb-2" size="xsmall" onClick={onClick}>
    {children}
  </Button>
);

Tag.defaultProps = {
  onClick: () => null,
};

export default Tag;
