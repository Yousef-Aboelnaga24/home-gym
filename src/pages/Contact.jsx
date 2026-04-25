import { Helmet } from 'react-helmet';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Home Gym Store</title>
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-zinc-400">Have questions? We're here to help you build your perfect gym.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-yellow-500/10">
                    <Mail className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Email Us</h3>
                    <p className="text-zinc-400 text-sm">support@homegym.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-blue-500/10">
                    <Phone className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Call Us</h3>
                    <p className="text-zinc-400 text-sm">+20 123 456 7890</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-green-500/10">
                    <MapPin className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Visit Us</h3>
                    <p className="text-zinc-400 text-sm">Cairo, Egypt</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500 p-8 rounded-2xl text-black">
                <h3 className="text-xl font-bold mb-2">Customer Service</h3>
                <p className="text-sm font-medium mb-4">Mon-Fri: 9am - 6pm</p>
                <p className="text-sm">We typically respond to emails within 24 hours.</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Name</label>
                    <input required type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                    <input required type="email" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Subject</label>
                  <input required type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
                  <textarea required rows="5" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"></textarea>
                </div>
                <Button type="submit" className="w-full h-14 text-lg">
                  <Send className="mr-2 h-5 w-5" /> Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
