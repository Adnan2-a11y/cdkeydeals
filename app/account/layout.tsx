"use client";

import { usePathname } from 'next/navigation';
import AccountSidebar from '@/components/account/AccountSidebar';
import ProtectedRoute from '@/components/account/ProtectedRoute';

// Pages that require authentication
const protectedPages = ['/account', '/account/orders', '/account/profile'];

// Pages that should not show sidebar
const authPages = ['/account/login', '/account/register'];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage = authPages.includes(pathname);
  const isProtectedPage = protectedPages.includes(pathname);

  // Auth pages (login/register) - no sidebar, no protection
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Protected pages - with sidebar and protection
  if (isProtectedPage) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex gap-8">
              <AccountSidebar />
              <main className="flex-1 min-w-0">{children}</main>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // Other account pages (if any) - with sidebar, no protection
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
