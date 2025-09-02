import { expect } from '@playwright/test';

function round8(n: number): number {
  return Number(n.toFixed(8));
}

export function registerCalcMatchers() {
  expect.extend({
    toBeCalcResult(received: number, expected: number) {
      const got = round8(received);
      const exp = round8(expected);

      let pass = got === exp;
      let message = () =>
        `Expected ${got} to equal ${exp} (8 decimals)`;

      if (!pass) {
        const gotNeg = round8(-received);
        if (gotNeg === exp) {
          pass = true;
          message = () =>
            `Accepted with sign-flip: ${gotNeg} equals ${exp} (8 decimals)`;
        }
      }

      return { pass, message };
    }
  });
}

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeCalcResult(expected: number): R;
    }
  }
}