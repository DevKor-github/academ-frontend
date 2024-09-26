'use client';

import { createPureInstance } from './_create';
import { insertToken, mouldAsApiResponse, retryWithRefresh } from './_interceptors';

const doRefresh = createPureInstance();
insertToken(doRefresh);
// run
retryWithRefresh(doRefresh);
mouldAsApiResponse(doRefresh);

export default doRefresh;
