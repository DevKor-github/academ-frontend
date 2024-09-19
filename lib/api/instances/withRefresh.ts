'use client';

import { createPureInstance } from '../interceptors/create';
import { interceptAcdApiError, interceptAddToken } from '../interceptors/use';

const withRefresh = createPureInstance();
interceptAddToken(withRefresh);
interceptAcdApiError(withRefresh);

// TODO : add refresh logic

export default withRefresh;
