import { TickerDto } from '../dtos/ticker.dto';

export class TickerMapper {
  toDomain(raw: any): TickerDto {
    const data = raw[1];

    return {
      assetCode: raw.slice(-1)[0],
      ask: data.a[0],
      bid: data.b[0],
      close: data.c[0],
      open: data.o[0],
      openLast24: data.o[1],
      high: data.h[0],
      low: data.l[0],
      lowLast24: data.l[1],
      volume: data.v[0],
    };
  }
}
