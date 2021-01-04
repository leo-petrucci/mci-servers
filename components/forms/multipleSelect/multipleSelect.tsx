import React, { useState } from 'react';
import { useSelect } from 'react-select-search/dist/cjs';

const options = [
  { value: 's', name: 'Small' },
  { value: 'm', name: 'Medium' },
  { value: 'l', name: 'Large' },
];

const MultipleSelect = (): JSX.Element => {
  const [value, setValue] = useState([]);
  const [snapshot, valueProps, optionProps] = useSelect({
    value,
    options,
    multiple: true,
    allowEmpty: false,
  });
  return (
    <div>
      {/* @ts-ignore */}
      <div {...valueProps}>{`Size: ${snapshot.displayValue}`}</div>
      <div>
        {snapshot.options.map((option) => (
          <button
            type="button"
            key={option.value}
            {...optionProps}
            onClick={() => {
              setValue([...value, option.value]);
            }}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultipleSelect;
