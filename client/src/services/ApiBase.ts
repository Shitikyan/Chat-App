import Axios, { AxiosInstance } from 'axios';
import { APIResponse, ApiError, ApiHeaders, IApiBase, ID } from './types';

export default class ApiBase<T> implements IApiBase<T> {
  public axiosInstance: AxiosInstance;
  protected baseApiUrl: string;
  private headers?: ApiHeaders;

  constructor(baseApiUrl?: string, headers?: ApiHeaders) {
    this.baseApiUrl = baseApiUrl || '';
    this.axiosInstance = Axios.create({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
      },
    });
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    };
  }

  protected isError(response: APIResponse): boolean {
    return (
      'statusCode' in response && 'message' in response && 'success' in response
    );
  }

  protected createError(e: any): ApiError {
    return {
      statusCode: e?.response?.status,
      errorMessage: e?.response?.data?.error ?? 'Server Error',
      success: e?.response?.data?.success,
    };
  }

  public async getAsync(url: string = this.baseApiUrl): Promise<any> {
    try {
      const data = await this.axiosInstance.get(`${url}`);

      return data;
    } catch (e) {
      return this.createError(e);
    }
  }

  public async postAsync(
    url: string = this.baseApiUrl,
    values?: T,
    headers?: any,
  ): Promise<any> {
    try {
      const data = await this.axiosInstance.post(`${url}`, values);

      return data;
    } catch (e) {
      return this.createError(e);
    }
  }
}
