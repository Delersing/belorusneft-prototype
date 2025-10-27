import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const HeroMetrics = ({ data }) => {
  // Protection against undefined data
  if (!data) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Ключевые Показатели Экосистемы</h3>
          <p className="text-gray-400">Масштаб эффекта синергии C-T-C на уровне всей сети</p>
        </div>
        <div className="text-center py-8">
          <div className="text-gray-400">Данные загружаются...</div>
        </div>
      </div>
    );
  }

  const metrics = [
    {
      ...data.ctcCoverage,
      format: 'number',
      suffix: '',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      ...data.synergyGrowth,
      format: 'percentage',
      suffix: '%',
      color: 'from-green-400 to-emerald-400'
    },
    {
      ...data.additionalRevenue,
      format: 'currency',
      suffix: ' byn',
      color: 'from-purple-400 to-pink-400'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Ключевые Показатели Экосистемы</h3>
        <p className="text-gray-400">Масштаб эффекта синергии C-T-C на уровне всей сети</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: index * 0.2,
              duration: 0.6,
              type: "spring",
              stiffness: 100
            }}
            className="glass-card p-8 text-center relative overflow-hidden group"
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
              className="text-5xl mb-4 relative z-10"
            >
              {metric.icon}
            </motion.div>

            {/* Value */}
            <div className="relative z-10 mb-4">
              <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-2`}>
                {metric.format === 'currency' ? (
                  <CountUp
                    end={metric.value}
                    duration={3}
                    separator=" "
                    formattingFn={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                ) : metric.format === 'percentage' ? (
                  <CountUp end={metric.value} duration={3} suffix="%" />
                ) : (
                  <CountUp end={metric.value} duration={3} />
                )}
              </div>

              {/* Percentage badge */}
              {metric.percentage && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                  className="inline-flex items-center bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  {metric.percentage}% от общей базы
                </motion.div>
              )}
            </div>

            {/* Label */}
            <div className="text-gray-300 text-sm relative z-10 leading-relaxed">
              {metric.label}
            </div>

            {/* Hover glow effect */}
            <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 ${
              metric.color.includes('blue') ? 'border-cyan-400/50' :
              metric.color.includes('green') ? 'border-green-400/50' : 'border-purple-400/50'
            }`}></div>

            {/* Pulse animation for the highlighted metric */}
            {index === 2 && (
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="glass-card p-6 text-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-400 mb-2">Доля C-T-C в общей выручке</div>
            <div className="text-3xl font-bold text-purple-400">45%</div>
            <div className="text-xs text-gray-500 mt-1">При доле пользователей 21.4%</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-2">Эффективность сегмента</div>
            <div className="text-3xl font-bold text-green-400">2.1x</div>
            <div className="text-xs text-gray-500 mt-1">Выше среднего по базе</div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/20">
          <div className="text-center">
            <div className="text-lg text-gray-400 mb-2">Вывод:</div>
            <div className="text-xl font-bold gradient-text">
              21% пользователей генерируют 45% выручки
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroMetrics;
