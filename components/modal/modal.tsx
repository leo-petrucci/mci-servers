import React from 'react';
import confirm, { ConfirmProps } from './confirm';
import ModalComponent, { ModalFuncProps } from './modalComponent';

const Modal: React.FC<ModalFuncProps> & {
  confirm: (props: ConfirmProps) => void;
} = ({ children, visible, onCancel, ...props }: ModalFuncProps) => (
  <ModalComponent
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    onCancel={onCancel}
    visible={visible}
    close={onCancel}
  >
    {children}
  </ModalComponent>
);

Modal.confirm = confirm;
export default Modal;
