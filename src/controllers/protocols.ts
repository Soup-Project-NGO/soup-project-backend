/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponse<T> {
  statusCode: number;
  body?: T;
  message?: string;
}

export interface HttpRequest<T> {
  params?: any;
  headers?: any;
  body: T;
}