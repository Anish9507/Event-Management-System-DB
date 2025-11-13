import React from 'react';

export default function EmptyState({ onCreate }) {
  return (
    <div className="text-center p-12 card">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-hero opacity-80"></div>
      <h3 className="text-lg font-semibold mb-2">No events yet</h3>
      <p className="text-gray-600 mb-4">Create your first event to get started.</p>
      <button className="btn-primary" onClick={onCreate}>Create event</button>
    </div>
  );
}
