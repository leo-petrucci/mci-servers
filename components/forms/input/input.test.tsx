import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Form from 'components/forms/form';
import Component, { Input } from './index';

const setup = (
  type: Input['type'] = 'text',
  onChange: Input['onChange'] = () => undefined,
  placeholder = '',
  defaultValue = '',
  onFocus: Input['onFocus'] = () => undefined,
  onBlur: Input['onBlur'] = () => undefined
) => {
  const utils = render(
    <Form.Item label="My input">
      <Component
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        defaultValue={defaultValue}
        name="my-input"
      />
    </Form.Item>
  );
  const input = utils.getByLabelText('My input');
  return {
    input,
    ...utils,
  };
};

test('allows inputs', () => {
  const { input } = setup('text');
  fireEvent.change(input, { target: { value: '23' } });
  expect((input as HTMLInputElement).value).toBe('23');
});

test('allows changing types', () => {
  const { input } = setup('tel');
  expect((input as HTMLInputElement).type).toBe('tel');
});

test('fires onchange function', () => {
  const onChange = jest.fn();
  const { input } = setup('text', onChange);
  fireEvent.change(input, { target: { value: '2' } });
  expect(onChange.mock.calls.length).toBe(1);

  fireEvent.change(input, { target: { value: '23' } });
  expect(onChange.mock.calls.length).toBe(2);
});

test('fires onFocus function', () => {
  const onFocus = jest.fn();
  const { input } = setup('text', () => undefined, '', 'Some value', onFocus);
  fireEvent.focus(input);
  expect(onFocus.mock.calls.length).toBe(1);
});

test('fires onBlur function', () => {
  const onBlur = jest.fn();
  const { input } = setup(
    'text',
    () => undefined,
    '',
    'Some value',
    () => undefined,
    onBlur
  );
  fireEvent.focus(input);
  fireEvent.blur(input);
  expect(onBlur.mock.calls.length).toBe(1);
});

test('displays default value', () => {
  const { input } = setup('text', () => undefined, '', 'Some value');
  expect((input as HTMLInputElement).defaultValue).toBe('Some value');
});
