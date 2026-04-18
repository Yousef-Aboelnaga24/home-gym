import { Package, Tags, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function AdminDashboard() {
  const { user } = useAuth();
  
  const stats = [
    { label: 'Total Revenue', value: '$24,500', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Products', value: '124', icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Orders', value: '45', icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Users', value: '89', icon: Users, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, {user?.name}</h1>
        <p className="text-zinc-400">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <div>
              <p className="text-zinc-400 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholders for upcoming sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-80 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-4">Recent Orders</h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-lg">
             <span className="text-zinc-500">Analytics Chart/Table Placeholder</span>
          </div>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-80 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-4">Top Products</h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-lg">
             <span className="text-zinc-500">Analytics Chart/Table Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
}
