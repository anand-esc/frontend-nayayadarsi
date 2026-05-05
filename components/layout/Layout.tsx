/**
 * Layout — application shell with sidebar navigation and top bar.
 */
import React, { type ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Scale, FileText, ShieldCheck, HardHat, Activity } from 'lucide-react';
import { APP_NAME, NAV_ITEMS } from '@/constants';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const NAV_ICONS: Record<string, React.ReactNode> = {
  '/gov': <FileText className="w-4 h-4" />,
  '/evaluation': <ShieldCheck className="w-4 h-4" />,
  '/builder': <HardHat className="w-4 h-4" />,
  '/audit': <Activity className="w-4 h-4" />,
};

export default function Layout({ children, title }: LayoutProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-1 border-r border-[#E8E8E8] flex flex-col fixed h-full z-20">
        {/* Brand */}
        <Link href="/" className="block px-5 py-5 border-b border-[#E8E8E8] group">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-nyaya-600 flex items-center justify-center">
              <Scale className="w-4 h-4 text-nyaya-100" />
            </div>
            <span className="text-sm font-display font-bold text-nyaya-100 tracking-tight">{APP_NAME}</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="p-3 space-y-0.5" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                  isActive
                    ? 'bg-nyaya-600/10 text-nyaya-600'
                    : 'text-nyaya-400 hover:text-nyaya-100 hover:bg-surface-1'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={`${isActive ? 'text-nyaya-400' : 'text-nyaya-500'}`}>
                  {NAV_ICONS[item.href]}
                </span>
                <div>
                  <div className="text-sm font-medium leading-tight">{item.label}</div>
                  <div className="text-[11px] text-nyaya-500 leading-tight">{item.description}</div>
                </div>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-nyaya-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#E8E8E8] mt-auto">
          <div className="text-[11px] text-nyaya-500 space-y-0.5">
            <p className="font-medium text-nyaya-400">Coding Aghoris</p>
            <p>PAN IIT AI for Bharat</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
