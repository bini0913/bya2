"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { createClient } from "@/supabase/client";
import { cn } from "@/lib/utils";
import { isSupabaseConfigured } from "@/supabase/client";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    router.push("/admin-login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen bg-[#F8F7F4]">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-[#0B1F3A]/10 bg-[#0B1F3A] text-white lg:flex">
        <div className="border-b border-white/10 px-6 py-6">
          <p className="font-display text-lg font-semibold text-gold-500">BYA</p>
          <p className="text-xs text-white/50">Admissions Admin</p>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {NAV.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-gold-500/15 text-gold-500"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b border-[#0B1F3A]/10 bg-white px-6 py-4 lg:hidden">
          <p className="font-display text-lg font-semibold text-[#0B1F3A]">BYA Admin</p>
        </header>
        <main className="flex-1 p-6 md:p-8">
          {title && (
            <h1 className="mb-8 font-display text-2xl font-semibold text-[#0B1F3A]">{title}</h1>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
