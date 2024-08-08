interface Response<R> {
  data?: R;
  totalPages?: number;
}


type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
type ValueOf<T> = T[keyof T];

interface Autocomplete {
  value:  number;
  label: string;
}

interface Post {
  id?: number
  title?: string
  body?: string
}