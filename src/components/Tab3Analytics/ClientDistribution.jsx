import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const ClientDistribution = ({ data }) => {
  // Protection against undefined data
  if (!data) {
    return (
      <div className="glass-card p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Распределение Клиентской Базы</h3>
          <p className="text-gray-400 text-sm">Структура пользователей по типам взаимодействия</p>
        </div>
        <div className="text-center py-8">
          <div className="text-gray-400">Данные загружаются...</div>
        </div>
      </div>
    );
  }

  const chartData = [
    { name: 'B2C only', value: data.b2cOnly.percentage, count: data.b2cOnly.count, color: data.b2cOnly.color, avgLtv: data.b2cOnly.avgLtv },
    { name: 'B2B only', value: data.b2bOnly.percentage, count: data.b2bOnly.count, color: data.b2bOnly.color, avgLtv: data.b2bOnly.avgLtv },
    { name: 'C-T-C', value: data.ctc.percentage, count: data.ctc.count, color: data.ctc.color, avgLtv: data.ctc.avgLtv }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card p-4">
          <p className="text-white font-semibold">{data.name}</p>
          <p className="text-cyan-400">Пользователей: {data.count}</p>
          <p className="text-purple-400">Средний LTV: {data.avgLtv.toLocaleString()} byn</p>
          <p className="text-green-400">Доля: {data.value}%</p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 5) return null; // Don't show label for segments smaller than 5%

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Распределение Клиентской Базы</h3>
        <p className="text-gray-400 text-sm">Структура пользователей по типам взаимодействия</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend and Details */}
        <div className="space-y-4">
          {chartData.map((segment, index) => (
            <div key={segment.name} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: segment.color }}
                ></div>
                <div>
                  <div className="text-white font-semibold">{segment.name}</div>
                  <div className="text-gray-400 text-sm">{segment.count} пользователей</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-cyan-400 font-bold">{segment.value}%</div>
                <div className="text-purple-400 text-sm">{segment.avgLtv.toLocaleString()} byn</div>
              </div>
            </div>
          ))}

          {/* Highlight C-T-C segment */}
          <div className="mt-6 p-4 border-2 border-purple-400/50 rounded-lg bg-purple-500/10">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">⭐</span>
              <span className="text-purple-400 font-bold">C-T-C сегмент</span>
            </div>
            <div className="text-sm text-gray-300">
              <div>• Самый эффективный сегмент</div>
              <div>• Высокий LTV: 72,000 byn</div>
              <div>• Максимальная лояльность</div>
              <div>• Генерирует 45% выручки</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-cyan-400">1,247</div>
            <div className="text-xs text-gray-400">Всего пользователей</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">267</div>
            <div className="text-xs text-gray-400">C-T-C клиентов</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">21.4%</div>
            <div className="text-xs text-gray-400">Конверсия в C-T-C</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDistribution;
