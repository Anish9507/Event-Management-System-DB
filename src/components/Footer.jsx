import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white/60">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Evently. All rights reserved.</p>
        <p>Contact: hello@evently.app</p>
      </div>
    </footer>
  );
}
