
interface IHttpResponse<T> {
  data: T;
  status: string;
  message: string;
}

export { type IHttpResponse };
