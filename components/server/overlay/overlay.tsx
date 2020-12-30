import React from 'react';
import {
  animated,
  config,
  useTransition,
  UseTransitionProps,
} from 'react-spring';
import open from './open';

export interface OverlayPropsInterface {
  animationProps?: UseTransitionProps;
  className?: string;
  children?: React.ReactNode;
  visible?: boolean;
  onCancel?: () => void;
  close?: () => void;
}

const Overlay = ({
  visible,
  animationProps,
  children,
}: OverlayPropsInterface): JSX.Element => {
  const transition = useTransition(visible, animationProps);
  return (
    <>
      {transition((style, item) =>
        item ? (
          <animated.div style={style as never}>{children}</animated.div>
        ) : null
      )}
    </>
  );
};

Overlay.defaultProps = {
  className: '',
  animationProps: {
    from: { opacity: 0, transform: `translate(-50%, -50%) scale(0.75)` },
    enter: { opacity: 1, transform: `translate(-50%, -50%) scale(1)` },
    leave: { opacity: 0, transform: `translate(-50%, -50%) scale(0.75)` },
    config: config.stiff,
  },
};

Overlay.open = open;

export default Overlay;
