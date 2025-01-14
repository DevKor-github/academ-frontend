import { z } from 'zod';

/**
 * zod schema를 이용하여 데이터를 파싱합니다.
 * 파싱에 실패하더라도 오류를 throw하지 않고, 대신 콘솔에 오류를 출력합니다.
 *
 * @param zod zod schema
 * @param input data to parse
 * @returns parsed data
 */
export const silentParse = <T extends z.ZodTypeAny>(zod: T, input: unknown, debugHint?: string): z.infer<T> => {
  const parseResult = zod.safeParse(input);
  if (!parseResult.success) {
    console.error(`데이터를 파싱하는데에 실패했습니다. ${debugHint ?? ''}`, parseResult.error);
    return input as z.infer<T>;
  }
  return parseResult.data;
};
