export interface IReqX  {
      get<T = any>(url: string, config?: object): Promise<T>;
      post<T = any>(url: string, data?: any, config?: object): Promise<T>;
      put<T = any>(url: string, data?: any, config?: object): Promise<T>;
      patch<T = any>(url: string, data?: any, config?: object): Promise<T>;
      delete<T = any>(url: string, config?: object): Promise<T>;
      request<T = any>(config: object): Promise<T>;
    }