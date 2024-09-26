'use client';

import { createPureInstance } from './_create';
import { insertToken, mouldAsApiResponse, retryWithRefresh } from './_interceptors';

const withRefreshResolved = createPureInstance();
insertToken(withRefreshResolved);
retryWithRefresh(withRefreshResolved);
mouldAsApiResponse(withRefreshResolved);

// TODO : add refresh logic

export default withRefreshResolved;
