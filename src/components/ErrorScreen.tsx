import React from 'react';
import { AlertCircle, RotateCcw, ArrowLeft } from 'lucide-react';

interface ErrorScreenProps {
  message: string;
  onRetry: () => void;
  onBack: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, onRetry, onBack }) => {
  return (
    <div className="mt-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          ¡Ups! Algo salió mal
        </h2>
        
        <p className="text-gray-600 text-sm mb-6">
          {message || 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.'}
        </p>
        
        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reintentar
          </button>
          
          <button
            onClick={onBack}
            className="w-full border border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </button>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Consejos para evitar errores:</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Asegúrate de que la imagen sea clara y de buena calidad</li>
          <li>• Verifica que el formato sea JPG, PNG o WEBP</li>
          <li>• La imagen no debe superar los 10MB</li>
          <li>• Selecciona claramente las presas de inicio y final</li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorScreen;