'use client';

import { interceptAcdApiError } from '../interceptors/use';
import { createPureInstance } from '../interceptors/create';

const basicInstance = createPureInstance();

interceptAcdApiError(basicInstance);

export default basicInstance;
