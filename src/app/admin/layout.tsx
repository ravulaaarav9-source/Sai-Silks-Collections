import Link from "next/link";
import { LayoutDashboard, Package, LogOut } from "lucide-react";
import { cookies } from "next/headers";
import AdminLogin from "@/components/AdminLogin";
import { logout } from "@/app/actions/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has('admin_session');

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pt-[88px]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col">
        <div>
          <div className="p-6">
            <h2 className="text-2xl font-serif font-bold text-primary tracking-tight">
              Sai Silks <span className="text-secondary">Admin</span>
            </h2>
          </div>
          <nav className="px-4 space-y-2 mt-4">
            <Link 
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-primary transition-colors"
            >
              <LayoutDashboard size={20} />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link 
              href="/admin/inventory"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-primary transition-colors"
            >
              <Package size={20} />
              <span className="font-medium">Product Inventory</span>
            </Link>
          </nav>
        </div>

        <div className="p-4 mt-auto">
          <form action={logout}>
            <button type="submit" className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium border border-red-100">
              <LogOut size={18} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
