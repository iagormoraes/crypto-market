import { useCallback, useState } from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head';
import { getToken, GetTokenParams } from 'next-auth/jwt';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { SimpleUser } from '../../src/modules/user/interfaces/user.interface';
import { UserRolesEnum } from '../../src/modules/user/interfaces/user-roles.interface';
import { AdminService } from '../../src/modules/admin/admin.service';
import { UpdateUserDto } from '../../src/modules/user/dtos/update-user.dto';

import NavigationBar from '../../src/commons/containers/NavigationBar';

import InputError from '../../src/commons/components/form/InputError';
import Input from '../../src/commons/components/form/Input';
import Button, {
  ButtonVariant,
} from '../../src/commons/components/buttons/Button';

const UserSchema = Yup.object().shape({
  name: Yup.string().min(2).max(256).required(),
  email: Yup.string().email().required(),
  role: Yup.mixed().oneOf([UserRolesEnum.User, UserRolesEnum.Admin]).required(),
  spread: Yup.number().min(0).max(100).required(),
});

interface PageProps {
  users: SimpleUser[];
  sessionProp: Record<string, string>;
}

export default function Dashboard({ users, sessionProp: session }: PageProps) {
  const [usersState, setUsersState] = useState<SimpleUser[]>(users);

  const handleSubmit = useCallback(
    async (id: string, values: Record<string, any>) => {
      const adminService = await new AdminService(session);
      const updatedUser = await adminService.updateUser(
        id,
        values as UpdateUserDto,
      );
      await adminService.updateUserSpread(id, Number(values.spread));

      setUsersState((prev) => {
        return prev.map((item) => {
          if (item.id === updatedUser.id)
            return { ...updatedUser, spread: values.spread };

          return item;
        });
      });
    },
    [session],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const oldState = usersState;

      setUsersState((prev) => prev.filter((item) => item.id != id));

      try {
        await new AdminService(session).deleteUser(id);
      } catch (error) {
        setUsersState(() => oldState);
      }
    },
    [session, usersState],
  );

  return (
    <main>
      <Head>
        <title>Admin dashboard | Crypto Market</title>
      </Head>
      <NavigationBar />
      <div className="container mx-auto px-2 py-20">
        <h2 className="font-bold text-2xl md:text-4xl text-white mb-8">
          Users management
        </h2>
        <div className=" flex flex-col gap-4">
          {usersState.map(({ id, ...user }) => (
            <div key={id} className="p-2 bg-blueGray-700 rounded">
              <Formik<Record<string, string>>
                initialValues={user as Record<string, any>}
                validationSchema={UserSchema}
                onSubmit={(values) => handleSubmit(id, values)}
              >
                {({ errors, touched }) => (
                  <>
                    <Form>
                      <div>
                        <p className="text-white font-bold">ID: {id}</p>
                        <div className="flex flex-wrap gap-2">
                          {Object.keys(user).map((key) => (
                            <div key={key} className="flex-1">
                              <Field
                                name={key}
                                placeholder={key}
                                component={Input}
                              />
                              {errors[key] && touched[key] ? (
                                <InputError>{errors[key]}</InputError>
                              ) : null}
                            </div>
                          ))}
                        </div>
                        <div className="ml-auto flex justify-end gap-4">
                          <Button
                            variant={ButtonVariant.Small}
                            alt
                            onClick={() => handleDelete(id)}
                          >
                            Delete
                          </Button>
                          <Button variant={ButtonVariant.Small} type="submit">
                            Update
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getToken(context as unknown as GetTokenParams);

  if (!session)
    return {
      redirect: {
        destination: '/',
      },
      props: {},
    };

  const service = await new AdminService(
    session as Record<string, any>,
  ).fetchUsers();

  return {
    props: {
      sessionProp: session,
      users: service,
    },
  };
}
