<<<<<<< HEAD
export type Option =  {
  option: string;
=======
export interface Option<T = string> {
  option: T;
>>>>>>> 6db7f6d (fixed dropdown)
  name: string;
  children?: Option<T>[]
}