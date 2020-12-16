/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import ReactDOM from 'react-dom';
import { ModalFuncProps } from './modalComponent';
import Dialog, { DialogProps } from './dialogComponent';

export interface ConfirmProps extends ModalFuncProps {
  close?: () => void;
  content?: React.ReactNode;
}

export default (configs: ConfirmProps): void => {
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
  } as DialogProps;

  function render({ ...props }: DialogProps) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    ReactDOM.render(<Dialog {...props} />, div);
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
