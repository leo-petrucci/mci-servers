import { ColTypes } from 'components/layout/col/col';
import React, { useContext, useEffect, useRef } from 'react';
import { useForm, UseFormMethods, UseFormOptions } from 'react-hook-form';
import Item, { ItemPropsInterface } from './item';

interface FormContext {
  form: UseFormMethods;
  labelCol?: ColTypes;
  wrapperCol?: ColTypes;
}

const ctxt = React.createContext<FormContext>({} as FormContext);

const FormContextProvider = ctxt.Provider;

export const useFormData = (): FormContext => {
  const { form, labelCol, wrapperCol } = useContext(ctxt);

  return { form, labelCol, wrapperCol };
};

interface Form {
  children: React.ReactNode;
  labelCol?: ColTypes;
  wrapperCol?: ColTypes;
  // eslint-disable-next-line react/require-default-props
  form?: UseFormMethods<Record<string, unknown>>;
  onSubmit?: (e: unknown) => void;
}

// TODO: There is some wonkyness with form layouts. Ideally I'd like labels to be aligned to the right if the label and inputs are on the same line, but aligned to the left if they're on two lines. It's not worth figuring out now, but need to fix in the future

/**
 * The Form component is a wrapper for inputs.
 * @param children - Any components that should be rendered inside form. If there are any <inputs> as children, Form will automatically catch any errors and collect any inputs from them on submit.
 * @param form - A useForm hook which can be accessed from Form.useForm. Uses https://react-hook-form.com/ under the hood. You can use the functions returned to have finer control over your Form like custom errors and manually getting the form Data back.
 * @param onSubmit - Callback called when form is submitted. Contains form data.
 */
const Form: React.FC<Form> & {
  useForm: (props: UseFormOptions) => UseFormMethods;
  Item: (props: ItemPropsInterface) => JSX.Element;
} = ({ children, form, onSubmit, labelCol, wrapperCol }: Form) => {
  const defaultForm = useForm();
  const thisForm = useRef<HTMLFormElement>(
    typeof window !== 'undefined' && document.createElement('form')
  );

  useEffect(
    () => {
      // const inputs: HTMLInputElement[] = Array.from(
      //   thisForm.current.querySelectorAll('input')
      // );
      // const eventListener = (e: Event, element: HTMLInputElement) => {
      //   // eslint-disable-next-line no-empty
      //   if (element.validity.valid) {
      //     if (form)
      //       form.setError(element.name, {
      //         type: 'manual',
      //         message: '',
      //       });
      //     defaultForm.setError(element.name, {
      //       type: 'manual',
      //       message: '',
      //     });
      //   } else {
      //     if (form)
      //       form.setError(element.name, {
      //         type: 'manual',
      //         message: element.validationMessage,
      //       });
      //     defaultForm.setError(element.name, {
      //       type: 'manual',
      //       message: element.validationMessage,
      //     });
      //     e.preventDefault();
      //   }
      // };
      // inputs.forEach((element) => {
      //   if (element.name) {
      //     element.addEventListener('input', (e) => eventListener(e, element));
      //   }
      // });
      // return () => {
      //   inputs.forEach((element) => {
      //     if (element.name) {
      //       element.removeEventListener('input', (e) =>
      //         eventListener(e, element)
      //       );
      //     }
      //   });
      // };
    },

    [form, defaultForm] // Re-run if eventName or element changes
  );

  if (form)
    return (
      <form
        ref={thisForm}
        id="staffscanner-form"
        className="form"
        onSubmit={onSubmit && form.handleSubmit(onSubmit)}
      >
        <FormContextProvider value={{ form, labelCol, wrapperCol }}>
          {children}
        </FormContextProvider>
      </form>
    );

  return (
    <form
      id="staffscanner-form"
      className="form"
      onSubmit={onSubmit && defaultForm.handleSubmit(onSubmit)}
    >
      <FormContextProvider value={{ form: defaultForm }}>
        {children}
      </FormContextProvider>
    </form>
  );
};

Form.defaultProps = {
  onSubmit: () => undefined,
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

Form.Item = Item;

Form.useForm = useForm;

export default Form;
