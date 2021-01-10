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
  const div = document.createElement('div');
  document.body.appendChild(div);

  let currentConfig = {
    ...configs,
    close,
    visible: true,
  } as DialogProps;

  function destroy() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function render({ ...props }: DialogProps) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    ReactDOM.render(<Dialog {...props} />, div);
  }

  function close() {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: () => destroy(),
    };
    render(currentConfig);
  }

  render(currentConfig);
};
