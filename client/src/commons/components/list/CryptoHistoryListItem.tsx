import Image from 'next/image';

import { CryptoAsset } from '../../../modules/crypto/interfaces/asset.interface';

import { difference } from '../../utils/difference.util';

export default function CryptoHistoryListItem({
  cryptoHistory,
}: {
  cryptoHistory: CryptoAsset;
}) {
  return (
    <div className="p-2 bg-blueGray-500 hover:bg-blueGray-400 transition-colors grid grid-cols-4 items-center gap-2 text-white">
      <div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 cover-img rounded-full overflow-hidden shrink-0">
            <Image src="/bitcoin.jpg" alt="bitcoin" layout="fill" />
          </div>
          <h4 className="font-bold text-lg text-white">
            {cryptoHistory.assetCode}
          </h4>
        </div>
        <p>
          <strong>Low</strong>: {cryptoHistory.low}
        </p>
        <p>
          <strong>High</strong>: {cryptoHistory.high}
        </p>
      </div>
      <div>
        <p>
          <strong>Ask</strong>: ${cryptoHistory.ask}
        </p>
        <p>
          <strong>Bid</strong>: ${cryptoHistory.bid}
        </p>
      </div>
      <div>
        <p>
          <strong>Close</strong>: {cryptoHistory.close}
        </p>
        <p>
          <strong>Open</strong>: {cryptoHistory.open}
        </p>
      </div>
      <div>
        <p>
          <strong>Low last 24h</strong>:{' '}
          {difference(cryptoHistory.lowLast24, cryptoHistory.low)}%
        </p>
        <p>
          <strong>Open last 24h</strong>:{' '}
          {difference(cryptoHistory.openLast24, cryptoHistory.open)}%
        </p>
      </div>
    </div>
  );
}
