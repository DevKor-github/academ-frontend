'use client';

import ky from 'ky-universal';
import { URL_BACKEND_BASE } from '@/lib/directive';

export function createPureInstance() {
  return ky.create({
    prefixUrl: URL_BACKEND_BASE,
    retry: {
      limit: 0,
    },
    hooks: {
      afterResponse: [
        async (_request, _options, response) => {
          const newR = await response.json<ApiResponse<unknown>>();
          newR.statusCode = response.status;
          return new Response(JSON.stringify(newR), { status: 200 });
        },
      ],
    },
  });
}
