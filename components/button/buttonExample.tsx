import React, { useState } from 'react';
import Button, { ButtonPropsInterface } from './button';

const ButtonExample: React.FC = (props: ButtonPropsInterface) => {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      loading={loading}
      onClick={() => {
        setLoading(!loading);
        props.onClick?.();
      }}
    >
      Button
    </Button>
  );
};

export default ButtonExample;
