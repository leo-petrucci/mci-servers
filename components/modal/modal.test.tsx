import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Component from './dialogExample';

const setupDialog = (props) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const utils = render(<Component {...props} />);
  // const confirm = utils.getByLabelText('Confirm');
  // const cancel = utils.getByLabelText('Cancel');
  const open = utils.getByText('Open modal');
  return {
    open,
    ...utils,
  };
};

test('renders page correctly without function props', () => {
  setupDialog();
  const openButton = screen.getByText(/Open modal/i);
  expect(openButton).toBeInTheDocument();
});

test('renders modal without function props', async () => {
  const { open } = setupDialog();

  fireEvent.click(open);

  await waitFor(() => {
    expect(screen.getByText(/Ooooh a scary modal/i)).toBeInTheDocument();
  });
});

test('closes even if no functions are passed to it', async () => {
  const { open } = setupDialog();

  fireEvent.click(open);

  await waitFor(() => {
    const cancel = screen.getAllByLabelText('Cancel')[0];
    fireEvent.click(cancel);
    expect(cancel).toBeInTheDocument();
  });
});

test('onSubmit callback is called correctly', async () => {
  const onSubmit = jest.fn();
  const { open } = setupDialog({ onSubmit });

  fireEvent.click(open);

  await waitFor(() => {
    const ok = screen.getAllByLabelText('Confirm')[0];
    fireEvent.click(ok);
    expect(onSubmit.mock.calls.length).toBe(1);
  });
});

test('onCancel callback is called correctly', async () => {
  const onCancel = jest.fn();
  const { open } = setupDialog({ onCancel });

  fireEvent.click(open);

  await waitFor(() => {
    const cancel = screen.getAllByLabelText('Cancel')[0];
    fireEvent.click(cancel);
    expect(onCancel.mock.calls.length).toBe(1);
  });
});

test('close callback is called correctly', async () => {
  const onCancel = jest.fn();
  const { open } = setupDialog({ onCancel });

  fireEvent.click(open);

  await waitFor(() => {
    const cancel = screen.getByLabelText('close');
    fireEvent.click(cancel);
    expect(onCancel.mock.calls.length).toBe(1);
  });
});
