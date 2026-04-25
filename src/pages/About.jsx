import { Helmet } from 'react-helmet';
import { Dumbbell, Shield, Truck, Users } from 'lucide-react';

export function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Home Gym Store</title>
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Built for the <span className="text-yellow-500">Determined</span></h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            At Home Gym Store, we believe that fitness should be accessible to everyone, everywhere. 
            We provide premium, commercial-grade equipment designed specifically for your home environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { icon: Dumbbell, title: 'Quality Gear', desc: 'Commercial-grade equipment tested for durability.' },
            { icon: Shield, title: 'Warranty', desc: 'Industry-leading warranty on all our products.' },
            { icon: Truck, title: 'Free Shipping', desc: 'Free delivery on all orders over $500.' },
            { icon: Users, title: 'Community', desc: 'Join thousands of home gym enthusiasts.' },
          ].map((item, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl text-center">
              <div className="inline-flex p-3 rounded-xl bg-yellow-500/10 mb-6">
                <item.icon className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                We started Home Gym Store because we were tired of overcrowded gyms and low-quality home equipment. 
                Our mission is to empower you to reach your fitness goals by providing the tools you need to succeed in your own space.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Whether you're building a complete garage gym or just need a pair of dumbbells, we're here to help you every step of the way.
              </p>
            </div>
            <div className="bg-zinc-800 min-h-[400px] flex items-center justify-center p-8">
               <Dumbbell className="h-48 w-48 text-zinc-700 opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
