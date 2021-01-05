import React from 'react';
import { useFormData } from '../form/form';
import { useFormItemData } from '../form/item';

export interface Input {
  name: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => any;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => any;
  type:
    | 'text'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'range'
    | 'reset'
    | 'search'
    | 'tel'
    | 'time'
    | 'url'
    | 'week';
  autocomplete?: string;
  defaultValue?: string;
  maxLength?: number;
}

/**
 * A simple input. More useful if used inside a <Form> component.
 * TODO: We're currently missing inputs for password, textarea and checkboxes
 */
const Input: React.FC<Input> = ({
  name,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  type,
  autocomplete,
  defaultValue,
  maxLength,
}: Input) => {
  const { form } = useFormData();
  const { label, rules } = useFormItemData();
  return (
    <>
      <input
        className={`shadow-sm transition border border-gray-200 rounded-md px-3 h-10 focus:outline-none focus:ring-2 focus:ring-blue-100 w-full invalid:border-red-600 placeholder-gray-400 ${
          form && form.errors[name] ? 'border-red-300' : ''
        }`}
        type={type}
        onChange={onChange}
        onInvalid={(e) => e.preventDefault()}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-label={label}
        autoComplete={autocomplete}
        ref={form && form.register(rules)}
      />
    </>
  );
};

Input.defaultProps = {
  placeholder: undefined,
  onChange: () => undefined,
  autocomplete: 'string',
};

export default Input;
