import React, { useEffect, useRef, useState } from 'react';
import useTags from 'utils/hooks/useTags';
import Button from 'components/button';
import { useFormData } from '../form/form';

const SelectTags = (): JSX.Element => {
  const { form } = useFormData();
  const [value, setValue] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState('');
  const { data, isFetching } = useTags(search);
  const inputRef = useRef<HTMLInputElement>();

  const getOptions = async (e) => {
    setSearch(e.target.value);
    // const { searchTags } = await getTags(e.target.value);
    // setTagOptions(searchTags);
  };

  const selectOption = (tagName: string) => {
    const newValue = [...value, tagName];
    setValue(newValue);
    setSearch('');
    inputRef.current.value = '';
  };

  const removeOption = (tagName: string) => {
    const newArr = value.filter((item) => item !== tagName);
    setValue(newArr);
  };

  useEffect(() => {
    form.register('tags');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // onChange(value);
    if (value.length === 0) {
      form.setError('tags', {
        type: 'manual',
        message: 'Devi usare almeno una tag.',
      });
    } else {
      form.clearErrors('tags');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, form.errors]);

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        selectOption(inputRef.current.value);
      }
    };

    const input = inputRef.current;

    input.addEventListener('keyup', handleKeys);

    return () => {
      if (inputRef) input.removeEventListener('keyup', handleKeys);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex flex-col py-2 justify-center shadow-sm transition border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 w-full invalid:border-red-600 placeholder-gray-300 ">
        <div className="flex flex-wrap mx-3">
          {value.map((tag) => (
            <Button
              key={tag}
              onClick={() => removeOption(tag)}
              className="mr-2 mb-2 flex items-center"
              size="xsmall"
            >
              {tag}
              <svg
                className="ml-1"
                height="14"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          ))}
          <input
            ref={inputRef}
            onChange={(e) => getOptions(e)}
            type="email"
            name="tags"
            className="w-full"
            onFocus={() => setIsFocused(true)}
            placeholder="Comincia a scrivere per cercare tags"
          />
        </div>
        {isFocused && (
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          <Dropdown
            isFetching={isFetching}
            data={data}
            value={value}
            selectOption={selectOption}
            setIsFocused={setIsFocused}
          />
        )}
      </div>
      {value.map((each, i) => (
        <input
          key={each}
          type="hidden"
          name={`tags[${i}]`}
          value={each}
          ref={form && form.register()}
          readOnly
        />
      ))}
    </div>
  );
};

interface DropdownPropsInterface {
  isFetching: boolean;
  data: any[];
  value: string[];
  selectOption: (tagName: string) => void;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown = ({
  isFetching,
  data,
  value,
  selectOption,
  setIsFocused,
}: DropdownPropsInterface) => {
  const dropdownRef = useRef();

  const handler = (e: Event) => {
    // @ts-ignore
    if (!dropdownRef.current.contains(e.target)) setIsFocused(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handler, false);
    return () => {
      document.removeEventListener('mousedown', handler, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex flex-col mt-2 absolute w-full  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        {isFetching
          ? 'Loading...'
          : data.map((tagOption) => {
              if (value.includes(tagOption.tagName)) return null;
              return (
                <button
                  type="button"
                  className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  key={tagOption.id}
                  onClick={() => {
                    selectOption(tagOption.tagName);
                  }}
                >
                  {tagOption.tagName}
                </button>
              );
            })}
      </div>
    </div>
  );
};

export default SelectTags;
