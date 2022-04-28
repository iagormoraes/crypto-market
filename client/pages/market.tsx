import { useCallback } from 'react';
import { NextPageContext } from 'next';
import { getToken, GetTokenParams } from 'next-auth/jwt';
import Head from 'next/head';
import Image from 'next/image';

import { User } from '../src/modules/user/interfaces/user.interface';

import { difference } from '../src/commons/utils/difference.util';

import NavigationBar from '../src/commons/containers/NavigationBar';
import CryptoHistoryListItem from '../src/commons/components/list/CryptoHistoryListItem';
import useCryptoWebsocket from '../src/hooks/useCryptoWebsocket';

export default function Market({
  spreadPercentage,
}: {
  spreadPercentage: number;
}) {
  const cryptoHistory = useCryptoWebsocket(spreadPercentage);

  const renderLastAsset = useCallback(() => {
    if (!cryptoHistory.length)
      return (
        <div>
          <p className="text-3xl text-center text-white my-8">
            Connecting with server to retrieve information...
          </p>
        </div>
      );

    const latestCrypto = cryptoHistory[0];

    return (
      <div className="my-8 grid grid-cols-3">
        <div className="flex gap-4">
          <div className="w-32 h-32 cover-img rounded-full overflow-hidden shrink-0">
            <Image
              className="w-full h-full"
              src="/bitcoin.jpg"
              alt="bitcoin"
              layout="fill"
            />
          </div>
          <div>
            <h4 className="text-white font-bold text-3xl">
              {latestCrypto.assetCode}
            </h4>
            <p className="text-white mt-2 font-bold">Close</p>
            <p className="text-white">${latestCrypto.close}</p>
          </div>
        </div>
        <div>
          <p className="text-white mt-2 font-bold">Bid</p>
          <p className="text-white">${latestCrypto.open}</p>
        </div>
        <div>
          <p className="text-white mt-2 font-bold">Low last 24h</p>
          <p className="text-white">
            {difference(latestCrypto.lowLast24, latestCrypto.low)}%
          </p>
        </div>
      </div>
    );
  }, [cryptoHistory]);

  return (
    <main>
      <Head>
        <title>Market | Crypto Market</title>
      </Head>
      <NavigationBar />

      <div className="container mx-auto px-2 pt-20">
        <h2 className="font-bold text-2xl md:text-4xl text-white mb-4">
          Crypto Realtime Info
        </h2>

        {renderLastAsset()}

        {cryptoHistory.length > 0 && (
          <div className="p-4 bg-blueGray-600 rounded shadow-xl h-96 flex flex-col">
            <h3 className="font-bold text-white text-xl md:text-3xl mb-4">
              Crypto History
            </h3>
            <div className="h-full overflow-y-auto flex flex-col divide-y divide-blueGray-400 rounded shadow-xl">
              {cryptoHistory.map((cryptoHistoryItem, index) => (
                <CryptoHistoryListItem
                  key={index}
                  cryptoHistory={cryptoHistoryItem}
                />
              ))}
            </div>
          </div>
        )}
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

  return {
    props: {
      spreadPercentage: (session.user as User).spread.spreadPercentage,
    },
  };
}
