import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';

function parseDateTime(dateStr, timeStr) {
  try {
    return new Date(`${dateStr}T${timeStr || '00:00'}`);
  } catch {
    return new Date();
  }
}

export default function Profile() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/api/events');
        setEvents(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const { upcoming, past } = useMemo(() => {
    const now = new Date();
    const upcoming = [];
    const past = [];
    for (const e of events) {
      const dt = parseDateTime(e.date, e.time);
      (dt >= now ? upcoming : past).push(e);
    }
    // newest first for past
    past.sort((a,b) => parseDateTime(b.date,b.time) - parseDateTime(a.date,a.time));
    // soonest first for upcoming
    upcoming.sort((a,b) => parseDateTime(a.date,a.time) - parseDateTime(b.date,b.time));
    return { upcoming, past };
  }, [events]);

  if (!user) return null;
  if (loading) return <div className="max-w-6xl mx-auto px-4 py-12">Loading profile…</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="card p-6 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl flex items-center justify-center text-white text-xl font-semibold" style={{background:'linear-gradient(135deg,#4C1D95,#F59E0B)'}}>
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-lg bg-white/70">
              <div className="text-2xl font-semibold">{events.length}</div>
              <div className="text-xs text-gray-600">Total events</div>
            </div>
            <div className="p-3 rounded-lg bg-white/70">
              <div className="text-2xl font-semibold">{upcoming.length}</div>
              <div className="text-xs text-gray-600">Upcoming</div>
            </div>
            <div className="p-3 rounded-lg bg-white/70">
              <div className="text-2xl font-semibold">{past.length}</div>
              <div className="text-xs text-gray-600">Past</div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <section className="card p-6 animate-fade-up">
            <h3 className="text-lg font-semibold mb-4">Upcoming events</h3>
            {upcoming.length === 0 ? (
              <p className="text-sm text-gray-600">No upcoming events.</p>
            ) : (
              <ul className="space-y-3">
                {upcoming.map((e)=> (
                  <li key={e.id} className="p-4 rounded-xl bg-white/70 border border-gray-100 hover:shadow-soft transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{e.name}</div>
                        <div className="text-xs text-gray-600">{e.date} • {e.time} • {e.venue}</div>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full text-gray-900" style={{background:'linear-gradient(135deg,#FDE68A,#F59E0B)'}}>Upcoming</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="card p-6 animate-fade-up delay-100">
            <h3 className="text-lg font-semibold mb-4">Past events</h3>
            {past.length === 0 ? (
              <p className="text-sm text-gray-600">No past events yet.</p>
            ) : (
              <ul className="space-y-3">
                {past.map((e)=> (
                  <li key={e.id} className="p-4 rounded-xl bg-white/70 border border-gray-100 hover:shadow-soft transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{e.name}</div>
                        <div className="text-xs text-gray-600">{e.date} • {e.time} • {e.venue}</div>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full text-white" style={{background:'linear-gradient(135deg,#4C1D95,#7C3AED)'}}>Completed</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
