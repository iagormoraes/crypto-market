import axios, { Axios, AxiosRequestConfig } from 'axios';

export class HttpClient {
  httpClient: Axios;

  constructor() {
    this.httpClient = axios.create({ baseURL: 'http://localhost:3000' });
  }

  request(options: AxiosRequestConfig) {
    return this.httpClient.request(options);
  }
}
