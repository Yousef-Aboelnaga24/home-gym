import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ShoppingBag, Package, ChevronRight, Loader2 } from 'lucide-react';
import { getOrders } from '../services/orderService';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 text-yellow-500 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Orders | Home Gym Store</title>
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <ShoppingBag className="h-8 w-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-white">Order History</h1>
          </div>

          {orders.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
              <Package className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">No orders yet</h2>
              <p className="text-zinc-400 mb-8">You haven't placed any orders yet. Start shopping to build your home gym!</p>
              <Button asChild>
                <Link to="/shop">Go to Shop</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors">
                  <div className="p-6 flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm text-zinc-400">Order #{order.id}</span>
                        <Badge variant={order.status === 'delivered' ? 'secondary' : 'outline'}>
                          {order.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-zinc-500 text-sm mb-1">Date: {new Date(order.created_at).toLocaleDateString()}</p>
                      <p className="text-white font-medium">Items: {order.items?.length || 0}</p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <p className="text-2xl font-bold text-yellow-500">${parseFloat(order.total_amount).toFixed(2)}</p>
                      <button className="flex items-center text-zinc-400 hover:text-white transition-colors text-sm font-medium">
                        View Details <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
