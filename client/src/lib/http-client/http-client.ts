import axios, { Axios, AxiosRequestConfig } from 'axios';

export class HttpClient {
  httpClient: Axios;

  constructor(baseURL: string) {
    this.httpClient = axios.create({ baseURL });
  }

  request(options: AxiosRequestConfig) {
    return this.httpClient.request(options);
  }
}
