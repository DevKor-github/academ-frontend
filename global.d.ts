export {};

declare global {
  type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

  type JWT = string;

  type AuthTokens = {
    accessToken: JWT | null;
    refreshToken: JWT | null;
  };
}
