import { renderHook, act } from "@testing-library/react";
import * as zustand from "zustand";
import { myCustomCreate, storeResetFns } from "../__mocks__/zustand";
import { Database } from "@/services/client.types";
import { useUser } from "./useUserStore";

vi.mock("@/services/client", () => {
  let callCount = 0;
  const mockSignIn = vi.fn();
  mockSignIn.mockImplementation(() => {
    callCount++;
    if (callCount < 4) {
      return { data: {} };
    }
    return { error: { message: "mock error" } };
  });

  let callCountSignOut = 0;
  const mockSignOut = vi.fn();
  mockSignOut.mockImplementation(() => {
    callCountSignOut++;
    if (callCountSignOut < 4) {
      return { error: null };
    }
    return { error: { message: "mock error" } };
  });

  return {
    supabase: {
      auth: {
        signInWithPassword: mockSignIn,
        signOut: mockSignOut,
      },
    },
  } as unknown as Database;
});

vi.mock("zustand", async () => {
  const zustand = (await vi.importActual("zustand")) as object;

  return {
    __esModule: true,
    ...zustand,
  };
});

vi.spyOn(zustand, "create").mockImplementation(myCustomCreate as never);

describe("useUser", () => {
  afterEach(() => {
    act(() => {
      storeResetFns.forEach((resetFn) => {
        resetFn();
      });
    });
  });

  describe("when initialize", () => {
    it("status should be `idle`", () => {
      const { result } = renderHook(() => useUser((state) => state));

      expect(result.current.status).toBe("idle");
    });

    it("user should be `null`", () => {
      const { result } = renderHook(() => useUser((state) => state));

      expect(result.current.user).toBeNull();
    });

    it("error should be `null`", () => {
      const { result } = renderHook(() => useUser((state) => state));

      expect(result.current.error).toBeNull();
    });
  });

  describe("when call the signin", () => {
    describe("and has no error", () => {
      it("turn status in `success`", async () => {
        const { result } = renderHook(() => useUser((state) => state));

        const successMock = vi.fn();
        const errorMock = vi.fn();

        await act(async () => {
          const storeFunc = result.current.signIn(successMock, errorMock);

          return storeFunc({ email: "email", password: "password" });
        });

        expect(successMock).toHaveBeenCalledOnce();
        expect(result.current.status).toBe("success");
      });

      it("calls the onSuccess callback", async () => {
        const { result } = renderHook(() => useUser((state) => state));

        const successMock = vi.fn();
        const errorMock = vi.fn();

        await act(async () => {
          const storeFunc = result.current.signIn(successMock, errorMock);

          return storeFunc({ email: "email", password: "password" });
        });

        expect(successMock).toHaveBeenCalledOnce();
      });

      it("error keep null", async () => {
        const { result } = renderHook(() => useUser((state) => state));

        const successMock = vi.fn();
        const errorMock = vi.fn();

        await act(async () => {
          const storeFunc = result.current.signIn(successMock, errorMock);

          return storeFunc({ email: "email", password: "password" });
        });

        expect(result.current.error).toBeNull();
      });
    });

    describe("and has errors", () => {
      it("turn status into `Error`", async () => {
        const { result } = renderHook(() => useUser((state) => state));

        const successMock = vi.fn();
        const errorMock = vi.fn();

        await act(async () => {
          const storeFunc = result.current.signIn(successMock, errorMock);

          return storeFunc({ email: "email", password: "password" });
        });

        expect(result.current.status).toBe("error");
      });

      it("calls thge onError callback", async () => {
        const { result } = renderHook(() => useUser((state) => state));

        const successMock = vi.fn();
        const errorMock = vi.fn();

        await act(async () => {
          const storeFunc = result.current.signIn(successMock, errorMock);

          return storeFunc({ email: "email", password: "password" });
        });

        expect(errorMock).toHaveBeenCalledOnce();
      });

      it("updates the error value", async () => {
        const { result } = renderHook(() => useUser((state) => state));

        const successMock = vi.fn();
        const errorMock = vi.fn();

        await act(async () => {
          const storeFunc = result.current.signIn(successMock, errorMock);

          return await storeFunc({ email: "email", password: "password" });
        });

        expect(result.current.error).toMatch("mock error");
      });

      it("user keeps null", async () => {
        const { result } = renderHook(() => useUser((state) => state));

        const successMock = vi.fn();
        const errorMock = vi.fn();

        await act(async () => {
          const storeFunc = result.current.signIn(successMock, errorMock);

          return storeFunc({ email: "email", password: "password" });
        });

        expect(result.current.user).toBeUndefined();
      });
    });
  });

  describe("when call the signout", () => {
    describe("and has no error", () => {
      it("turn status in `success`", async () => {
        const { result } = renderHook(() => useUser((state) => state));

        const successMock = vi.fn();
        const errorMock = vi.fn();

        await act(async () => {
          const storeFunc = result.current.signOut(successMock, errorMock);

          return await storeFunc();
        });

        expect(successMock).toHaveBeenCalledOnce();
        expect(result.current.status).toBe("success");
      });

      it("calls the onSuccess callback", async () => {
        const { result } = renderHook(() => useUser((state) => state));

        const successMock = vi.fn();
        const errorMock = vi.fn();

        await act(async () => {
          const storeFunc = result.current.signOut(successMock, errorMock);

          return storeFunc();
        });

        expect(successMock).toHaveBeenCalledOnce();
      });

      it("error keep null", async () => {
        const { result } = renderHook(() => useUser((state) => state));

        const successMock = vi.fn();
        const errorMock = vi.fn();

        await act(async () => {
          const storeFunc = result.current.signOut(successMock, errorMock);

          return storeFunc();
        });

        expect(result.current.error).toBeNull();
      });
    });

    describe("and has errors", () => {
      it("turn status into `Error`", async () => {
        const { result } = renderHook(() => useUser((state) => state));

        const successMock = vi.fn();
        const errorMock = vi.fn();

        await act(async () => {
          const storeFunc = result.current.signOut(successMock, errorMock);

          return storeFunc();
        });
        expect(result.current.status).toBe("error");
      });

      it("calls thge onError callback", async () => {
        const { result } = renderHook(() => useUser((state) => state));

        const successMock = vi.fn();
        const errorMock = vi.fn();

        await act(async () => {
          const storeFunc = result.current.signOut(successMock, errorMock);

          return storeFunc();
        });
        expect(errorMock).toHaveBeenCalledOnce();
      });

      it("updates the error value", async () => {
        const { result } = renderHook(() => useUser((state) => state));

        const successMock = vi.fn();
        const errorMock = vi.fn();

        await act(async () => {
          const storeFunc = result.current.signIn(successMock, errorMock);

          return await storeFunc({ email: "email", password: "password" });
        });

        expect(result.current.error).toMatch("mock error");
      });

      it("user keeps null", async () => {
        const { result } = renderHook(() => useUser((state) => state));

        const successMock = vi.fn();
        const errorMock = vi.fn();

        await act(async () => {
          const storeFunc = result.current.signOut(successMock, errorMock);

          return storeFunc();
        });

        expect(result.current.user).toBeUndefined();
      });
    });
  });
});
