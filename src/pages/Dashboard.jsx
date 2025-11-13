import React, { useEffect, useState } from 'react';
import api from '../api';
import EmptyState from '../components/EmptyState';
import EventForm from '../components/EventForm';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    const { data } = await api.get('/api/events');
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, []);

  const onCreate = () => { setEditing(null); setShowForm(true); };
  const onEdit = (ev) => { setEditing(ev); setShowForm(true); };

  const saveEvent = async (payload) => {
    if (editing) {
      await api.put(`/api/events/${editing.id}`, payload);
    } else {
      await api.post('/api/events', payload);
    }
    setShowForm(false);
    setEditing(null);
    await fetchEvents();
  };

  const deleteEvent = async (id) => {
    await api.delete(`/api/events/${id}`);
    await fetchEvents();
  };

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-12">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Events</h2>
        <button className="btn-primary" onClick={onCreate}>Add New Event</button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6">
          <EventForm initial={editing} onSubmit={saveEvent} onCancel={() => { setShowForm(false); setEditing(null); }} />
        </div>
      )}

      {events.length === 0 ? (
        <EmptyState onCreate={onCreate} />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev) => (
            <div key={ev.id} className="card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{ev.name}</h3>
                  <p className="text-sm text-gray-600">{ev.date} • {ev.time}</p>
                </div>
                <div className="text-xs px-2 py-1 rounded-full text-gray-900" style={{background:'linear-gradient(135deg,#FDE68A,#F59E0B)'}}>Upcoming</div>
              </div>
              <p className="mt-3 text-gray-700">{ev.description}</p>
              <div className="mt-4 text-sm text-gray-600">
                <p><span className="font-medium">Venue:</span> {ev.venue}</p>
                <p><span className="font-medium">Organizer:</span> {ev.organizer}</p>
              </div>
              <div className="mt-5 flex gap-2">
                <button className="btn-accent" onClick={() => onEdit(ev)}>Edit</button>
                <button className="btn-primary" onClick={() => deleteEvent(ev.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
