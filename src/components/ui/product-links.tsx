"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { YummaCSSMark, YummaUIMark } from "@/components/icons/yummacss-mark";

const PRODUCTS = [
  {
    title: "Yumma CSS",
    href: "/docs/installation",
    prefix: "/docs",
    Mark: YummaCSSMark,
  },
  {
    title: "Yumma UI",
    href: "/ui/components/installation",
    prefix: "/ui",
    Mark: YummaUIMark,
  },
];

/** The two products with their marks, the one the route is in marked active. */
export default function ProductLinks({
  link,
  onNavigate,
}: {
  /** Classes for each link, apart from the active state. */
  link: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul className="d:f fd:c g:1">
      {PRODUCTS.map(({ title, href, prefix, Mark }) => {
        const isActive = pathname.startsWith(prefix);
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={`${link} ${isActive ? "c:accent td:u tds:d" : "c:ink/70 h:c:accent"}`}
            >
              <Mark className="fs:0 w:6 h:6" />
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
