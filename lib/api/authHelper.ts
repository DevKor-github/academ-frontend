import { build, ApiCTX, ApiResponse } from './builder';
import { SessionIdContextType } from '@/context/SessionIdContext';

type ApiFunction<Req, Res> = (req: Req, ctx?: ApiCTX) => Promise<ApiResponse<Res>>;

export const apiJWTRefresh = build<Record<string, never>, JWT>('GET', '/api/signup/check-email');

/**
 * Modify api-calling function to handle jwt refresh
 *
 * @param apiFunc
 * @param param1
 * @returns Promise<ApiResponse<Res>>
 */
export const retryWithJWTRefresh: <Req, Res>(
  apiFunc: ApiFunction<Req, Res>,
  useSessionIdReturn: SessionIdContextType,
) => ApiFunction<Req, Res> =
  <Req, Res>(apiFunc: ApiFunction<Req, Res>, [sessionId, setSessionId]: SessionIdContextType) =>
  (req: Req, ctxt?: ApiCTX) => {
    function setCtxtWithToken(jwt: JWT | undefined) {
      return { ...ctxt, ...{ token: jwt } };
    }

    return apiFunc(req, setCtxtWithToken(sessionId?.accessToken)).then((v) => {
      if (v.statusCode === 403) {
        return apiJWTRefresh({}, { token: sessionId?.refreshToken || undefined }).then((v2) => {
          if (v2.status === 'SUCCESS') {
            setSessionId({ accessToken: v2.data, refreshToken: sessionId?.refreshToken || null });
            return apiFunc(req, setCtxtWithToken(v2.data)) as Promise<ApiResponse<Res>>;
          } else {
            return Promise.resolve(v);
          }
        });
      } else {
        return Promise.resolve(v);
      }
    });
  };
