"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
}

interface CategoryTileProps {
  categories: Category[];
}

// Platform icons as simple SVG components
function SteamIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V20c-3.03-.5-5.38-3.06-5.38-6.14 0-.28.02-.55.06-.82l2.86 1.18c-.02.14-.02.28-.02.43 0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5c-.31 0-.6.06-.87.16l-2.97-1.23c.72-2.12 2.74-3.64 5.14-3.64 2.99 0 5.42 2.43 5.42 5.42 0 2.4-1.57 4.43-3.74 5.14v1.85c3.45-.85 6.02-3.95 6.02-7.65C22 6.48 17.52 2 12 2z" />
    </svg>
  );
}

function XboxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M4.102 21.033C6.211 22.881 8.977 24 12 24c3.026 0 5.789-1.119 7.902-2.967 1.877-1.912-4.316-8.709-7.902-11.417-3.582 2.708-9.779 9.505-7.898 11.417zM12 4.64c2.21-1.904 4.795-3.64 7.105-3.64.586 0 1.159.096 1.648.283C23.146 2.443 24 4.654 24 8.105c0 2.266-.756 4.691-2.013 6.986-2.293-2.285-6.117-5.736-9.987-8.645-3.867 2.909-7.691 6.36-9.984 8.645C.759 12.796 0 10.371 0 8.105 0 4.654.854 2.443 3.248 1.283 3.738 1.096 4.309 1 4.895 1c2.31 0 4.895 1.736 7.105 3.64z" />
    </svg>
  );
}

function PlayStationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M9.5 4.27v15.46c0 .49.32.73.73.73.26 0 .52-.12.74-.24l.53-.27V4.27c0-.49-.32-.73-.73-.73-.26 0-.52.12-.74.24l-.53.27v.22zm6.97 8.47c-.35-.13-.76-.2-1.24-.2-.97 0-1.68.35-2.13 1.07-.45.71-.67 1.71-.67 2.98v.42c0 1.27.22 2.27.67 2.98.45.72 1.16 1.07 2.13 1.07.48 0 .89-.07 1.24-.2v-2.7c-.32.15-.58.22-.79.22-.35 0-.61-.14-.78-.43-.17-.28-.26-.7-.26-1.26v-.42c0-.56.09-.98.26-1.26.17-.29.43-.43.78-.43.21 0 .47.07.79.22v-2.7z" />
    </svg>
  );
}

function NintendoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M5 3C3.346 3 2 4.346 2 6v12c0 1.654 1.346 3 3 3h5V3H5zm1.5 10a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM14 3v18h5c1.654 0 3-1.346 3-3V6c0-1.654-1.346-3-3-3h-5zm3.5 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
    </svg>
  );
}

function GiftCardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
    </svg>
  );
}

function EpicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M3.537 0C2.165 0 1.66.506 1.66 1.879V18.44a4.262 4.262 0 00.136 1.07c.257.97.825 1.545 1.94 1.737.318.064.603.089.859.089l14.456-.001c1.22-.002 2.037-.822 2.037-2.036v-3.653h-1.986v3.556c0 .121-.051.18-.178.18l-14.144.001c-.118 0-.118-.091-.118-.176V2.046c0-.183.061-.183.168-.183h14.144c.088 0 .139.022.139.166v3.603h1.986V1.897C21.099.506 20.593 0 19.222 0H3.537zm3.293 9.532v4.939h5.484v-1.319H8.616v-.865h3.698v-1.316H8.616v-.879h3.698V8.773H6.83v.759zm6.562 0l1.898 4.939h1.98l2.048-4.939H17.32l-1.188 3.247-1.201-3.247h-1.54z" />
    </svg>
  );
}

function UplayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6c4.64 0 8.4 3.76 8.4 8.4 0 4.64-3.76 8.4-8.4 8.4-4.64 0-8.4-3.76-8.4-8.4 0-4.64 3.76-8.4 8.4-8.4zm0 2.4a6 6 0 100 12 6 6 0 000-12zm0 2.4a3.6 3.6 0 110 7.2 3.6 3.6 0 010-7.2z" />
    </svg>
  );
}

const iconMap: Record<string, React.ComponentType> = {
  steam: SteamIcon,
  xbox: XboxIcon,
  playstation: PlayStationIcon,
  nintendo: NintendoIcon,
  "gift-card": GiftCardIcon,
  epic: EpicIcon,
  uplay: UplayIcon,
};

export default function CategoryTile({ categories }: CategoryTileProps) {
  return (
    <section className="py-12 bg-background">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Shop by Category</h2>
          <Link
            href="/categories"
            className="flex items-center gap-1 text-[#00d4aa] hover:text-[#00b894] font-medium text-sm transition-colors"
          >
            Shop All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon
              ? iconMap[category.icon] || GiftCardIcon
              : GiftCardIcon;

            return (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className="group"
              >
                <div className="bg-muted/50 dark:bg-muted rounded-xl p-4 lg:p-6 border border-border hover:border-[#00d4aa]/50 hover:shadow-md transition-all text-center">
                  <div className="w-16 h-16 mx-auto bg-card dark:bg-muted rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-[#00d4aa] transition-colors mb-3 shadow-sm">
                    <IconComponent />
                  </div>
                  <h3 className="text-sm font-medium text-foreground group-hover:text-[#00d4aa] transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
