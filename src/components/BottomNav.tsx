'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, ScanBarcode, FileText, User, LogOut } from 'lucide-react';
import { useLogout } from '@/services/auth';

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { mutateAsync: logoutMutation } = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation();
      router.push('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 w-full h-16 bg-white/80 dark:bg-card/80 backdrop-blur-xl border-b border-slate-100 dark:border-white/10 z-50 items-center justify-between px-8 shadow-sm transition-all">
        <Link href="/dashboard" className="font-bold text-xl text-primary flex items-center gap-2">
          <span className="bg-primary text-primary-foreground p-2 rounded-xl shadow-md shadow-primary/20"><ScanBarcode className="w-5 h-5" /></span>
          NutriSmart
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center bg-slate-100/50 dark:bg-background/50 p-1.5 rounded-full border border-slate-200/50 dark:border-border/50">
            <Link
              href="/dashboard"
              className={`px-4 py-2 rounded-full font-medium transition-colors ${pathname === '/dashboard' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
            >
              Home
            </Link>
            <Link
              href="/scan"
              className={`px-4 py-2 rounded-full font-medium transition-colors ${pathname === '/scan' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
            >
              Scan
            </Link>
            <Link
              href="/report"
              className={`px-4 py-2 rounded-full font-medium transition-colors ${pathname === '/report' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
            >
              Report
            </Link>
            <Link
              href="/profile"
              className={`px-4 py-2 rounded-full font-medium transition-colors ${pathname === '/profile' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
            >
              Profile
            </Link>
          </div>
          
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-red-950/30 rounded-full transition-colors ml-2"
            title="Log out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-4 left-0 right-0 px-4 pb-safe z-50 flex justify-center">
        <div className="glass-panel bg-white/90 dark:bg-card/90 backdrop-blur-md border border-slate-100 dark:border-border rounded-full p-2 flex items-center gap-2 shadow-xl shadow-slate-200/50 dark:shadow-black/50">
          <Link
            href="/dashboard"
            className={`px-4 py-3 rounded-full flex items-center gap-2 transition-all ${pathname === '/dashboard'
              ? 'bg-primary/10 font-semibold text-primary shadow-sm'
              : 'font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
          >
            <Home className="w-5 h-5" />
          </Link>
          <Link
            href="/scan"
            className="px-6 py-3 rounded-full bg-primary font-bold text-primary-foreground shadow-md shadow-primary/20 flex items-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <ScanBarcode className="w-5 h-5" />
            <span>Scan</span>
          </Link>
          <Link
            href="/report"
            className={`px-4 py-3 rounded-full flex items-center gap-2 transition-all ${pathname === '/report'
              ? 'bg-primary/10 font-semibold text-primary shadow-sm'
              : 'font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
          >
            <FileText className="w-5 h-5" />
          </Link>
          <Link
            href="/profile"
            className={`px-4 py-3 rounded-full flex items-center gap-2 transition-all ${pathname === '/profile'
              ? 'bg-primary/10 font-semibold text-primary shadow-sm'
              : 'font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
          >
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </>
  );
}
