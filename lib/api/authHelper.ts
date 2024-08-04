import { build, ApiCTX, ApiResponse } from './builder';
import { SessionIdContextType } from '@/context/SessionIdContext';

type ApiFunction<Req, Res> = (req: Req, ctx?: ApiCTX) => Promise<ApiResponse<Res>>;

export const apiJWTRefresh = build<{}, JWT>('GET', '/api/signup/check-email');

/**
 * Modify api-calling function to handle jwt refresh
 *
 * @param apiFunc
 * @param param1
 * @returns Promise<ApiResponse<Res>>
 */
export const retryWithJWTRefresh =
  <Req, Res>(apiFunc: ApiFunction<Req, Res>, [sessionId, setSessionId]: SessionIdContextType) =>
  (req: Req, ctxt?: ApiCTX) => {
    function setCtxtWithToken(jwt: JWT | undefined) {
      return { ...ctxt, ...{ token: jwt } };
    }

    apiFunc(req, setCtxtWithToken(sessionId?.accessToken)).then((v) => {
      if (v.statusCode === 403) {
        apiJWTRefresh({}, { token: sessionId?.refreshToken }).then((v2) => {
          if (v2.status === 'SUCCESS') {
            setSessionId({ accessToken: v2.data, refreshToken: sessionId?.refreshToken || null });
            return apiFunc(req, setCtxtWithToken(v2.data));
          } else {
            return Promise.resolve(v);
          }
        });
      } else {
        return Promise.resolve(v);
      }
    });
  };
