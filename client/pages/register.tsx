import { useCallback } from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { signIn } from 'next-auth/react';
import { getToken, GetTokenParams } from 'next-auth/jwt';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';

import { RegisterDto } from '../src/modules/auth/dtos/register.dto';
import authServices from '../src/modules/auth/auth.services';

import PageError from '../src/commons/components/errors/PageError';
import Input from '../src/commons/components/form/Input';
import InputError from '../src/commons/components/form/InputError';
import Button from '../src/commons/components/buttons/Button';
import ArrowIcon, {
  ArrowIconDirection,
} from '../src/commons/components/icons/ArrowIcon';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(2).max(256).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(3).max(18).required(),
});

export default function Register() {
  const {
    back,
    query: { error },
  } = useRouter();
  const handleSubmit = useCallback(async (values: RegisterDto) => {
    // We call register service before auth the new generated user
    await authServices.register(values as RegisterDto);

    signIn('credentials', {
      ...values,
      callbackUrl: `${window.location.origin}/`,
    });
  }, []);

  return (
    <main>
      <Head>
        <title>Register | Crypto Market</title>
      </Head>
      <div className="w-full container mx-auto h-screen flex flex-col">
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
        <div className="w-full h-full flex justify-center items-start md:items-center">
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col rounded bg-blueGray-600 m-2 md:m-0 p-2 w-full md:w-[600px]">
                <h2 className="text-center text-white text-3xl">
                  Registration
                </h2>
                <PageError error={error} />
                <Field
                  name="name"
                  placeholder="Your full name"
                  component={Input}
                />
                {errors.name && touched.name ? (
                  <InputError>{errors.name}</InputError>
                ) : null}
                <Field
                  name="email"
                  placeholder="Your email"
                  component={Input}
                />
                {errors.email && touched.email ? (
                  <InputError>{errors.email}</InputError>
                ) : null}
                <Field
                  name="password"
                  type="password"
                  placeholder="Your password"
                  component={Input}
                />
                {errors.password && touched.password ? (
                  <InputError>{errors.password}</InputError>
                ) : null}
                <Button type="submit">Register</Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getToken(context as unknown as GetTokenParams);

  if (session)
    return {
      redirect: {
        destination: '/',
      },
      props: {},
    };

  return {
    props: {},
  };
}
