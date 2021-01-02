import React from 'react';
import { useForm } from 'react-hook-form';
import Form from 'components/forms/form';
import Input from 'components/forms/input';

type FormExample = {
  onSubmit: (e: unknown) => void;
  // eslint-disable-next-line react/require-default-props
  setCustomErr?: boolean;
};

const FormExample: React.FC<FormExample> = ({
  onSubmit,
  setCustomErr = false,
}: FormExample) => {
  const form = useForm({ criteriaMode: 'all' });
  const { getValues, setError } = form;
  return (
    <>
      <Form form={form}>
        <Form.Item
          name="firstName"
          label="First name"
          rules={{
            required: {
              value: true,
              message: 'Input is required', // JS only: <p>error message</p> TS only support string
            },
          }}
        >
          <Input
            type="text"
            placeholder="John smith"
            maxLength={5}
            name="firstName"
          />
        </Form.Item>

        <button
          type="button"
          onClick={() => {
            form.trigger().then((res) => {
              if (res) onSubmit(getValues());
            });
            if (setCustomErr)
              setError('firstName', {
                type: 'manual',
                message: "Your name isn't cool enough",
              });
          }}
        >
          Submit
        </button>
      </Form>
    </>
  );
};

export default FormExample;
