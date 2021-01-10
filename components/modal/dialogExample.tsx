import React from 'react';
import Modal from 'components/modal';

const { confirm } = Modal;

const DialogExample: React.FC<{
  onCancel: () => void;
  onSubmit: () => void;
}> = ({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: () => void;
}) => (
  <>
    <button
      type="button"
      onClick={() => {
        confirm({
          title: 'Ooooh a scary modal',
          content: 'Some text here',
          // eslint-disable-next-line no-console
          onOk: () => onSubmit?.(),
          // eslint-disable-next-line no-console
          onCancel: () => onCancel?.(),
        });
      }}
    >
      Open modal
    </button>
  </>
);

export default DialogExample;
