import { renderHook, act } from "@testing-library/react";
import * as zustand from "zustand";
import { myCustomCreate, storeResetFns } from "../__mocks__/zustand";
import { useToast } from "./useToast";
import { Check, Info, Warning, XCircle } from "@phosphor-icons/react";
vi.mock("zustand", async () => {
  const zustand = (await vi.importActual("zustand")) as object;

  return {
    __esModule: true,
    ...zustand,
  };
});

vi.spyOn(zustand, "create").mockImplementation(myCustomCreate as never);

describe("useToast", () => {
  afterEach(() => {
    act(() => {
      storeResetFns.forEach((resetFn) => {
        resetFn();
      });
    });
  });

  describe("when initialize", () => {
    it("toastContent.content is empty", () => {
      const { result } = renderHook(() => useToast((state) => state));

      expect(result.current.toastContent.content).toBe("");
    });

    it("toastContent.icon is warning", () => {
      const { result } = renderHook(() => useToast((state) => state));

      expect(result.current.toastContent.icon).toBe(Warning);
    });

    it("toastContent.variant is warning", () => {
      const { result } = renderHook(() => useToast((state) => state));

      expect(result.current.toastContent.variant).toBe("warning");
    });
  });

  describe("when calls the info function", () => {
    it("renders the info toast", () => {
      const { result } = renderHook(() => useToast((state) => state));

      act(() => {
        result.current.info("mock message");
      });

      expect(result.current.toastContent.content).toBe("mock message");
      expect(result.current.toastContent.variant).toBe("info");
      expect(result.current.toastContent.icon).toBe(Info);
    });

    it("hiddes the toast after 3500ms", () => {
      const { result } = renderHook(() => useToast((state) => state));

      act(() => {
        result.current.info("mock message");
      });

      expect(result.current.toastContent.content).toBe("mock message");
      expect(result.current.toastContent.variant).toBe("info");
      expect(result.current.toastContent.icon).toBe(Info);

      setTimeout(
        () =>
          expect(result.current.toastContent.content).not.toBe("mock message"),
        3500,
      );
    });
  });

  describe("when calls the warning function", () => {
    it("renders the warning toast", () => {
      const { result } = renderHook(() => useToast((state) => state));

      act(() => {
        result.current.warning("mock message");
      });

      expect(result.current.toastContent.content).toBe("mock message");
      expect(result.current.toastContent.variant).toBe("warning");
      expect(result.current.toastContent.icon).toBe(Warning);
    });

    it("hiddes the toast after 3500ms", () => {
      const { result } = renderHook(() => useToast((state) => state));

      act(() => {
        result.current.warning("mock message");
      });

      expect(result.current.toastContent.content).toBe("mock message");
      expect(result.current.toastContent.variant).toBe("warning");
      expect(result.current.toastContent.icon).toBe(Warning);

      setTimeout(
        () =>
          expect(result.current.toastContent.content).not.toBe("mock message"),
        3500,
      );
    });
  });

  describe("when calls the success function", () => {
    it("renders the success toast", () => {
      const { result } = renderHook(() => useToast((state) => state));

      act(() => {
        result.current.success("mock message");
      });

      expect(result.current.toastContent.content).toBe("mock message");
      expect(result.current.toastContent.variant).toBe("success");
      expect(result.current.toastContent.icon).toBe(Check);
    });

    it("hiddes the toast after 3500ms", () => {
      const { result } = renderHook(() => useToast((state) => state));

      act(() => {
        result.current.success("mock message");
      });

      expect(result.current.toastContent.content).toBe("mock message");
      expect(result.current.toastContent.variant).toBe("success");
      expect(result.current.toastContent.icon).toBe(Check);

      setTimeout(
        () =>
          expect(result.current.toastContent.content).not.toBe("mock message"),
        3500,
      );
    });
  });

  describe("when calls the error function", () => {
    it("renders the error toast", () => {
      const { result } = renderHook(() => useToast((state) => state));

      act(() => {
        result.current.error("mock message");
      });

      expect(result.current.toastContent.content).toBe("mock message");
      expect(result.current.toastContent.variant).toBe("error");
      expect(result.current.toastContent.icon).toBe(XCircle);
    });

    it("hiddes the toast after 3500ms", () => {
      const { result } = renderHook(() => useToast((state) => state));

      act(() => {
        result.current.error("mock message");
      });

      expect(result.current.toastContent.content).toBe("mock message");
      expect(result.current.toastContent.variant).toBe("error");
      expect(result.current.toastContent.icon).toBe(XCircle);

      setTimeout(
        () =>
          expect(result.current.toastContent.content).not.toBe("mock message"),
        3500,
      );
    });
  });
});
