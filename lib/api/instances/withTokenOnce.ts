'use client';

import { createPureInstance } from '../interceptors/create';
import { interceptAcdApiError, interceptAddToken } from '../interceptors/use';

const withTokenOnce = createPureInstance();

interceptAddToken(withTokenOnce);

interceptAcdApiError(withTokenOnce);

export default withTokenOnce;
