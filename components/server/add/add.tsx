import React from 'react';
import Form from 'components/forms/form';
import Input from 'components/forms/input';

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 10,
  },
};

const AddServer = (): JSX.Element => {
  const form = Form.useForm({ criteriaMode: 'all' });
  return (
    <>
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
      </Form>
    </>
  );
};

export default AddServer;
