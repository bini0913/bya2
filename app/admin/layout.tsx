import { AdminLayoutFrame } from "@/components/admin/admin-layout-frame";

export const metadata = {
  title: "BYA Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutFrame>{children}</AdminLayoutFrame>;
}
