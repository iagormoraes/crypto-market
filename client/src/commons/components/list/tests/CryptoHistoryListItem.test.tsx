import { render } from '@testing-library/react';

import CryptoHistoryListItem from '../CryptoHistoryListItem';

import { CryptoAsset } from '../../../../modules/crypto/interfaces/asset.interface';

describe('<CryptoHistoryListItem/>', () => {
  const mock: CryptoAsset = {
    ask: '1000.00',
    assetCode: '1000.00',
    bid: '1000.00',
    close: '1000.00',
    high: '1000.00',
    low: '1000.00',
    lowLast24: '1000.00',
    open: '1000.00',
    openLast24: '1000.00',
    volume: '1000.00',
  };

  it('matches snapshot', () => {
    const { container } = render(
      <CryptoHistoryListItem cryptoHistory={mock} />,
    );

    expect(container).toMatchSnapshot();
  });
});
