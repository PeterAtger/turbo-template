export type FormResultType<T = undefined> = {
  success: boolean,
  message: string,
  data?: T
};
