export interface Option<T = string> {
  option: T;
  name: string;
  children?: Option<T>[]
}