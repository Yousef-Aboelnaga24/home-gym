import { Package, Tags, ShoppingBag, Users, TrendingUp, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { getAdminStats } from '../../services/UserService';

export function AdminDashboard() {
  const { user } = useAuth();
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStatsData(data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    {
      label: 'Total Revenue',
      value: `$${Number(statsData?.revenue?.total || 0).toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      label: 'Products',
      value: statsData?.total_products || 0,
      icon: Package,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      label: 'Orders',
      value: statsData?.total_orders || 0,
      icon: ShoppingBag,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      label: 'Users',
      value: statsData?.total_users || 0,
      icon: Users,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, {user?.name}</h1>
        <p className="text-zinc-400">Here's what's happening with your store today.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 text-yellow-500 animate-spin" />
        </div>
      ) : (
        <>
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
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-zinc-500 border-b border-zinc-800">
                      <th className="pb-3 font-medium">Order</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-300">
                    {statsData?.recent_orders?.map(order => (
                      <tr key={order.id} className="border-b border-zinc-800/50">
                        <td className="py-3 font-medium">#{order.id}</td>
                        <td className="py-3">{order.customer_name}</td>
                        <td className="py-3 text-right">${parseFloat(order.total_amount).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-80 flex flex-col">
              <h3 className="text-lg font-bold text-white mb-4">Top Products</h3>
              <div className="flex-1 overflow-auto">
                <div className="space-y-4">
                  {statsData?.top_products?.map(product => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={product.image} className="w-8 h-8 rounded bg-zinc-800 object-cover" />
                        <span className="text-zinc-300 font-medium truncate w-32">{product.name}</span>
                      </div>
                      <span className="text-yellow-500 font-bold">${parseFloat(product.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
