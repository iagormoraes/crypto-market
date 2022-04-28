const url = 'ws://localhost:3001';

export class WebsocketClientExternal {
  private ws: WebSocket | undefined;
  isConnected = false;
  listeners: any[] = [];

  connect(callback?: Function) {
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.isConnected = true;

      callback?.();
    };

    this.ws.onmessage = (message) => {
      this.listeners.forEach((listener) => listener(message));
    };

    this.ws.onerror = () => {
      this.ws?.close();
      this.isConnected = false;
    };

    this.ws.onclose = () => {
      setTimeout(() => {
        this.isConnected = false;

        this.connect();
      }, 1000);
      this.isConnected = false;
    };
  }

  send(message: string) {
    this.ws?.send(message);
  }

  addListener(callback: (message: MessageEvent) => any) {
    this.listeners.push(callback);

    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback,
      );
    };
  }
}
