export type ApiResponse<PropName extends string, T = any> = {
  limit: number;
  skip: number;
  total: number;
} & {
  [K in PropName]: T;
};
