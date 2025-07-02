import axios, { AxiosInstance } from 'axios';
import { IReqX } from '../interfaces/IReqX';
import log from '../utils/log';

class ReqX implements IReqX {
  private axiosInstance: AxiosInstance;
  constructor(baseURL: string, token: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'X-CLIENT-KEY': token,
      },
    });
  }

  get<T = any>(url: string, config?: object): Promise<T> {
    return this.axiosInstance.get(url, config).then(res => res.data);
  }

  async post<T = any>(url: string, data?: any, config?: object): Promise<T> {
    try {
      log.info('post', 'post');
      log.info('url', url);
      log.info('data', data);
      log.info('config', config);
      log.info('1234');
      return this.axiosInstance.post(url, data, config);
    } catch (error: any) {
      log.error('post error', error.message);
      throw error;
    }
  }

  put<T = any>(url: string, data?: any, config?: object): Promise<T> {
    return this.axiosInstance.put(url, data, config).then(res => res.data);
  }

  patch<T = any>(url: string, data?: any, config?: object): Promise<T> {
    return this.axiosInstance.patch(url, data, config).then(res => res.data);
  }

  delete<T = any>(url: string, config?: object): Promise<T> {
    return this.axiosInstance.delete(url, config).then(res => res.data);
  }

  request<T = any>(config: object): Promise<T> {
    return this.axiosInstance.request(config).then(res => res.data);
  }

  // Método específico para enviar mensagem
  async sendMessage(data: any) {
    return this.post('/api/message/', data);
  }
}

export default ReqX;
