'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileText,
  Users,
  CreditCard,
  AlertCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Car,
  CheckCircle2,
  BarChart3,
  Gavel,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: ['citizen', 'traffic_officer', 'review_officer', 'admin'],
  },
  {
    label: 'My Vehicles',
    href: '/dashboard/vehicles',
    icon: <Car className="w-5 h-5" />,
    roles: ['citizen'],
  },
  {
    label: 'My Violations',
    href: '/dashboard/violations',
    icon: <AlertCircle className="w-5 h-5" />,
    roles: ['citizen'],
  },
  {
    label: 'Payments',
    href: '/dashboard/payments',
    icon: <CreditCard className="w-5 h-5" />,
    roles: ['citizen'],
  },
  {
    label: 'My Disputes',
    href: '/dashboard/disputes',
    icon: <Gavel className="w-5 h-5" />,
    roles: ['citizen'],
  },
  {
    label: 'Issue Ticket',
    href: '/dashboard/issue-ticket',
    icon: <FileText className="w-5 h-5" />,
    roles: ['traffic_officer'],
  },
  {
    label: 'Violations List',
    href: '/dashboard/violations-list',
    icon: <AlertCircle className="w-5 h-5" />,
    roles: ['traffic_officer', 'admin'],
  },
  {
    label: 'Disputes Review',
    href: '/dashboard/disputes',
    icon: <CheckCircle2 className="w-5 h-5" />,
    roles: ['review_officer', 'admin'],
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: <Users className="w-5 h-5" />,
    roles: ['admin'],
  },
  {
    label: 'Reports',
    href: '/dashboard/reports',
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ['admin'],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(
    item => user && item.roles.includes(user.role)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-0'
        } fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 z-40 overflow-hidden flex flex-col`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              🚗
            </div>
            <div className="flex-1">
              <h1 className="font-bold text-lg text-foreground">Traffic Flow</h1>
              <p className="text-xs text-muted-foreground">Management System</p>
            </div>
          </Link>
        </div>

        {/* User Info Section */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role.replace('_', ' ')}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-6 border-t border-border space-y-3">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-foreground hover:bg-muted transition-all"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Settings</span>
          </Link>
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full justify-start gap-3"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        {/* Top Navigation Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            <h2 className="text-lg font-semibold text-foreground hidden sm:block">
              {navItems.find(item => item.href === pathname)?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground hidden sm:block">
              Welcome, <span className="font-semibold text-foreground">{user.name}</span>
            </p>
            <button
              onClick={handleLogout}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all sm:hidden"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
