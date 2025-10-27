import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LiveMap = ({ data }) => {
  const [selectedStation, setSelectedStation] = useState(null);

  // Protection against undefined data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="glass-card p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Карта в Реальном Времени</h3>
          <p className="text-gray-400 text-sm">Кросс-покупки по АЗС сегодня</p>
        </div>
        <div className="text-center py-8">
          <div className="text-gray-400">Данные карты загружаются...</div>
        </div>
      </div>
    );
  }

  // Map dimensions (representing a city map)
  const mapWidth = 400;
  const mapHeight = 300;

  const getActivityColor = (activity) => {
    switch (activity) {
      case 'high': return '#ef4444'; // red
      case 'medium': return '#f97316'; // orange
      case 'low': return '#10b981'; // green
      default: return '#6b7280';
    }
  };

  const getActivityIntensity = (activity) => {
    switch (activity) {
      case 'high': return 1;
      case 'medium': return 0.7;
      case 'low': return 0.4;
      default: return 0.2;
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Карта в Реальном Времени</h3>
        <p className="text-gray-400 text-sm">Кросс-покупки по АЗС сегодня</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4" style={{ width: mapWidth, height: mapHeight }}>
            {/* Grid lines */}
            <div className="absolute inset-0 opacity-20">
              <svg width={mapWidth} height={mapHeight}>
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Connection lines between stations */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3"/>
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3"/>
                </linearGradient>
              </defs>

              {/* Animated connection lines */}
              <motion.path
                d="M 150 200 Q 125 175 100 150 Q 175 125 250 150 Q 325 175 350 200"
                fill="none"
                stroke="url(#connectionGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
            </svg>

            {/* Gas stations */}
            {data.map((station, index) => (
              <motion.div
                key={station.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="absolute cursor-pointer"
                style={{
                  left: station.coordinates.x - 12,
                  top: station.coordinates.y - 12,
                }}
                onClick={() => setSelectedStation(station)}
              >
                {/* Station marker */}
                <div className="relative">
                  <motion.div
                    className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      backgroundColor: getActivityColor(station.activity),
                      boxShadow: `0 0 20px ${getActivityColor(station.activity)}40`
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        `0 0 20px ${getActivityColor(station.activity)}40`,
                        `0 0 30px ${getActivityColor(station.activity)}80`,
                        `0 0 20px ${getActivityColor(station.activity)}40`
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: getActivityColor(station.activity) }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 0, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
              <div className="text-xs text-gray-300 mb-2">Активность АЗС:</div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-white">Высокая</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-xs text-white">Средняя</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-white">Низкая</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Station Details */}
        <div className="space-y-4">
          <div className="text-sm text-gray-400 mb-3">Статистика по АЗС:</div>

          {data.map((station, index) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                selectedStation?.id === station.id
                  ? 'border-cyan-400 bg-cyan-500/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
              onClick={() => setSelectedStation(station)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold">{station.name}</h4>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  station.activity === 'high' ? 'bg-red-500/20 text-red-400' :
                  station.activity === 'medium' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {station.activity === 'high' ? '🔥🔥🔥' :
                   station.activity === 'medium' ? '🔥🔥' : '🔥'}
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Кросс-покупки:</span>
                  <span className="text-cyan-400 font-semibold">{station.crossPurchases}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Кофе после заправки:</span>
                  <span className="text-purple-400 font-semibold">
                    {station.coffeeAfterFuel} ({((station.coffeeAfterFuel / station.crossPurchases) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Покупки в магазине:</span>
                  <span className="text-green-400 font-semibold">
                    {station.storePurchases} ({((station.storePurchases / station.crossPurchases) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Заказы в кафе:</span>
                  <span className="text-yellow-400 font-semibold">
                    {station.cafeOrders} ({((station.cafeOrders / station.crossPurchases) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 pt-6 border-t border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-cyan-400">
              {data.reduce((sum, station) => sum + station.crossPurchases, 0)}
            </div>
            <div className="text-xs text-gray-400">Всего кросс-покупок</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">
              {data.filter(station => station.activity === 'high').length}
            </div>
            <div className="text-xs text-gray-400">Высокоактивных АЗС</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">
              {((data.reduce((sum, station) => sum + station.coffeeAfterFuel, 0) / data.reduce((sum, station) => sum + station.crossPurchases, 0)) * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-gray-400">Конверсия кофе</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
