import { useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import styles from './style.module.css';

import Button, { ButtonVariant } from '../../components/buttons/Button';

import useAppSession, { AppSessionState } from '../../../hooks/useAppSession';
import { UserRolesEnum } from '../../../modules/user/interfaces/user-roles.interface';

export default function NavigationBar() {
  const { push } = useRouter();
  const { status, session } = useAppSession();

  const renderOptions = useCallback(() => {
    switch (status) {
      case AppSessionState.Loading:
        return null;
      case AppSessionState.Unauthenticated:
        return (
          <>
            <li>
              <Link href="/login" passHref>
                <a>
                  <Button variant={ButtonVariant.Small}>Login</Button>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/register" passHref>
                <a>
                  <Button variant={ButtonVariant.Small} alt>
                    Register
                  </Button>
                </a>
              </Link>
            </li>
          </>
        );

      case AppSessionState.Authenticated:
        return (
          <>
            {session.user?.role === UserRolesEnum.Admin && (
              <li>
                <Link href="/admin/dashboard" passHref>
                  <a>
                    <Button variant={ButtonVariant.Small} alt>
                      Admin
                    </Button>
                  </a>
                </Link>
              </li>
            )}
            <li>
              <Button
                variant={ButtonVariant.Small}
                alt
                onClick={() => {
                  push('/');
                  signOut({ redirect: false });
                }}
              >
                Logout
              </Button>
            </li>
          </>
        );

      default:
        return null;
    }
  }, [status, session, push]);

  return (
    <nav className={styles.nav}>
      <div className="container m-auto flex items-center px-2">
        <Link href="/" shallow={false}>
          <a className="flex items-center">
            <div className={styles.logo}>
              <Image
                className="w-full h-full"
                src="/logo.svg"
                alt="Crypto Market logo"
                layout="fill"
              />
            </div>
            <h1 className="ml-2 text-white text-lg font-bold hidden md:block">
              Crypto Market
            </h1>
          </a>
        </Link>
        <nav className="ml-auto">
          <ul className="flex items-center gap-4">
            {session?.user?.name && (
              <span className="text-white mr-4 invisible md:visible">
                Hello, <strong>{session.user.name}</strong>
              </span>
            )}
            {renderOptions()}
          </ul>
        </nav>
      </div>
    </nav>
  );
}
