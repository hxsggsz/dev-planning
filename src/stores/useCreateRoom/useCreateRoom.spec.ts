import { renderHook, act } from "@testing-library/react";
import * as zustand from "zustand";
import { myCustomCreate, storeResetFns } from "../__mocks__/zustand";
import { useCreateRoom } from "./useCreateRoom";

vi.mock("zustand", async () => {
  const zustand = (await vi.importActual("zustand")) as object;

  return {
    __esModule: true,
    ...zustand,
  };
});

vi.spyOn(zustand, "create").mockImplementation(myCustomCreate as never);

describe("useCreateRoom", () => {
  afterEach(() => {
    act(() => {
      storeResetFns.forEach((resetFn) => {
        resetFn();
      });
    });
  });

  describe("when initialize", () => {
    it("status should be `idle`", () => {
      const { result } = renderHook(() => useCreateRoom((state) => state));

      expect(result.current.status).toBe("idle");
    });

    it("error should be `null`", () => {
      const { result } = renderHook(() => useCreateRoom((state) => state));

      expect(result.current.error).toBeNull();
    });
  });
});
