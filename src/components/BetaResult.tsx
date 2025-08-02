import React from 'react';
import { RotateCcw, TrendingUp, Activity } from 'lucide-react';
import type { ClimberData, RouteData } from '../App';

interface BetaResultProps {
  climberData: ClimberData;
  routeData: RouteData;
  onNewRoute: () => void;
}

const BetaResult: React.FC<BetaResultProps> = ({ climberData, routeData, onNewRoute }) => {
  // Mock beta sequence based on climber profile
  const betaSequence = [
    {
      step: 1,
      action: `Colócate en la presa ${routeData.startHold} en posición de inicio`,
      tip: 'Establece una base sólida antes de comenzar el ascenso'
    },
    {
      step: 2,
      action: `Realiza el primer movimiento hacia la presa ${(routeData.startHold || 0) + 1}`,
      tip: climberData.style === 'tecnico' 
        ? 'Mantente cerca de la pared y usa movimientos controlados'
        : 'Usa tu fuerza para hacer el movimiento dinámico'
    },
    {
      step: 3,
      action: 'Busca el agarre intermedio y mantén el equilibrio',
      tip: 'Respira y evalúa la próxima secuencia antes de continuar'
    },
    {
      step: 4,
      action: `Prepárate para el crux hacia la presa ${Math.floor(((routeData.topHold || 10) + (routeData.startHold || 1)) / 2)}`,
      tip: climberData.height > 175 
        ? 'Tu altura te permitirá alcanzar presas más lejanas'
        : 'Usa tu técnica para compensar el alcance'
    },
    {
      step: 5,
      action: `Finaliza en la presa ${routeData.topHold} con control`,
      tip: 'Mantén la calma en los últimos movimientos'
    }
  ];

  const getDifficulty = () => {
    const holdDifference = Math.abs((routeData.topHold || 10) - (routeData.startHold || 1));
    if (holdDifference <= 3) return { level: '5c+', color: 'text-green-600', bg: 'bg-green-100' };
    if (holdDifference <= 6) return { level: '6b+', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: '7a+', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getMovements = () => {
    return Math.abs((routeData.topHold || 10) - (routeData.startHold || 1)) + 2;
  };

  const difficulty = getDifficulty();
  const movements = getMovements();

  return (
    <div className="mt-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Tu beta ideal
          </h2>
          <div className="flex justify-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficulty.bg} ${difficulty.color}`}>
              {climberData.style === 'tecnico' ? 'Técnico' : climberData.style === 'potente' ? 'Potente' : 'Mixto'}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
              {climberData.height}cm
            </span>
          </div>
        </div>

        {/* Route visualization */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Recorrido sugerido:</h3>
          <div className="relative rounded-xl overflow-hidden h-48">
            <img
              src={routeData.imageUrl}
              alt="Recorrido de la vía"
              className="w-full h-full object-cover"
            />
            {/* Simplified route overlay */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                 refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                </marker>
              </defs>
              <path
                d={`M 25% 85% Q 35% 70% 45% 55% T 35% 10%`}
                stroke="#10b981"
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
                markerEnd="url(#arrowhead)"
                className="animate-pulse"
              />
            </svg>
          </div>
        </div>

        {/* Step by step sequence */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Secuencia paso a paso:</h3>
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {betaSequence.map((step) => (
              <div key={step.step} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {step.action}
                  </p>
                  <p className="text-xs text-gray-600 italic">
                    💡 {step.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-green-50 p-3 rounded-xl text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-600 font-medium">Dificultad estimada</span>
            </div>
            <div className="text-lg font-bold text-green-700">{difficulty.level}</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Activity className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-blue-600 font-medium">Movimientos</span>
            </div>
            <div className="text-lg font-bold text-blue-700">{movements}</div>
          </div>
        </div>

        <button
          onClick={onNewRoute}
          className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Subir otra vía
        </button>
      </div>

      <p className="text-center text-gray-500 text-sm mt-6">
        ¡Beta optimizado para tu estilo de escalada!
      </p>
    </div>
  );
};

export default BetaResult;