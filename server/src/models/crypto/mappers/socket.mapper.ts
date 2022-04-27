export class SocketMapper {
  toDto(raw: any) {
    return JSON.stringify({
      event: raw.event,
      data: raw.data,
    });
  }
}
