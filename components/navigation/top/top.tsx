import React from 'react';
import Auth from '../auth/auth';

const Top = (): JSX.Element => (
  <nav
    style={{ maxWidth: '1152px' }}
    className="w-full flex justify-between items-center px-4 py-2 border-b border-gray-100 text-sm text-gray-500"
  >
    <div>Search</div>
    <div>
      <Auth />
    </div>
  </nav>
);

export default Top;
