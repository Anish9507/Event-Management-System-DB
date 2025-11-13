import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero text-white">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-xs uppercase tracking-wider bg-white/15 rounded-full px-3 py-1 mb-4">Modern Event Platform</span>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight drop-shadow">Host remarkable events with a beautiful, lightweight dashboard</h1>
              <p className="mt-4 text-white/90 max-w-xl">Create, manage, and track your events with ease. A polished design, secure authentication, and a delightful experience on any device.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/signup" className="btn-accent">Get started</Link>
                <Link to="/about" className="btn-primary">Learn more</Link>
              </div>
            </div>
            <div className="relative hidden lg:block animate-float">
              <div className="absolute -inset-8 rounded-[28px] opacity-30 blur-2xl" style={{background:'linear-gradient(135deg,#FDE68A,#F59E0B)'}}></div>
              <div className="relative card p-6">
                {/* Animated SVG illustration: calendar with event dots */}
                <svg viewBox="0 0 520 320" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="calg" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#4C1D95" />
                      <stop offset="60%" stopColor="#7C3AED" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                  </defs>
                  <rect x="20" y="20" width="480" height="280" rx="20" fill="#fff" opacity="0.9" />
                  <rect x="20" y="20" width="480" height="70" rx="20" fill="url(#calg)" />
                  {[...Array(5)].map((_,i)=> (
                    <circle key={i} cx={80+ i*80} cy={55} r="8" fill="#fff" opacity="0.9"/>
                  ))}
                  {/* grid */}
                  {Array.from({length:4}).map((_,r)=> (
                    Array.from({length:7}).map((_,c)=> (
                      <rect key={`${r}-${c}`} x={40 + c*66} y={110 + r*48} width="44" height="28" rx="6" fill="#EEF2FF" />
                    ))
                  ))}
                  {/* event pills */}
                  <g className="animate-fade-in">
                    <rect x="110" y="160" width="120" height="14" rx="7" fill="#EDE9FE" />
                    <rect x="260" y="208" width="140" height="14" rx="7" fill="#FEF3C7" />
                    <rect x="180" y="256" width="110" height="14" rx="7" fill="#DCFCE7" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink">Everything you need to run great events</h2>
            <p className="text-gray-600 mt-3">From first draft to final RSVP, manage your events in one place with simplicity and style.</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {title:'Create events fast', desc:'Set details, time, venue, and description in seconds with an elegant form.'},
              {title:'Edit with confidence', desc:'Update any field anytime. Your attendees always see the latest.'},
              {title:'Stay organized', desc:'A clear dashboard helps you keep track of every upcoming event.'},
              {title:'Secure by design', desc:'Hashed passwords and token auth keep your account safe.'},
              {title:'Responsive UI', desc:'Beautiful on phones, tablets, and desktops.'},
              {title:'Deploy-ready', desc:'Optimized build and server wiring for Render hosting.'},
            ].map((f,i)=> (
              <div key={i} className="card p-6 card-hover">
                <div className="h-10 w-10 rounded-xl mb-4" style={{background:'linear-gradient(135deg,#4C1D95,#F59E0B)'}}></div>
                <h3 className="font-semibold text-ink">{f.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {step:'1', title:'Sign up', desc:'Create your account in seconds. No credit card required.'},
              {step:'2', title:'Add your event', desc:'Fill in the essentials—name, time, venue, description.'},
              {step:'3', title:'Manage & iterate', desc:'Edit, track, and keep everything organized in your dashboard.'},
            ].map((s,i)=> (
              <div key={i} className="card p-6 animate-fade-up" style={{animationDelay:`${i*80}ms`}}>
                <div className="h-10 w-10 rounded-xl mb-3 flex items-center justify-center text-white font-semibold" style={{background:'linear-gradient(135deg,#4C1D95,#7C3AED)'}}>{s.step}</div>
                <h4 className="font-semibold text-ink">{s.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h3 className="text-xl font-semibold text-ink mb-6">Frequently asked questions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {q:'Is my data secure?', a:'Passwords are hashed and requests are authenticated using tokens.'},
              {q:'Does it work on mobile?', a:'Yes, the interface is responsive and touch-friendly.'},
              {q:'Can I edit or delete events?', a:'Absolutely. You have full control over your events.'},
              {q:'Is it free to use?', a:'Yes, it is free to use.'},
            ].map((item,i)=> (
              <div key={i} className="card p-6">
                <div className="font-medium text-ink">{item.q}</div>
                <div className="text-sm text-gray-600 mt-2">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-hero text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h3 className="text-2xl font-semibold">Ready to launch your next event?</h3>
          <p className="mt-2 text-white/90">Join now and create your first event in under a minute.</p>
          <div className="mt-6">
            <Link to="/signup" className="btn-accent">Create your account</Link>
          </div>
        </div>
      </section>
    </>
  );
}
