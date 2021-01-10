import React from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import { Controller } from 'react-hook-form';
import { useFormData } from 'components/forms/form/form';
import { useFormItemData } from 'components/forms/form/item';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

interface EditorComponentPropsInterface {
  name: string;
}

const EditorComponent = ({
  name,
}: EditorComponentPropsInterface): JSX.Element => {
  const { form } = useFormData();
  const { rules } = useFormItemData();
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
    'write'
  );
  return (
    <Controller
      control={form.control}
      name={name}
      rules={rules}
      render={({ onChange, value }) => (
        <ReactMde
          value={value}
          onChange={onChange}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
      )}
    />
  );
};

export default EditorComponent;
