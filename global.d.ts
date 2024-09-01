export {};

declare global {
  type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

  type JWT = string;

  type SessionId = {
    accessToken: JWT;
    refreshToken: JWT | null;
  } | null;
}
