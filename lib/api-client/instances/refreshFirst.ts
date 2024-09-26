'use client';

import { createPureInstance } from './_create';
import { insertToken, mouldAsApiResponse, interceptRefreshFirst } from './_interceptors';

const refreshFirst = createPureInstance();
interceptRefreshFirst(refreshFirst);
insertToken(refreshFirst);
// run
mouldAsApiResponse(refreshFirst);

export default refreshFirst;
