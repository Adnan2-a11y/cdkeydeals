import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0 group">
      <Image
        src="/images/CDkeyDeals.com.png"
        alt="CDKeyDeals Logo"
        width={90}
        height={30}
        className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
        priority
        quality={90}
      />
    </Link>
  );
}
