export type ResponseType<T> = {
  data: T[];
  total: number;
  prev: string | null;
  next: string | null;
};

export type AnalyticsResponseType<T, A> = ResponseType<T> & {
  analytics: A;
};
