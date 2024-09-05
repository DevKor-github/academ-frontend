type VoidifyReturn<T> = T extends (...args: infer Args) => any ? (...args: Args) => void : never;

/**
 * 이 코드는 Array를 Compile time에 검증하기 위한 코드입니다.
 * 예를 들어, 어떤 타입 T의 key로 이루어진 Array a가 T의 key만을 포함하면서, T의 key를 빠짐없이 포함하는지 확인합니다.ㄴ
 */

// type NoRepeats<T extends readonly any[]> = {
//   [M in keyof T]: { [N in keyof T]: N extends M ? never : T[M] extends T[N] ? unknown : never }[number] extends never
//     ? T[M]
//     : never;
// };

// export function verifyArray<T>() {
//   type KeyT = keyof T;
//   return function <U extends NoRepeats<U> & readonly KeyT[]>(
//     u: (U | [never]) & ([KeyT] extends [U[number]] ? unknown : never),
//   ) {
//     return u;
//   };
// }
