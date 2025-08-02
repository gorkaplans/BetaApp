import React, { useState } from 'react';
import { ArrowLeft, Play } from 'lucide-react';

interface HoldSelectionProps {
  imageUrl: string;
  onHoldSelection: (startHold: number, topHold: number) => void;
  onBack: () => void;
}

const HoldSelection: React.FC<HoldSelectionProps> = ({ imageUrl, onHoldSelection, onBack }) => {
  const [startHold, setStartHold] = useState<number | null>(null);
  const [topHold, setTopHold] = useState<number | null>(null);

  // Mock holds positions - in a real app, these would come from image analysis
  const holds = [
    { id: 1, x: 25, y: 85 },
    { id: 2, x: 35, y: 75 },
    { id: 3, x: 15, y: 65 },
    { id: 4, x: 45, y: 60 },
    { id: 5, x: 55, y: 50 },
    { id: 6, x: 25, y: 45 },
    { id: 7, x: 40, y: 35 },
    { id: 8, x: 30, y: 25 },
    { id: 9, x: 50, y: 20 },
    { id: 10, x: 35, y: 10 }
  ];

  const handleHoldClick = (holdId: number) => {
    if (startHold === null) {
      setStartHold(holdId);
    } else if (topHold === null && holdId !== startHold) {
      setTopHold(holdId);
    } else {
      // Reset selection
      setStartHold(holdId);
      setTopHold(null);
    }
  };

  const getHoldColor = (holdId: number) => {
    if (holdId === startHold) return 'bg-green-500';
    if (holdId === topHold) return 'bg-red-500';
    return 'bg-blue-500';
  };

  const getHoldLabel = (holdId: number) => {
    if (holdId === startHold) return 'Start';
    if (holdId === topHold) return 'Top';
    return 'Presa';
  };

  const handleGenerate = () => {
    if (startHold !== null && topHold !== null) {
      onHoldSelection(startHold, topHold);
    }
  };

  return (
    <div className="mt-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Selecciona el inicio y el top
        </h2>

        {/* Legend */}
        <div className="flex justify-center items-center gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Start</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Top</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Presa</span>
          </div>
        </div>

        {/* Route image with holds */}
        <div className="relative mb-6 rounded-xl overflow-hidden">
          <img
            src={imageUrl}
            alt="Vía de escalada"
            className="w-full h-80 object-cover"
          />
          {holds.map((hold) => (
            <button
              key={hold.id}
              onClick={() => handleHoldClick(hold.id)}
              className={`absolute w-8 h-8 rounded-full ${getHoldColor(hold.id)} text-white text-xs font-bold flex items-center justify-center hover:scale-110 transition-transform shadow-lg`}
              style={{
                left: `${hold.x}%`,
                top: `${hold.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              title={`${getHoldLabel(hold.id)} ${hold.id}`}
            >
              {hold.id}
            </button>
          ))}
        </div>

        {/* Selection status */}
        <div className="flex justify-center gap-4 mb-6">
          {startHold && (
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Start: Presa {startHold}
            </div>
          )}
          {topHold && (
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              Top: Presa {topHold}
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm mb-6">
          Toca una presa para marcarla como inicio (Start) o final (Top). 
          Toca de nuevo para deseleccionar.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          <button
            onClick={handleGenerate}
            disabled={!startHold || !topHold}
            className="flex-1 bg-gray-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Generar beta
          </button>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-6">
        ¡Marca el inicio y el final de tu ruta!
      </p>
    </div>
  );
};

export default HoldSelection;