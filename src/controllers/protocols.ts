/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponse<T> {
  statusCode: number;
  body?: T;
  message?: string;
}

export interface HttpRequest<T, P extends Record<string, any> | undefined = undefined> {
  params?: P;
  headers?: any;
  body?: T;
}