import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import UserCard from './UserCard';
import MetricsBlock from './MetricsBlock';
import RevenueChart from './RevenueChart';
import InsightCards from './InsightCards';

const TransformComparison = () => {
  const [isTransformed, setIsTransformed] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleTransform = () => {
    if (!isTransformed) {
      setShowAnimation(true);
      setTimeout(() => {
        setIsTransformed(true);
        setShowAnimation(false);
      }, 2000);
    } else {
      // Reset animation
      setIsTransformed(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold gradient-text mb-2"
        >
          Эффект Синергии: Превращение Обычного Клиента в Золотого
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-cyan-400 text-lg"
        >
          Одно действие → Рост ценности клиента в 6 раз
        </motion.p>
      </div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Before Panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="glass-card p-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-300">ДО</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-cyan-400 mx-auto mt-2"></div>
            </div>
            <UserCard
              name="Александр Петров"
              avatar="AP"
              status="B2C Клиент"
              statusColor="#06b6d4"
              metrics={{
                transactionsPerMonth: 9,
                averageCheck: 115,
                monthlyRevenue: 1000,
                ltv12Months: 12000,
                loyaltyLevel: 'Бронзовый',
                loyaltyColor: '#cd7f32',
                activeProducts: 2,
                loyaltyPoints: 247
              }}
              isBefore={true}
            />
          </div>
        </motion.div>

        {/* Center Divider */}
        <div className="flex items-center justify-center lg:hidden my-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center">
              <span className="text-white text-sm">→</span>
            </div>
            <button
              onClick={handleTransform}
              className="btn-primary px-6 py-2"
            >
              {isTransformed ? '🔄 Повторить Анимацию' : '▶ Показать Трансформацию'}
            </button>
          </div>
        </div>

        {/* After Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="glass-card p-6 relative overflow-hidden">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-300">ПОСЛЕ</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-purple-400 mx-auto mt-2"></div>
            </div>

            {/* Transformation Animation Overlay */}
            <AnimatePresence>
              {showAnimation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 flex items-center justify-center z-10"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ duration: 2 }}
                      className="w-16 h-16 border-4 border-cyan-400 rounded-full mx-auto mb-4 flex items-center justify-center"
                    >
                      <span className="text-2xl">✨</span>
                    </motion.div>
                    <p className="text-white font-semibold">Трансформация...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <UserCard
              name="Александр Петров"
              avatar="AP"
              status="C-T-C Клиент"
              statusColor="#a855f7"
              company="🏢 БелТрансЛогистик"
              metrics={{
                transactionsPerMonth: 38,
                averageCheck: 158,
                monthlyRevenue: 6000,
                ltv12Months: 72000,
                loyaltyLevel: 'Золотой',
                loyaltyColor: '#FACC15',
                activeProducts: 6,
                loyaltyPoints: 351
              }}
              isBefore={false}
              isTransformed={isTransformed}
            />
          </div>
        </motion.div>
      </div>

      {/* Center Controls (Desktop) */}
      <div className="hidden lg:flex items-center justify-center">
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center mb-2">
              <span className="text-white">1</span>
            </div>
            <p className="text-sm text-gray-400">B2C</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"></div>
            <button
              onClick={handleTransform}
              className="btn-primary px-8 py-3 text-lg"
            >
              {isTransformed ? '🔄 Повторить Анимацию' : '▶ Показать Трансформацию'}
            </button>
            <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400"></div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center justify-center mb-2">
              <span className="text-white">2</span>
            </div>
            <p className="text-sm text-gray-400">C-T-C</p>
          </div>
        </div>
      </div>

      {/* Growth Indicators */}
      <AnimatePresence>
        {isTransformed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="glass-card p-4 text-center">
              <div className="text-2xl mb-1">📈</div>
              <div className="text-green-400 font-bold text-lg">
                <CountUp end={322} suffix="%" duration={2} />
              </div>
              <div className="text-xs text-gray-400">Транзакций</div>
            </div>

            <div className="glass-card p-4 text-center">
              <div className="text-2xl mb-1">💰</div>
              <div className="text-green-400 font-bold text-lg">
                <CountUp end={37} suffix="%" duration={2} />
              </div>
              <div className="text-xs text-gray-400">Средний чек</div>
            </div>

            <div className="glass-card p-4 text-center">
              <div className="text-2xl mb-1">📊</div>
              <div className="text-green-400 font-bold text-lg">
                <CountUp end={500} suffix="%" duration={2} />
              </div>
              <div className="text-xs text-gray-400">Выручка</div>
            </div>

            <div className="glass-card p-4 text-center">
              <div className="text-2xl mb-1">🏆</div>
              <div className="text-green-400 font-bold text-lg">
                <CountUp end={500} suffix="%" duration={2} />
              </div>
              <div className="text-xs text-gray-400">LTV</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <RevenueChart />
      </motion.div>

      {/* Insight Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <InsightCards />
      </motion.div>
    </div>
  );
};

export default TransformComparison;
