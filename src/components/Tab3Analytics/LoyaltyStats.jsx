import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LoyaltyStats = ({ data }) => {
  // Protection against undefined data
  if (!data) {
    return (
      <div className="glass-card p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Программа Лояльности</h3>
          <p className="text-gray-400 text-sm">Источники заработанных баллов и уровень их использования</p>
        </div>
        <div className="text-center py-8">
          <div className="text-gray-400">Данные загружаются...</div>
        </div>
      </div>
    );
  }

  const chartData = [
    { name: 'B2C покупки', value: data.b2cPoints, color: '#06b6d4' },
    { name: 'Кросс-бонусы B2B', value: data.crossBonusPoints, color: '#a855f7' }
  ];

  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Программа Лояльности</h3>
          <p className="text-gray-400 text-sm">Источники заработанных баллов и уровень их использования</p>
      </div>

      {/* Stacked Bar Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0];
                  return (
                    <div className="glass-card p-4">
                      <p className="text-white font-semibold">{label}</p>
                      <p style={{ color: data.color }}>
                        Баллов: {(data.value / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="value" fill="#a855f7" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Bar key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="text-center p-4 bg-cyan-500/10 rounded-lg border border-cyan-400/30">
          <div className="text-2xl font-bold text-cyan-400 mb-1">
            {data.ctcRedemptionRate}%
          </div>
          <div className="text-sm text-gray-400">Использование баллов C-T-C</div>
        </div>

        <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-400/30">
          <div className="text-2xl font-bold text-purple-400 mb-1">
            {data.b2cRedemptionRate}%
          </div>
          <div className="text-sm text-gray-400">Использование баллов B2C</div>
        </div>
      </div>

      {/* Improvement indicator */}
      <div className="text-center p-4 border-2 border-green-400/50 rounded-lg bg-green-500/10">
        <div className="text-green-400 font-bold text-lg mb-1">
          {data.improvement}x выше активность
        </div>
        <div className="text-sm text-gray-300">
          C-T-C пользователи в {data.improvement} раза активнее тратят баллы
        </div>
      </div>

      {/* Total summary */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-yellow-400">
              {(data.totalPoints / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-gray-400">Всего баллов</div>
          </div>
          <div>
            <div className="text-xl font-bold text-cyan-400">
              {(data.b2cPoints / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-gray-400">B2C баллы</div>
          </div>
          <div>
            <div className="text-xl font-bold text-purple-400">
              {(data.crossBonusPoints / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-gray-400">Кросс-бонусы</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyStats;
