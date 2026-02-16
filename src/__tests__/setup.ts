import "@testing-library/jest-dom";
import React from "react";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => {
  const createMotionComponent = (tag: string) => {
    return React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) => {
      // Filter out framer-motion specific props
      const {
        initial,
        animate,
        exit,
        transition,
        variants,
        whileHover,
        whileInView,
        whileTap,
        viewport,
        layoutId,
        layout,
        ...rest
      } = props;
      return React.createElement(tag, { ...rest, ref });
    });
  };

  return {
    motion: {
      div: createMotionComponent("div"),
      form: createMotionComponent("form"),
      h1: createMotionComponent("h1"),
      h2: createMotionComponent("h2"),
      h3: createMotionComponent("h3"),
      p: createMotionComponent("p"),
      span: createMotionComponent("span"),
      section: createMotionComponent("section"),
      a: createMotionComponent("a"),
      button: createMotionComponent("button"),
      li: createMotionComponent("li"),
      ul: createMotionComponent("ul"),
      img: createMotionComponent("img"),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    useAnimation: () => ({ start: vi.fn() }),
    useInView: () => true,
    useMotionValue: (initial: number) => ({ get: () => initial, set: vi.fn() }),
    useTransform: () => ({ get: () => 0, set: vi.fn() }),
  };
});

// Mock IntersectionObserver (used by useScrollSpy)
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor() {}
}
Object.defineProperty(global, "IntersectionObserver", {
  value: MockIntersectionObserver,
  writable: true,
});

// Mock window.scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));

// Mock next/link to render a simple anchor
vi.mock("next/link", () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
    return React.createElement("a", { href, ...rest }, children);
  },
}));

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
