import React, { useEffect, useState } from 'react';
import Form from 'components/forms/form';
import Input from 'components/forms/input';
import Button from 'components/button';

import dynamic from 'next/dynamic';
import MultipleSelect from 'components/forms/multipleSelect';

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
            label="Nome del server"
            name="title"
            rules={{
              required: {
                value: true,
                message: 'Devi aggiungere il nome del server.',
              },
              minLength: {
                value: 10,
                message: 'Il titolo deve essere almeno 10 caratteri.',
              },
              maxLength: {
                value: 200,
                message: 'Il titolo deve essere meno di 200 caratteri.',
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

          <Form.Item
            name="description"
            label="Descrizione"
            {...layout}
            rules={{
              required: {
                value: true,
                message: 'Devi aggiungere una descrizione.',
              },
              minLength: {
                value: 200,
                message: 'La descrizione deve essere almeno 200 caratteri.',
              },
              maxLength: {
                value: 10000,
                message: 'La descrizione deve essere meno di 10000 caratteri.',
              },
            }}
          >
            {isClient && <EditorComponent name="description" />}
          </Form.Item>
          <MultipleSelect />
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
