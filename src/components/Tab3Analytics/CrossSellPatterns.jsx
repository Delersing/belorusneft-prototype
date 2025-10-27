import React from 'react';
import { motion } from 'framer-motion';

const CrossSellPatterns = ({ data }) => {
  // Protection against undefined data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="glass-card p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Паттерны Кросс-Продаж</h3>
          <p className="text-gray-400 text-sm">Как C-T-C клиенты увеличивают потребление услуг</p>
        </div>
        <div className="text-center py-8">
          <div className="text-gray-400">Данные паттернов загружаются...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Паттерны Кросс-Продаж</h3>
        <p className="text-gray-400 text-sm">Как C-T-C клиенты увеличивают потребление услуг</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((pattern, index) => (
          <motion.div
            key={pattern.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/30 transition-colors duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-white">{pattern.title}</h4>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                {pattern.badge}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {pattern.description}
            </p>

            {/* Additional details */}
            {pattern.comparison && (
              <div className="text-cyan-400 text-sm font-semibold mb-2">
                {pattern.comparison}
              </div>
            )}

            {pattern.detail && (
              <div className="text-purple-400 text-sm">
                {pattern.detail}
              </div>
            )}

            {/* Mini chart for morning pattern */}
            {pattern.id === 'morning-coffee' && pattern.chartData && (
              <div className="mt-4">
                <div className="flex items-end space-x-1 h-12">
                  {pattern.chartData.slice(6, 18).map((value, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${(value / 70) * 100}%` }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-gradient-to-t from-cyan-400 to-cyan-300 rounded-t flex-1 min-w-[4px]"
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-400 mt-2 text-center">
                  Время суток (7:00 - 18:00)
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 p-6 border-t border-white/20">
        <div className="text-center">
          <div className="text-lg text-gray-400 mb-2">Результат кросс-продаж:</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">+85%</div>
              <div className="text-xs text-gray-400">Больше продуктов на клиента</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">+42%</div>
              <div className="text-xs text-gray-400">Конверсия персональных офферов</div>
            </div>
            <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">+28%</div>
            <div className="text-xs text-gray-400">Кликабельность</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrossSellPatterns;
