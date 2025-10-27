import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const MetricsBlock = ({ metrics, isBefore, isTransformed }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="metric-card"
      >
        <div className="text-2xl font-bold text-cyan-400">
          {isTransformed ? (
            <CountUp end={metrics.transactionsPerMonth} duration={2} />
          ) : (
            metrics.transactionsPerMonth
          )}
        </div>
        <div className="text-xs text-gray-400">Транзакций в месяц</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="metric-card"
      >
        <div className="text-2xl font-bold text-green-400">
          {isTransformed ? (
            <CountUp end={metrics.averageCheck} duration={2} />
          ) : (
            metrics.averageCheck
          )}
        </div>
        <div className="text-xs text-gray-400">Средний чек, byn</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="metric-card"
      >
        <div className="text-2xl font-bold text-purple-400">
          {isTransformed ? (
            <CountUp end={metrics.monthlyRevenue} duration={2} separator=" " />
          ) : (
            metrics.monthlyRevenue.toLocaleString()
          )}
        </div>
        <div className="text-xs text-gray-400">Месячная выручка, byn</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="metric-card"
      >
        <div className="text-2xl font-bold text-yellow-400">
          {isTransformed ? (
            <CountUp end={metrics.ltv12Months} duration={2} separator=" " />
          ) : (
            metrics.ltv12Months.toLocaleString()
          )}
        </div>
        <div className="text-xs text-gray-400">LTV (12 месяцев), byn</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="metric-card"
      >
        <div
          className="text-lg font-bold"
          style={{ color: metrics.loyaltyColor }}
        >
          {metrics.loyaltyLevel}
        </div>
        <div className="text-xs text-gray-400">Уровень лояльности</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="metric-card"
      >
        <div className="text-2xl font-bold text-cyan-400">
          {metrics.activeProducts}
        </div>
        <div className="text-xs text-gray-400">Активных продуктов</div>
      </motion.div>
    </div>
  );
};

export default MetricsBlock;
