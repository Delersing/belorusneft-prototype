import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from 'recharts';

const RevenueChart = () => {
  // Mock data showing revenue growth after account linking
  const data = [
    { month: 'Янв', b2c: 900, ctc: 900, additional: 0 },
    { month: 'Фев', b2c: 950, ctc: 950, additional: 0 },
    { month: 'Мар', b2c: 1000, ctc: 1000, additional: 0 },
    { month: 'Апр', b2c: 1050, ctc: 4500, additional: 3450 }, // Transformation point
    { month: 'Май', b2c: 1100, ctc: 5000, additional: 3900 },
    { month: 'Июн', b2c: 1100, ctc: 5200, additional: 4100 },
    { month: 'Июл', b2c: 1100, ctc: 5400, additional: 4300 },
    { month: 'Авг', b2c: 1100, ctc: 5600, additional: 4500 },
    { month: 'Сен', b2c: 1100, ctc: 5800, additional: 4700 },
    { month: 'Окт', b2c: 1100, ctc: 6000, additional: 4900 },
    { month: 'Ноя', b2c: 1100, ctc: 6100, additional: 5000 },
    { month: 'Дек', b2c: 1100, ctc: 6200, additional: 5100 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-4">
          <p className="text-white font-semibold">{`Месяц: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name === 'b2c' && 'B2C прогноз: '}
              {entry.name === 'ctc' && 'C-T-C реальность: '}
              {entry.name === 'additional' && 'Дополнительная выручка: '}
              {entry.value.toLocaleString()} byn
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">График Временной Динамики</h3>
        <p className="text-gray-400 text-sm">Выручка по месяцам до и после связывания аккаунтов</p>
      </div>

      <div className="h-80 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="month"
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* B2C baseline */}
            <Line
              type="monotone"
              dataKey="b2c"
              stroke="#06b6d4"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="B2C прогноз"
              dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
            />

            {/* C-T-C actual */}
            <Line
              type="monotone"
              dataKey="ctc"
              stroke="#a855f7"
              strokeWidth={3}
              name="C-T-C реальность"
              dot={{ fill: '#a855f7', strokeWidth: 2, r: 5 }}
            />

            {/* Additional revenue area */}
            <Area
              type="monotone"
              dataKey="additional"
              stroke="#10b981"
              fill="url(#colorAdditional)"
              name="Дополнительная выручка"
            />

            <defs>
              <linearGradient id="colorAdditional" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Transformation point indicator */}
      <div className="flex items-center justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
          <span className="text-gray-400">B2C прогноз (без связывания)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
          <span className="text-gray-400">C-T-C реальность (с синергией)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="text-gray-400">Дополнительная выручка</span>
        </div>
      </div>

      {/* Vertical line at transformation point */}
      <div className="absolute left-1/4 top-20 bottom-20 w-0.5 bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-50"></div>
      <div className="absolute left-1/4 top-16 text-center">
        <div className="bg-purple-400 text-white px-2 py-1 rounded text-xs font-semibold">
          Момент связывания аккаунтов
        </div>
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-purple-400 mx-auto mt-1"></div>
      </div>
    </div>
  );
};

export default RevenueChart;
