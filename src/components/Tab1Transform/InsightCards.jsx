import React from 'react';
import { motion } from 'framer-motion';

const InsightCards = () => {
  const insights = [
    {
      id: 1,
      icon: '💼',
      title: 'Корпоративная База',
      description: '22 заправки/месяц по B2B тарифам',
      value: '5,100',
      unit: 'byn',
      color: 'from-blue-500 to-cyan-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/40'
    },
    {
      id: 2,
      icon: '🛍️',
      title: 'Личные Покупки',
      description: 'Продолжает свои покупки',
      value: '450',
      unit: 'byn',
      color: 'from-cyan-500 to-teal-400',
      bgColor: 'bg-cyan-500/20',
      borderColor: 'border-cyan-400/40'
    },
    {
      id: 3,
      icon: '✨',
      title: 'Кросс-Эффект',
      description: 'Кофе, обеды, мойки',
      value: '480',
      unit: 'byn',
      color: 'from-purple-500 to-pink-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-400/40'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Разложение Синергетического Эффекта</h3>
        <p className="text-gray-400 text-sm">Источники дополнительной выручки после связывания аккаунтов</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`glass-card p-6 text-center relative overflow-hidden ${insight.bgColor} ${insight.borderColor} border`}
          >
            {/* Background gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${insight.color} opacity-5`}></div>

            {/* Icon */}
            <div className="text-4xl mb-4 relative z-10">{insight.icon}</div>

            {/* Title */}
            <h4 className="text-lg font-bold text-white mb-2 relative z-10">
              {insight.title}
            </h4>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4 relative z-10">
              {insight.description}
            </p>

            {/* Value */}
            <div className={`text-3xl font-bold bg-gradient-to-r ${insight.color} bg-clip-text text-transparent relative z-10`}>
              {insight.value}
              <span className="text-lg text-gray-400 ml-1">{insight.unit}</span>
            </div>

            {/* Total indicator for the third card */}
            {insight.id === 3 && (
              <div className="mt-4 pt-4 border-t border-white/20 relative z-10">
                <div className="text-sm text-gray-400 mb-1">Итого дополнительно:</div>
                <div className="text-2xl font-bold text-green-400">
                  5,000 <span className="text-sm">byn/месяц</span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-6 text-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-400 mb-2">Базовая выручка (B2C)</div>
            <div className="text-2xl font-bold text-cyan-400">1,000 byn</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-2">После синергии (C-T-C)</div>
            <div className="text-2xl font-bold text-purple-400">6,000 byn</div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/20">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">6x</div>
              <div className="text-sm text-gray-400">Рост ценности клиента</div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">500%</div>
              <div className="text-sm text-gray-400">Дополнительная выручка</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InsightCards;
