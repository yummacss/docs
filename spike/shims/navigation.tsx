"use client";
import { notFound as routerNotFound, useLocation, useNavigate } from "@tanstack/react-router";

export const usePathname = () => useLocation({ select: (l) => l.pathname });

export function useRouter() {
  const navigate = useNavigate();
  return {
    push: (href: string) => navigate({ href }),
    replace: (href: string) => navigate({ href, replace: true }),
    back: () => history.back(),
    prefetch: () => {},
  };
}

export function notFound(): never {
  throw routerNotFound();
}
