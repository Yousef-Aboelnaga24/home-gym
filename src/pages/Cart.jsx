import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    clearCart();
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
        <p className="text-zinc-400 mb-8 max-w-md mx-auto">
          Thank you for choosing Home Gym Store. Your gear is being prepared and will ship soon.
        </p>
        <Button asChild size="lg">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingCart className="h-24 w-24 text-zinc-800 mb-6" />
        <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
        <p className="text-zinc-400 mb-8">Looks like you haven't added any gear yet.</p>
        <Button asChild size="lg">
          <Link to="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Your Cart | Home Gym Store</title>
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-10 border-b border-zinc-800 pb-6">
          {isCheckout ? 'Checkout' : 'Your Cart'}
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            {!isCheckout ? (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-6 bg-zinc-900 border border-zinc-800 p-4 rounded-xl items-center">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg bg-zinc-800" />
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white"><Link to={`/product/${item.id}`} className="hover:text-yellow-500">{item.name}</Link></h3>
                      <p className="text-yellow-500 font-bold mt-1">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-zinc-700 rounded-lg overflow-hidden h-10 w-32">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 text-zinc-400 hover:text-white bg-zinc-800 h-full font-bold transition-colors">-</button>
                        <span className="flex-1 text-center font-semibold text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 text-zinc-400 hover:text-white bg-zinc-800 h-full font-bold transition-colors">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-zinc-500 hover:text-red-500 transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6 bg-zinc-900 p-8 rounded-xl border border-zinc-800">
                <h2 className="text-2xl font-bold text-white mb-6">Shipping Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Full Name</label>
                    <input required type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                    <input required type="email" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Shipping Address</label>
                    <textarea required rows="3" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">City</label>
                      <input required type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">ZIP Code</label>
                      <input required type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setIsCheckout(false)}>Back to Cart</Button>
                  <Button type="submit" form="checkout-form" className="flex-1">Place Order</Button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <aside className="w-full lg:w-96 shrink-0">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-zinc-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{cartTotal > 500 ? 'Free' : '$49.99'}</span>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-4 mb-8 flex justify-between items-end">
                <span className="text-white font-medium">Total</span>
                <span className="text-3xl font-bold text-yellow-500">
                  ${(cartTotal + (cartTotal > 500 ? 0 : 49.99)).toFixed(2)}
                </span>
              </div>

              {!isCheckout && (
                <Button className="w-full text-lg h-14 font-bold" onClick={() => setIsCheckout(true)}>
                  Proceed to Checkout
                </Button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
