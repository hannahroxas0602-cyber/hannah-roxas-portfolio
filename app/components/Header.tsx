import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/app/data/social";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="block h-10 w-15 shrink-0">
          <Image
            src="/images/logo-mark.webp"
            alt="Hannah Roxas"
            width={77}
            height={50}
            className="h-full w-full object-contain"
            priority
          />
        </Link>

        <nav className="flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="link-underline p-1 text-base text-black transition-colors hover:text-neutral-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
