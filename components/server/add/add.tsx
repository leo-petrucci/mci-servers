import React, { useEffect, useState } from 'react';
import Form from 'components/forms/form';
import Input from 'components/forms/input';
import Button from 'components/button';
import Typography from 'components/typography';

import dynamic from 'next/dynamic';
import MultipleSelect from 'components/forms/selectTags';
import Cover from 'components/forms/cover/cover';

const { Text } = Typography;

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
  const form = Form.useForm({
    criteriaMode: 'all',
    defaultValues: { tags: [] },
  });
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
            <Input type="text" placeholder="Nome del server" name="title" />
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

          <Form.Item name="tags" label="Tags" {...layout}>
            <MultipleSelect />
          </Form.Item>

          <Form.Item
            name="cover"
            label="Cover"
            {...layout}
            rules={{
              required: {
                value: true,
                message: "Devi aggiungere un'immagine per il tuo server.",
              },
              pattern: {
                value: /(https:)([/|.|\w|\s|-])*\.(?:jpg|png)/g,
                message: "Il link non è un'immagine valida.",
              },
            }}
          >
            <Cover />
          </Form.Item>
          <div className="mb-2">
            <Text type="secondary">
              La cover è una immagine pubblicitaria per il tuo server. Verra
              visualizzata sulla homepage e sulla pagina personale del tuo
              server. Consigliamo dimensioni <strong>1125x400</strong>.
            </Text>
          </div>
        </Form>
        <Button
          onClick={async () => {
            form.trigger().then((res) => {
              if (form.getValues().tags.length === 0)
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
