import React, { useCallback } from "react";
import { Formik } from "formik";
import { FormikErrors, FormikProps } from "formik/dist/types";
import { stubObject } from "lodash";

interface ICustomFormProps<T> {
  data?: T;
  validationSchema?: any | (() => any);

  render(props?: FormikProps<T>): void;

  onSubmit?(data: T): void;

  validate?(data: T): void | object | Promise<FormikErrors<T>>;
}

export const CustomForm = <T extends object>(props: ICustomFormProps<T>) => {
  const { data = {}, onSubmit, validationSchema, render, validate } = props;

  const handleSubmit = useCallback(
    (data: T) => {
      if (!onSubmit) {
        return;
      }
      onSubmit(data);
    },
    [onSubmit]
  );

  return (
    <Formik
      initialValues={data || stubObject()}
      onSubmit={handleSubmit}
      validate={validate}
      validationSchema={validationSchema}
    >
        {(props) => render(props)}
    </Formik>
  );
};
