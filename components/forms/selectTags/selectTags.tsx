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
  const inputRef = useRef();

  const getOptions = async (e) => {
    setSearch(e.target.value);
    // const { searchTags } = await getTags(e.target.value);
    // setTagOptions(searchTags);
  };

  const selectOption = (tagName: string) => {
    const newValue = Array.from(new Set([...value, tagName]));
    setValue(newValue);
    // @ts-ignore
    inputRef.current.value = '';
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

  return (
    <div>
      <div className="flex flex-col justify-center shadow-sm transition border border-gray-200 rounded-md h-10 focus:outline-none focus:ring-2 focus:ring-blue-100 w-full invalid:border-red-600 placeholder-gray-300 ">
        <div className="flex mx-3">
          {value.map((tag) => (
            <Button key={tag} className="mr-2" size="xsmall">
              {tag}
            </Button>
          ))}
          <input
            ref={inputRef}
            onChange={(e) => getOptions(e)}
            type="email"
            name="tags"
            onFocus={() => setIsFocused(true)}
            placeholder="Tags"
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
