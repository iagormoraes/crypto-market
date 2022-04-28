import Image from 'next/image';
import Link from 'next/link';
import styles from './style.module.css';

import Button, { ButtonVariant } from '../../components/buttons/Button';

export default function NavigationBar() {
  return (
    <nav className={styles.nav}>
      <div className="container m-auto flex items-center px-2">
        <div className={styles.logo}>
          <Image
            className="w-full h-full"
            src="/logo.svg"
            alt="Crypto Market logo"
            layout="fill"
          />
        </div>
        <h1 className="ml-2 text-white text-lg font-bold">Crypto Market</h1>
        <nav className="ml-auto">
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/login" passHref>
                <Button variant={ButtonVariant.Small}>Login</Button>
              </Link>
            </li>
            <li>
              <Link href="/register" passHref>
                <Button variant={ButtonVariant.Small} alt>
                  Register
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  );
}
