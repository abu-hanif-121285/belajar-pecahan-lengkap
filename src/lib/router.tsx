import { createContext, useContext, useState, type ReactNode } from "react";

export type Route =
  | { name: "splash" }
  | { name: "home" }
  | { name: "map" }
  | { name: "level"; level: number }
  | { name: "simulator" }
  | { name: "quiz"; level: number }
  | { name: "achievements" }
  | { name: "tips" }
  | { name: "mistakes" }
  | { name: "glossary" }
  | { name: "formulas" }
  | { name: "daily" }
  | { name: "about" }
  | { name: "teacher" };

interface RouterCtx {
  route: Route;
  go: (r: Route) => void;
  back: () => void;
}

const Ctx = createContext<RouterCtx | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<Route[]>([{ name: "splash" }]);
  const route = stack[stack.length - 1];
  const go = (r: Route) => {
    window.scrollTo(0, 0);
    setStack((s) => [...s, r]);
  };
  const back = () => {
    window.scrollTo(0, 0);
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  };
  return <Ctx.Provider value={{ route, go, back }}>{children}</Ctx.Provider>;
}

export function useRouter() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useRouter within RouterProvider");
  return c;
}
