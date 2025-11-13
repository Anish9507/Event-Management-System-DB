import React, { useEffect, useState } from 'react';

export default function EventForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: '', date: '', time: '', venue: '', organizer: '', description: ''
  });

  useEffect(() => { if (initial) setForm(initial); }, [initial]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => { e.preventDefault(); onSubmit(form); };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label-float">Event Name</label>
          <input className="input" name="name" value={form.name} onChange={handle} required />
        </div>
        <div>
          <label className="label-float">Organizer</label>
          <input className="input" name="organizer" value={form.organizer} onChange={handle} required />
        </div>
        <div>
          <label className="label-float">Date</label>
          <input type="date" className="input" name="date" value={form.date} onChange={handle} required />
        </div>
        <div>
          <label className="label-float">Time</label>
          <input type="time" className="input" name="time" value={form.time} onChange={handle} required />
        </div>
        <div className="sm:col-span-2">
          <label className="label-float">Venue</label>
          <input className="input" name="venue" value={form.venue} onChange={handle} required />
        </div>
        <div className="sm:col-span-2">
          <label className="label-float">Description</label>
          <textarea className="input" name="description" rows="4" value={form.description} onChange={handle} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="btn-primary" type="submit">Save</button>
        <button className="btn-accent" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
