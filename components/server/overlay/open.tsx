/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import ReactDOM from 'react-dom';
import Overlay, { OverlayPropsInterface } from './overlay';

export interface OpenProps extends OverlayPropsInterface {
  close?: () => void;
  content?: React.ReactNode;
}

export default (configs: OpenProps): void => {
  const portal = document.getElementById('staffscanner-portal');
  let div: HTMLElement;
  if (portal === null) {
    div = document.createElement('div');
    div.id = 'staffscanner-portal';
    document.body.appendChild(div);
  } else {
    div = portal;
  }

  let currentConfig = {
    ...configs,
    close,
    visible: true,
  } as OverlayPropsInterface;

  function render({ ...props }: OverlayPropsInterface) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    ReactDOM.render(<Overlay {...props} />, div);
  }

  function close() {
    currentConfig = {
      ...currentConfig,
      visible: false,
    };
    render(currentConfig);
  }

  render(currentConfig);
};
