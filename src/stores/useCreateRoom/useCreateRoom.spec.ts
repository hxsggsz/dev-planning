import { renderHook, act } from "@testing-library/react";
import * as zustand from "zustand";
import { myCustomCreate, storeResetFns } from "../__mocks__/zustand";
import { useCreateRoom } from "./useCreateRoom";
import { Database } from "@/services/client.types";

vi.mock("@/services/client", () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn().mockReturnValue({
      data: {
        id: "mock-id",
      },
    }),
  } as unknown as Database,
}));

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

  describe("when call the store", () => {
    it("turn status in `success`", async () => {
      const { result } = renderHook(() => useCreateRoom((state) => state));

      await act(async () => {
        const succesMock = vi.fn();
        const errorMock = vi.fn();
        const createRoomMutation = result.current.createRoom(
          succesMock,
          errorMock,
        );

        return createRoomMutation({ room: "test", userId: "test" });
      });
      expect(result.current.status).toBe("success");
    });

    it("error keep null", async () => {
      const { result } = renderHook(() => useCreateRoom((state) => state));

      await act(async () => {
        const succesMock = vi.fn();
        const errorMock = vi.fn();
        const createRoomMutation = result.current.createRoom(
          succesMock,
          errorMock,
        );

        return createRoomMutation({ room: "test", userId: "test" });
      });

      expect(result.current.error).toBeNull();
    });

    it("calls the callback function", async () => {
      const { result } = renderHook(() => useCreateRoom((state) => state));

      const succesMock = vi.fn();
      const errorMock = vi.fn();

      await act(async () => {
        const createRoomMutation = result.current.createRoom(
          succesMock,
          errorMock,
        );

        return createRoomMutation({ room: "test", userId: "test" });
      });
      expect(succesMock).toHaveBeenCalled();
    });
  });
});
