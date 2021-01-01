import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ButtonPropsInterface } from './button';
import Component from './buttonExample';
import Icon from '../icon';

const setup = (props: ButtonPropsInterface) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const utils = render(<Component {...props} />);
  const button = utils.getByText('Button');
  return {
    ...utils,
    button,
  };
};

test('basic button renders correctly', () => {
  const { container } = setup({});
  expect(screen.getByText(/Button/i)).toBeInTheDocument();
  expect(container.firstChild).toHaveClass('h-12');
});

test('button renders correctly with prefix', () => {
  setup({
    prefix: (
      <Icon>
        <path
          fillRule="evenodd"
          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
          clipRule="evenodd"
        />
      </Icon>
    ),
  });
  expect(screen.getByText(/Button/i)).toBeInTheDocument();
  expect(screen.getByTestId('button-prefix')).toBeInTheDocument();
});

test('button renders correctly with suffix', () => {
  setup({
    suffix: (
      <Icon>
        <path
          fillRule="evenodd"
          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
          clipRule="evenodd"
        />
      </Icon>
    ),
  });
  expect(screen.getByText(/Button/i)).toBeInTheDocument();
  expect(screen.getByTestId('button-suffix')).toBeInTheDocument();
});

test('renders different sizes correctly', () => {
  const { container } = setup({
    size: 'small',
  });
  expect(container.firstChild).toHaveClass('h-10');
});

test('extra classnames are passed down correctly', () => {
  const { container } = setup({
    className: 'test-class',
  });
  expect(container.firstChild).toHaveClass('test-class');
});

test('loading is triggered correctly', async () => {
  const { button, container } = setup({});
  fireEvent.click(button);

  await waitFor(() => {
    expect(container.children[0].children[0].firstChild).toHaveClass(
      'button-loading'
    );
  });
});

test('onClick is fired correctly', async () => {
  const onClick = jest.fn();
  const { button } = setup({ onClick });
  fireEvent.click(button);

  expect(onClick.mock.calls.length).toBe(1);
});
