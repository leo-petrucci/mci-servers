import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import InputComponent from '../input';
import FormComponent from '.';
import FormExample from './formExample';

const Setup = ({ onSubmit = () => undefined }) => {
  const utils = render(
    <FormComponent onSubmit={onSubmit}>
      <FormComponent.Item
        name="my-input"
        label="My input"
        rules={{
          required: {
            value: true,
            message: 'Input is required',
          },
        }}
      >
        <InputComponent type="text" name="my-input" />
      </FormComponent.Item>
      <input aria-label="submit" type="submit" />
    </FormComponent>
  );
  const input = utils.getByLabelText('My input');
  const submit = utils.getByLabelText('submit');
  return {
    input,
    ...utils,
    submit,
  };
};

const SetupExample = ({ onSubmit = () => undefined, setCustomErr = false }) => {
  const utils = render(
    <FormExample onSubmit={onSubmit} setCustomErr={setCustomErr} />
  );
  const input = utils.getByLabelText('First name');
  const submit = utils.getByText('Submit');
  return {
    input,
    ...utils,
    submit,
  };
};

test('renders form correctly without specifying form hook', () => {
  Setup({});
  const linkElement = screen.getByText(/My input/i);
  expect(linkElement).toBeInTheDocument();
});

test("displays errors, doesn't submit and highlights input", async () => {
  const onSubmit = jest.fn();
  const { submit, input } = Setup({ onSubmit });
  fireEvent.click(submit);

  await waitFor(() => {
    expect(screen.getByText(/Input is required/i)).toBeInTheDocument();
    expect(input).toHaveClass('border-red-300');
  });

  expect(onSubmit.mock.calls.length).toBe(0);
});

test('calls onSubmit if there are no errors', async () => {
  const onSubmit = jest.fn();
  const { submit, input } = Setup({ onSubmit });

  fireEvent.change(input, { target: { value: 'Test value' } });
  fireEvent.click(submit);

  await waitFor(() => {
    expect(() => screen.getByText(/Input is required/i)).toThrow();
  });

  expect(onSubmit.mock.calls.length).toBe(1);
});

test('errors are displayed when submitted via form trigger', async () => {
  const onSubmit = jest.fn();
  const { submit } = SetupExample({ onSubmit });

  fireEvent.click(submit);

  await waitFor(() => {
    expect(screen.getByText(/Input is required/i)).toBeInTheDocument();
  });
});

test('can be submitted from outside form', async () => {
  const onSubmit = jest.fn();
  const { submit, input } = SetupExample({ onSubmit });

  fireEvent.change(input, { target: { value: 'Test value' } });
  fireEvent.click(submit);

  await waitFor(() => {
    expect(() => screen.getByText(/Input is required/i)).toThrow();
  });
  expect(onSubmit.mock.calls[0][0].firstName).toBe('Test value');
  expect(onSubmit.mock.calls.length).toBe(1);
});

test('shows custom errors', async () => {
  const onSubmit = jest.fn();
  const setCustomErr = true;
  const { submit, input } = SetupExample({ onSubmit, setCustomErr });

  fireEvent.change(input, { target: { value: 'Test value' } });
  fireEvent.click(submit);

  await waitFor(() => {
    expect(() => screen.getByText(/Input is required/i)).toThrow();
    expect(
      screen.getByText(/Your name isn't cool enough/i)
    ).toBeInTheDocument();
  });
});
