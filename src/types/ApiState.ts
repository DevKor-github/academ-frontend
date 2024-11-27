type ApiState<T> =
  | {
      loading: true;
      response: unknown;
    }
  | {
      loading: false;
      response: ApiResponse<T>;
    };
