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
import ArrowIcon, {
  ArrowIconDirection,
} from '../src/commons/components/icons/ArrowIcon';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(3).max(18).required(),
});

export default function Login({ csrfToken }: { csrfToken: string }) {
  const {
    back,
    query: { error },
  } = useRouter();

  const handleSubmit = useCallback((values: Record<string, any>) => {
    signIn('credentials', {
      ...values,
      callbackUrl: `${window.location.origin}/`,
    });
  }, []);
  return (
    <div className="w-full container mx-auto h-screen flex flex-col">
      <div>
        <div className="container mx-auto mt-4">
          <button
            className="flex items-center text-white fill-white gap-4 group"
            onClick={back}
          >
            <ArrowIcon
              direction={ArrowIconDirection.LEFT}
              className="w-8 h-8 group-hover:-translate-x-2 transition-transform"
            />
            <p className="text-lg">Go back</p>
          </button>
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-start md:items-center">
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
              <h2 className="text-center text-white text-3xl">
                Authentication
              </h2>
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
