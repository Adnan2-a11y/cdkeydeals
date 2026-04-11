import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0 group">
      <Image
        src="/images/CDkeyDeals.com.png"
        alt="CDKeyDeals Logo"
        width={120}
        height={40}
        className="h-10 w-auto object-contain"
        priority
      />
    </Link>
  );
}
