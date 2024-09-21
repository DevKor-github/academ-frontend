'use client';

import { createPureInstance } from '../interceptors/create';
import { interceptAddToken, interceptWithResolve } from '../interceptors/use';

const withTokenOnce = createPureInstance();

interceptAddToken(withTokenOnce);

interceptWithResolve(withTokenOnce);

export default withTokenOnce;
