import React, { useEffect, useState } from 'react';
import Form from 'components/forms/form';
import Input from 'components/forms/input';
import Button from 'components/button';

import dynamic from 'next/dynamic';

const EditorComponent = dynamic(() => import('./editor'), { ssr: false });

const layout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
};

const AddServer = (): JSX.Element => {
  const form = Form.useForm({ criteriaMode: 'all' });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4">
      <aside className="col-span-3 px-4 pb-4 mt-4 border-r border-gray-100">
        Sidebar
      </aside>

      <main className="col-span-8 pr-4 py-4">
        <Form {...layout} form={form}>
          <Form.Item
            label="Email"
            name="emailAddress"
            rules={{
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/g,
                message: 'Please input a valid email.',
              },
            }}
          >
            <Input
              type="email"
              placeholder="Email"
              name="emailAddress"
              autocomplete="email"
            />
          </Form.Item>

          <Form.Item label="Descrizione" {...layout}>
            {isClient && <EditorComponent control={form.control} />}
          </Form.Item>
        </Form>
        <Button
          onClick={async () => {
            form.trigger().then((res) => {
              if (res) console.log(form.getValues());
            });
          }}
        >
          Confirm
        </Button>
      </main>
    </div>
  );
};

export default AddServer;
