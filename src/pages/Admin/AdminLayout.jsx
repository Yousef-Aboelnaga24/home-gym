import { Outlet, NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Package, Tags, ShoppingBag, Users, Settings, LogOut, Dumbbell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Helmet } from 'react-helmet';

export function AdminLayout() {
  const { logout } = useAuth();

  const navItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
    { to: "/admin/products", icon: Package, label: "Products" },
    { to: "/admin/categories", icon: Tags, label: "Categories" },
    { to: "/admin/orders", icon: ShoppingBag, label: "Orders" },
    { to: "/admin/users", icon: Users, label: "Users" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Panel | Home Gym Store</title>
      </Helmet>
      <div className="flex h-screen bg-black text-white">
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-zinc-900">
            <Link to="/" className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors">
              <Dumbbell className="h-6 w-6" />
              <span className="text-lg font-bold tracking-wider text-white">ADMIN GYM</span>
            </Link>
          </div>

          <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                    ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-zinc-900">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-zinc-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout & Exit</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-zinc-950/50">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
