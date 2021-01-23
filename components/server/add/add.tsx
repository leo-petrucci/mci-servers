import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Form from 'components/forms/form';
import Input from 'components/forms/input';
import Button from 'components/button';
import Typography from 'components/typography';
import MultipleSelect from 'components/forms/selectTags';
import Cover from 'components/forms/cover';
import Ip from 'components/forms/ip';
import confirm from 'components/modal/confirm';
import { ServerPostInterface, useCreateServer } from 'utils/hooks/useServers';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import slugify from 'slugify';

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
  const router = useRouter();
  const form = Form.useForm({
    criteriaMode: 'all',
    defaultValues: { tags: [] },
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const mutation = useCreateServer();

  const onSubmit = (body: ServerPostInterface) => {
    const serverToastId = toast.loading('Postando il tuo server...');
    mutation.mutate(body, {
      onError: () => {
        toast.error("C'e' stato un problema nel postare il tuo server.", {
          id: serverToastId,
          duration: 5000,
        });
      },
      onSuccess: (res) => {
        toast.success("Il tuo server e' stato postato.", {
          id: serverToastId,
          duration: 5000,
        });
        router.push(`/server/${res.id}/${slugify(res.title)}`);
      },
    });
  };

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
            name="content"
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
            {isClient && <EditorComponent name="content" />}
          </Form.Item>

          <Form.Item
            name="ip"
            label="Ip"
            {...layout}
            rules={{
              required: {
                value: true,
                message: "Devi aggiungere un'immagine per il tuo server.",
              },
            }}
          >
            <Ip />
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
              if (res)
                confirm({
                  title: 'Are you sure you want to add this Organisation?',
                  content:
                    'Make sure you have thoroughly checked the information before submitting.',
                  // eslint-disable-next-line no-console
                  onOk: () => {
                    onSubmit(form.getValues() as ServerPostInterface);
                  },
                  // eslint-disable-next-line no-console
                  onCancel: () => console.log('Cancelled'),
                });
            });
          }}
        >
          Posta server
        </Button>
      </main>
    </div>
  );
};

export default AddServer;
