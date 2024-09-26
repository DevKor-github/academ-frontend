'use client';

import { createPureInstance } from './_create';
import { mouldAsApiResponse } from './_interceptors';

const basic = createPureInstance();
mouldAsApiResponse(basic);

export default basic;
