import React from 'react';
import Modal from './modal';
import { ModalFuncProps } from './modalComponent';

export interface DialogProps extends ModalFuncProps {
  content?: React.ReactNode;
  visible: boolean;
}

const Dialog: React.FC<DialogProps> = (props: DialogProps) => {
  const { onCancel, close, content, onOk } = props;
  return (
    <Modal
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      onCancel={() => {
        onCancel?.();
        close?.();
      }}
      onOk={() => {
        onOk?.();
        close?.();
      }}
    >
      {content}
    </Modal>
  );
};

export default Dialog;
