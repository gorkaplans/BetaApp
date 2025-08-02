import React from 'react';
import { Loader2, Brain } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="mt-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <Brain className="w-8 h-8 text-gray-600" />
        </div>
        
        <div className="flex items-center justify-center gap-3 mb-4">
          <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
          <h2 className="text-lg font-medium text-gray-900">
            Procesando vía...
          </h2>
        </div>
        
        <p className="text-gray-600 text-sm mb-6">
          Nuestro algoritmo está analizando la ruta y generando la mejor beta para tu perfil de escalador.
        </p>
        
        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Analizando presas y agarres</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
            <span>Calculando secuencia óptima</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-400"></div>
            <span>Adaptando a tu estilo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;