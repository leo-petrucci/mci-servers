import React from 'react';
import Icon from '../icon';

export interface ButtonPropsInterface {
  children?: React.ReactNode;
  onClick?: () => void;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  type?: 'primary' | 'secondary' | 'link';
  circle?: boolean;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  htmlType?: 'button' | 'submit';
  ariaLabel?: string;
  className?: string;
  loading?: boolean;
  style?: React.CSSProperties;
}

/**
 * A button component, use this rather than <button> in any situation.
 */
const Button = ({
  children,
  onClick,
  style,
  size,
  type,
  htmlType,
  disabled,
  circle,
  prefix,
  suffix,
  className,
  ariaLabel,
  loading,
}: ButtonPropsInterface): JSX.Element => {
  const prefSuffFunc = (level: number) => {
    switch (level) {
      case 1:
        return `${prefix ? 'pl-1' : 'pl-2'} ${suffix ? 'pr-1' : 'pr-2'}`;
      case 2:
        return `${prefix ? 'pl-1' : 'pl-3'} ${suffix ? 'pr-1' : 'pr-3'}`;
      default:
      case 3:
        return `${prefix ? 'pl-3' : 'pl-4'} ${suffix ? 'pr-3' : 'pr-4'}`;
      case 4:
        return `${prefix ? 'pl-2' : 'pl-4'} ${suffix ? 'pr-2' : 'pr-4'}`;
      case 5:
        return `${prefix ? 'pl-3' : 'pl-4'} ${suffix ? 'pr-3' : 'pr-4'}`;
    }
  };

  const sizeFunc = () => {
    switch (size) {
      case 'xsmall':
        return `h-6 ${prefSuffFunc(1)}`;
      case 'small':
        return `h-10 ${prefSuffFunc(2)}`;
      default:
      case 'medium':
        return `h-12 ${prefSuffFunc(3)}`;
      case 'large':
        return `h-14 ${prefSuffFunc(4)}`;
      case 'xlarge':
        return `h-16 ${prefSuffFunc(5)}`;
    }
  };

  const typeFunc = () => {
    switch (type) {
      default:
      case 'primary':
        return `${
          !disabled
            ? 'bg-emerald-50 hover:bg-emerald-100 text-green-600'
            : 'bg-gray-100 text-gray-600'
        }	focus:outline-none focus:ring-2 focus:ring-green-100`;
      case 'secondary':
        return `${
          !disabled
            ? 'bg-opacity-0 border hover:bg-opacity-0 text-gray-400 hover:text-green-600 hover:border-green-600'
            : 'bg-gray-100 text-gray-600'
        } `;
      case 'link':
        return 'text-green-600 hover:text-green-500';
    }
  };

  const circleFunc = () => {
    switch (circle) {
      default:
      case true:
        return 'rounded-full';
      case false:
        return 'rounded-md';
    }
  };

  return (
    <button
      style={style}
      aria-label={ariaLabel}
      // eslint-disable-next-line react/button-has-type
      type={htmlType}
      onClick={onClick}
      className={`${
        // eslint-disable-next-line no-unneeded-ternary
        className ? className : ''
      } ${sizeFunc()} ${typeFunc()} ${circleFunc()} ${
        disabled ? 'disabled:opacity-50 cursor-not-allowed' : ''
      } font-medium transition`}
      disabled={disabled}
    >
      <span className="flex items-center justify-center">
        {loading ? (
          <span className="mr-2 button-loading">
            <Icon.Spinner>
              <path
                d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                fill="currentColor"
              />
            </Icon.Spinner>
          </span>
        ) : (
          <>
            {prefix && (
              <span data-testid="button-prefix" className="mr-2">
                {prefix}
              </span>
            )}
          </>
        )}
        {children}
        {suffix && (
          <span data-testid="button-suffix" className="ml-2">
            {suffix}
          </span>
        )}
      </span>
    </button>
  );
};

Button.defaultProps = {
  children: null,
  htmlType: 'button',
  size: 'medium',
  type: 'primary',
  circle: false,
  disabled: false,
  prefix: null,
  suffix: null,
  onClick: null,
  ariaLabel: null,
  className: null,
};

export default Button;
