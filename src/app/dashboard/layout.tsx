import Sidebar from '@/components/Sidebar';
import { ReactNode } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="hidden md:block flex-none w-64">
        <Sidebar />
      </aside>
      <main className="flex-1 flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </div>
      </main>
    </div>
  );
}
