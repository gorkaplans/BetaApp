import React from 'react';
import { Mountain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="bg-gray-50 pt-8 pb-4">
      <div className="container mx-auto px-4 max-w-md text-center">
        <div className="w-16 h-16 bg-gray-900 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <Mountain className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Beta</h1>
        <p className="text-gray-600 text-sm">Tu compañero de escalada</p>
      </div>
    </div>
  );
};

export default Header;