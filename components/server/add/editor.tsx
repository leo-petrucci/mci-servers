import React, { useEffect, useRef } from 'react';
import ReactMde from 'react-mde';
import { Controller } from 'react-hook-form';
import 'react-mde/lib/styles/css/react-mde-all.css';

interface EditorComponentPropsInterface {
  control: any;
}

const EditorComponent = ({
  control,
}: EditorComponentPropsInterface): JSX.Element => {
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
    'write'
  );
  return (
    <Controller
      control={control}
      name="test"
      render={({ onChange }) => (
        <ReactMde
          onChange={onChange}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />
      )}
    />
  );
};

export default EditorComponent;
