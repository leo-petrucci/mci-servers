import React, { useContext } from 'react';
import { ColTypes } from 'components/layout/col/col';
import Layout from 'components/layout';
import { RegisterOptions } from 'react-hook-form';
import Text from 'components/typography/text';
import { useFormData } from './form';

const { Row, Col } = Layout;

export interface ItemPropsInterface {
  children?: React.ReactNode;
  label?: string;
  labelCol?: ColTypes;
  wrapperCol?: ColTypes;
  name?: string;
  rules?: RegisterOptions;
  className?: string;
}

const ctxt = React.createContext<ItemPropsInterface>({} as ItemPropsInterface);

const FormItemContextProvider = ctxt.Provider;

export const useFormItemData = (): ItemPropsInterface => {
  const { label, wrapperCol, labelCol, rules } = useContext(ctxt);

  return { label, wrapperCol, labelCol, rules };
};

const Item = ({
  children,
  label,
  name,
  rules,
  labelCol,
  className,
  wrapperCol,
}: ItemPropsInterface): JSX.Element => {
  const {
    wrapperCol: wrapperColForm,
    labelCol: labelColForm,
    form,
  } = useFormData();
  return (
    <Row className={`form-item form-row mb-2 ${className}`}>
      <FormItemContextProvider value={{ label, labelCol, wrapperCol, rules }}>
        {label && (
          <Col
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...{ ...labelColForm, ...labelCol }}
            className="form-col h-8"
          >
            <label
              htmlFor={name}
              className="flex items-center mr-4 text-sm text-gray-500"
            >
              {label}
            </label>
          </Col>
        )}

        <Col
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...{ ...wrapperColForm, ...labelCol }}
        >
          {children}

          {/* TODO: Animate these values entering and exiting with react spring */}
          <span id="errors" role="alert" aria-atomic="true" className="text-sm">
            <Text type="danger">
              {form && name && form.errors[name] && form.errors[name].message}
            </Text>
          </span>
        </Col>
      </FormItemContextProvider>
    </Row>
  );
};

Item.defaultProps = {
  children: null,
  label: null,
  labelCol: null,
  wrapperCol: null,
  className: '',
};

export default Item;
