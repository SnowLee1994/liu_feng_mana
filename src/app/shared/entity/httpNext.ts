export interface HttpNext<T> {
  success: boolean;
  data: T;
  msg: string;
}
