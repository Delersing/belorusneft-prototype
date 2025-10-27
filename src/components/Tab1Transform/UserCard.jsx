import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const UserCard = ({ name, avatar, status, statusColor, company, metrics, isBefore, isTransformed }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-white font-bold text-xl">
          {avatar}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span
              className="px-3 py-1 rounded-full text-sm font-semibold"
              style={{ backgroundColor: `${statusColor}20`, color: statusColor, border: `1px solid ${statusColor}40` }}
            >
              {status}
            </span>
            {company && (
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-500/20 text-purple-400 border border-purple-400/40">
                {company}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-400">
            {isTransformed ? (
              <CountUp end={metrics.transactionsPerMonth} duration={2} />
            ) : (
              metrics.transactionsPerMonth
            )}
          </div>
          <div className="text-xs text-gray-400">Транзакций в месяц</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {isTransformed ? (
              <CountUp end={metrics.averageCheck} duration={2} />
            ) : (
              metrics.averageCheck
            )}
          </div>
          <div className="text-xs text-gray-400">Средний чек, byn</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">
            {isTransformed ? (
              <CountUp end={metrics.monthlyRevenue} duration={2} separator=" " />
            ) : (
              metrics.monthlyRevenue.toLocaleString()
            )}
          </div>
          <div className="text-xs text-gray-400">Месячная выручка, byn</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {isTransformed ? (
              <CountUp end={metrics.ltv12Months} duration={2} separator=" " />
            ) : (
              metrics.ltv12Months.toLocaleString()
            )}
          </div>
          <div className="text-xs text-gray-400">LTV (12 месяцев), byn</div>
        </div>
      </div>

      {/* Loyalty Section */}
      <div className="border-t border-white/20 pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">Уровень лояльности</span>
          <span
            className="font-semibold text-sm"
            style={{ color: metrics.loyaltyColor }}
          >
            {metrics.loyaltyLevel}
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">Активных продуктов</span>
          <span className="font-semibold text-cyan-400">{metrics.activeProducts}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Баллы лояльности</span>
          <span className="font-semibold text-yellow-400">
            {isTransformed ? (
              <CountUp end={metrics.loyaltyPoints} duration={2} />
            ) : (
              metrics.loyaltyPoints
            )}
          </span>
        </div>
      </div>

      {/* Growth Arrows for After State */}
      {!isBefore && isTransformed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-2 right-2 flex flex-col space-y-1"
        >
          <div className="text-green-400 text-xs">↗ +600%</div>
          <div className="text-green-400 text-xs">↗ +52%</div>
          <div className="text-green-400 text-xs">↗ +720%</div>
          <div className="text-green-400 text-xs">↗ +720%</div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserCard;
