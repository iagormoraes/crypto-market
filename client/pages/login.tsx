import { useCallback } from 'react';
import { NextPageContext } from 'next';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import Button from '../src/commons/components/buttons/Button';
import Input from '../src/commons/components/form/Input';
import InputError from '../src/commons/components/form/InputError';
import PageError from '../src/commons/components/errors/PageError';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(3).max(18).required(),
});

export default function Login({ csrfToken }: { csrfToken: string }) {
  const { error } = useRouter().query;

  const handleSubmit = useCallback((values: Record<string, any>) => {
    signIn('credentials', {
      ...values,
      callbackUrl: `${window.location.origin}/`,
    });
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-start md:items-center">
      <Formik
        initialValues={{
          csrfToken,
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col rounded bg-blueGray-600 m-2 md:m-0 p-2 w-full md:w-[600px]">
            <h2 className="text-center text-white text-3xl">Authentication</h2>
            <PageError error={error} />
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Field name="email" placeholder="Email" component={Input} />
            {errors.email && touched.email ? (
              <InputError>{errors.email}</InputError>
            ) : null}
            <Field
              name="password"
              type="password"
              placeholder="Password"
              component={Input}
            />
            {errors.password && touched.password ? (
              <InputError>{errors.password}</InputError>
            ) : null}
            <Button type="submit">Login</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
