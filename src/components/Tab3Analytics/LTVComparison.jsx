import React from 'react';
import { motion } from 'framer-motion';

const LTVComparison = ({ data }) => {
  // Protection against undefined data
  if (!data) {
    return (
      <div className="glass-card p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Сравнение LTV по Сегментам</h3>
        <p className="text-gray-400 text-sm">Пожизненная ценность клиента и ключевые метрики</p>
        </div>
        <div className="text-center py-8">
          <div className="text-gray-400">Данные загружаются...</div>
        </div>
      </div>
    );
  }

  const segments = [
    { ...data.b2cOnly, name: 'B2C only', color: '#06b6d4', bgColor: 'bg-cyan-500/20', borderColor: 'border-cyan-400/40' },
    { ...data.b2bOnly, name: 'B2B only', color: '#f97316', bgColor: 'bg-orange-500/20', borderColor: 'border-orange-400/40' },
    { ...data.ctc, name: 'C-T-C ⭐', color: '#a855f7', bgColor: 'bg-purple-500/20', borderColor: 'border-purple-400/40' }
  ];

  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Сравнение LTV по Сегментам</h3>
        <p className="text-gray-400 text-sm">Пожизненная ценность клиента и ключевые метрики</p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-3 text-gray-400 font-semibold">Метрика</th>
              {segments.map((segment) => (
                <th key={segment.name} className="text-center py-3 text-gray-400 font-semibold">
                  {segment.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* LTV Row */}
            <tr className="border-b border-white/10">
              <td className="py-4 text-gray-300 font-semibold">Средний LTV</td>
              {segments.map((segment) => (
                <td key={segment.name} className="text-center py-4">
                  <div className="text-2xl font-bold" style={{ color: segment.color }}>
                    {segment.avgLtv.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">byn</div>
                </td>
              ))}
            </tr>

            {/* Transactions Row */}
            <tr className="border-b border-white/10">
              <td className="py-4 text-gray-300 font-semibold">Транзакций/мес</td>
              {segments.map((segment) => (
                <td key={segment.name} className="text-center py-4">
                  <div className="text-lg font-semibold text-cyan-400">
                    {segment.transactionsPerMonth}
                  </div>
                </td>
              ))}
            </tr>

            {/* Active Products Row */}
            <tr className="border-b border-white/10">
              <td className="py-4 text-gray-300 font-semibold">Активных продуктов</td>
              {segments.map((segment) => (
                <td key={segment.name} className="text-center py-4">
                  <div className="text-lg font-semibold text-green-400">
                    {segment.activeProducts}
                  </div>
                </td>
              ))}
            </tr>

            {/* Redemption Rate Row */}
            <tr>
              <td className="py-4 text-gray-300 font-semibold">Использование баллов лояльности</td>
              {segments.map((segment) => (
                <td key={segment.name} className="text-center py-4">
                  <div className="text-lg font-semibold text-yellow-400">
                    {segment.redemptionRate}%
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Visual Progress Bars */}
      <div className="mt-8 space-y-4">
        <div className="text-sm text-gray-400 mb-3">Визуальное сравнение LTV:</div>

        {segments.map((segment, index) => (
          <motion.div
            key={segment.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">{segment.name}</span>
              <span className="text-sm text-gray-400">
                {segment.avgLtv.toLocaleString()} byn
              </span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(segment.avgLtv / 72000) * 100}%` }}
                transition={{ delay: index * 0.1 + 0.5, duration: 1.5 }}
                className="h-3 rounded-full relative"
                style={{
                  background: `linear-gradient(90deg, ${segment.color}40, ${segment.color})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border border-green-400/30 rounded-lg bg-green-500/10">
          <div className="text-green-400 font-bold mb-2">📈 Рост LTV</div>
          <div className="text-sm text-gray-300">
            C-T-C клиенты показывают LTV в 6 раз выше, чем B2C only
          </div>
        </div>

        <div className="p-4 border border-purple-400/30 rounded-lg bg-purple-500/10">
          <div className="text-purple-400 font-bold mb-2">⭐ Максимальная лояльность</div>
          <div className="text-sm text-gray-300">
            Уровень использования баллов у C-T-C: 65% против 34% у B2C
          </div>
        </div>
      </div>
    </div>
  );
};

export default LTVComparison;
