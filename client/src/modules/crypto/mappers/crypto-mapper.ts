import { CryptoAsset } from '../interfaces/asset.interface';

export class CryptoMapper {
  toDomain(dto: any, spread: number): CryptoAsset {
    const applyPercentage = (value: string) =>
      (Number(value) * (1 + spread / 100)).toFixed(5);

    return {
      assetCode: dto.assetCode,
      ask: applyPercentage(dto.ask),
      bid: applyPercentage(dto.bid),
      close: applyPercentage(dto.close),
      high: applyPercentage(dto.high),
      low: applyPercentage(dto.low),
      lowLast24: applyPercentage(dto.lowLast24),
      open: applyPercentage(dto.open),
      openLast24: applyPercentage(dto.openLast24),
      volume: dto.volume,
    };
  }
}
