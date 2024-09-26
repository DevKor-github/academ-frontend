'use client';

import { createPureInstance } from './_create';
import { insertToken, mouldAsApiResponse } from './_interceptors';

const withTokenOnce = createPureInstance();
insertToken(withTokenOnce);
mouldAsApiResponse(withTokenOnce);

export default withTokenOnce;
