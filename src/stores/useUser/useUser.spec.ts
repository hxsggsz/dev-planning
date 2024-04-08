import { renderHook, act, cleanup } from "@testing-library/react";
import * as zustand from "zustand";
import { myCustomCreate, storeResetFns } from "../__mocks__/zustand";
import { useUser } from "./useUser";
import { api } from "@/lib/api";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(api);

beforeAll(() => {
  mock.reset();
});

afterEach(cleanup);

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
    it("user should be `null`", () => {
      const { result } = renderHook(() => useUser((state) => state));

      expect(result.current.user).toBeNull();
    });
  });

  describe("when call the signUp", () => {
    describe("and has no error", () => {
      it("user keep null", async () => {
        mock.onPost("api/auth/signup").reply(200);
        const { result } = renderHook(() => useUser((state) => state));

        await act(async () => {
          result.current.signUp({
            username: "test",
            email: "email@gmail.com",
            password: "myPassword",
          });
        });

        expect(result.current.user).toBeNull();
      });
    });

    describe("and has errors", () => {
      it("user keep null", async () => {
        mock.onPost("api/auth/signup").reply(500);
        const { result } = renderHook(() => useUser((state) => state));

        await act(async () => {
          result.current.signUp({
            username: "test",
            email: "email@gmail.com",
            password: "myPassword",
          });
        });

        expect(result.current.user).toBeNull();
      });
    });
  });
});
