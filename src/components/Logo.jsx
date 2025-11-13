import React from 'react';

export default function Logo({ size = 32, withText = true }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl shadow-sm"
      >
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4C1D95" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="64" height="64" rx="14" fill="url(#g1)" />
        <g fill="#fff">
          <circle cx="20" cy="22" r="6" opacity="0.95" />
          <rect x="14" y="34" width="36" height="8" rx="4" opacity="0.95" />
          <rect x="26" y="46" width="24" height="6" rx="3" opacity="0.9" />
        </g>
      </svg>
      {withText && <span className="font-semibold text-gray-900">Evently</span>}
    </div>
  );
}
