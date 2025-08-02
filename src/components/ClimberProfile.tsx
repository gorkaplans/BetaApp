import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ClimberData } from '../App';

interface ClimberProfileProps {
  initialData: ClimberData;
  onSave: (data: ClimberData) => void;
}

const ClimberProfile: React.FC<ClimberProfileProps> = ({ initialData, onSave }) => {
  const [height, setHeight] = useState(initialData.height);
  const [style, setStyle] = useState(initialData.style);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const styles = [
    { value: 'tecnico', label: 'Técnico' },
    { value: 'potente', label: 'Potente' },
    { value: 'mixto', label: 'Mixto' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (height && style) {
      onSave({ height, style: style as ClimberData['style'] });
    }
  };

  const selectedStyle = styles.find(s => s.value === style);

  return (
    <div className="mt-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Perfil del escalador
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
              Altura (cm)
            </label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              placeholder="Ej: 175"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
              min="140"
              max="220"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
              Estilo de escalada
            </label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-left flex items-center justify-between focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
            >
              <span className={selectedStyle ? 'text-gray-900' : 'text-gray-400'}>
                {selectedStyle ? selectedStyle.label : 'Selecciona tu estilo'}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                {styles.map((styleOption) => (
                  <button
                    key={styleOption.value}
                    type="button"
                    onClick={() => {
                      setStyle(styleOption.value);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl transition-colors"
                  >
                    {styleOption.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!height || !style}
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Guardar perfil
          </button>
        </form>
      </div>
      
      <p className="text-center text-gray-500 text-sm mt-6">
        ¡Prepárate para conquistar nuevas rutas!
      </p>
    </div>
  );
};

export default ClimberProfile;