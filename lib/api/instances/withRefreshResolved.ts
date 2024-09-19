'use client';

import { createPureInstance } from '../interceptors/create';
import { interceptAddToken, interceptWithResolve } from '../interceptors/use';

const withRefreshResolved = createPureInstance();
interceptAddToken(withRefreshResolved);
interceptWithResolve(withRefreshResolved);

// TODO : add refresh logic

export default withRefreshResolved;
