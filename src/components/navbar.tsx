import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  variant?: "default" | "transparent";
}

export default function Navbar({ variant = "default" }: NavbarProps) {
  const blurEffect =
    variant === "default" ? "bf-b-md bc-white/5" : "bc-transparent";

  return (
    <header className={`p-st t-0 zi-10 bb-1 ${blurEffect}`}>
      <div className="~sm-xxl mx-auto px-6 py-4">
        <nav className="d-f ai-c jc-sb">
          <div className="d-f ai-c g-2">
            <Link href="/">
              <Image
                src="/logo.png"
                width={240}
                height={80}
                alt="Yumma CSS"
                className="h-10 w-auto of-c"
              />
            </Link>
          </div>
          <div className="d-none md:d-f ai-c g-8">
            <Link
              href="/docs/installation"
              className="fs-sm tc-white/80 h:tc-white"
            >
              Docs
            </Link>
            <Link href="/blog" className="fs-sm tc-white/80 h:tc-white">
              Blog
            </Link>
            <Link
              href="https://play.yummacss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="fs-sm tc-white/80 h:tc-white"
            >
              Playground
            </Link>
            <Link
              href="https://github.com/yumma-lib/yumma-css"
              target="_blank"
              rel="noopener noreferrer"
              className="fs-sm tc-white/80 h:tc-white"
            >
              GitHub
            </Link>

            <button
              type="button"
              className="d-f ai-c g-2 px-4 py-2 bg-white/5 bf-b-sm rad-9 fs-sm h:bg-white/10 tc-white b-1 bc-white/10"
            >
              <MagnifyingGlassIcon className="w-4 h-4" />
              Ctrl K
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
