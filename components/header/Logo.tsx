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
        className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
        priority
        quality={90}
        onError={(e) => {
          // Fallback to text logo if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent && !parent.querySelector('.text-logo')) {
            const textLogo = document.createElement('span');
            textLogo.className = 'text-logo text-xl font-bold text-indigo-600 dark:text-indigo-400';
            textLogo.textContent = 'CDKeyDeals';
            parent.appendChild(textLogo);
          }
        }}
      />
    </Link>
  );
}
