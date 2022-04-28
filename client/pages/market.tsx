import { NextPageContext } from 'next';
import { getToken, GetTokenParams } from 'next-auth/jwt';
import Head from 'next/head';

import { User } from '../src/modules/user/interfaces/user.interface';

import NavigationBar from '../src/commons/containers/NavigationBar';
import CryptoAssetDetail from '../src/commons/containers/CryptoAssetDetail';
import NoSSR from '../src/commons/components/NoSSR';

export default function Market({
  spreadPercentage,
}: {
  spreadPercentage: number;
}) {
  return (
    <main>
      <Head>
        <title>Market | Crypto Market</title>
      </Head>
      <NavigationBar />
      <NoSSR>
        <CryptoAssetDetail spreadPercentage={spreadPercentage} />
      </NoSSR>
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

  return {
    props: {
      spreadPercentage: (session.user as User).spread.spreadPercentage,
    },
  };
}
