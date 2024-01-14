// add Vitest functions here globally
import { cleanup } from "@testing-library/react";
import { expect, afterEach, beforeEach, vi } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";
import * as axeMatchers from "vitest-axe/matchers";

expect.extend(matchers);
expect.extend(axeMatchers);
// Run cleanup after each test case (e.g., clearing jsdom)
afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

beforeEach(() => {
  // https://github.com/vitest-dev/vitest/issues/4223
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.scrollTo = vi.fn<any>();
});
