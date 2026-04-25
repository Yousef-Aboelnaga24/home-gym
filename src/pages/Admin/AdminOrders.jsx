import { useState, useEffect } from 'react';
import { Badge } from '../../components/ui/Badge';
import { getOrders, updateOrderStatus } from '../../services/OrderService';
import { Loader2, RefreshCw } from 'lucide-react';

export function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update status.');
    }
  };

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'secondary';
      case 'shipped': return 'outline';
      case 'pending': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">Orders</h1>
          <p className="text-zinc-400">Manage customer purchases and delivery status.</p>
        </div>
        <button 
          onClick={fetchOrders}
          className="p-2 text-zinc-400 hover:text-yellow-500 transition-colors"
          title="Refresh"
        >
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 text-yellow-500 animate-spin" />
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 overflow-hidden">
          {orders.length === 0 ? (
            <div className="p-12 text-center text-zinc-500">No orders found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Order ID</th>
                    <th className="px-6 py-4 font-semibold">Customer</th>
                    <th className="px-6 py-4 font-semibold">Total</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">#{order.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white">{order.customer_name}</p>
                          <p className="text-xs text-zinc-500">{order.customer_email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-yellow-500">${parseFloat(order.total_amount).toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <Badge variant={getStatusVariant(order.status)}>{order.status.toUpperCase()}</Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <select 
                          className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs focus:border-yellow-500 outline-none"
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
