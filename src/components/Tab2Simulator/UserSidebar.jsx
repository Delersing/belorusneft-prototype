import React from 'react';
import { motion } from 'framer-motion';

const UserSidebar = ({ currentMode, userPoints, transactions }) => {
  const progressToNextLevel = (userPoints % 100); // Assuming 100 points per level

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <div className="glass-card p-6">
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            АП
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Александр Петров</h3>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
            currentMode === 'corporate'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-400/40'
              : 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/40'
          }`}>
            {currentMode === 'corporate' ? '🏢 БелТрансЛогистик' : '👤 Личный режим'}
          </div>
        </div>

        {/* Loyalty Points */}
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-yellow-400 mb-2">
            {userPoints}
          </div>
          <div className="text-sm text-gray-400 mb-3">Баллов лояльности</div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressToNextLevel}%` }}
              transition={{ duration: 1 }}
              className={`h-2 rounded-full ${
                currentMode === 'corporate' ? 'bg-gradient-to-r from-purple-400 to-purple-600' : 'bg-gradient-to-r from-cyan-400 to-cyan-600'
              }`}
            />
          </div>
          <div className="text-xs text-gray-500">
            До следующего уровня: {100 - progressToNextLevel} баллов
          </div>
        </div>

        {/* Points Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Личные покупки</span>
            <span className="text-cyan-400 font-semibold">143 балла</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Корпоративные бонусы</span>
            <span className="text-purple-400 font-semibold">104 балла</span>
          </div>
          <div className="border-t border-white/20 pt-3">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-white">Всего</span>
              <span className="text-yellow-400">{userPoints} баллов</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="glass-card p-6">
        <h4 className="text-lg font-bold text-white mb-4">Последние транзакции</h4>

        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-sm">Нет транзакций</div>
            <div className="text-gray-500 text-xs mt-1">Совершите первую покупку</div>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    transaction.mode === 'corporate' ? 'bg-purple-500/20 text-purple-400' : 'bg-cyan-500/20 text-cyan-400'
                  }`}>
                    {transaction.mode === 'corporate' ? '🏢' : '👤'}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">
                      {transaction.productName}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {new Date(transaction.timestamp).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-white text-sm font-semibold">
                    {transaction.totalAmount} byn
                  </div>
                  <div className="text-green-400 text-xs">
                    +{transaction.pointsEarned} ⭐
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pulse animation for new transactions */}
        {transactions.length > 0 && (
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full"
          />
        )}
      </div>

      {/* Quick Stats */}
      <div className="glass-card p-6">
        <h4 className="text-lg font-bold text-white mb-4">Быстрая статистика</h4>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-cyan-400">
              {transactions.filter(t => t.mode === 'personal').length}
            </div>
            <div className="text-xs text-gray-400">Личных покупок</div>
          </div>

          <div className="text-center">
            <div className="text-lg font-bold text-purple-400">
              {transactions.filter(t => t.mode === 'corporate').length}
            </div>
            <div className="text-xs text-gray-400">Корпоративных</div>
          </div>

          <div className="text-center">
            <div className="text-lg font-bold text-green-400">
              {transactions.reduce((sum, t) => sum + t.pointsEarned, 0)}
            </div>
            <div className="text-xs text-gray-400">Баллов сегодня</div>
          </div>

          <div className="text-center">
            <div className="text-lg font-bold text-yellow-400">
              {Math.round(transactions.reduce((sum, t) => sum + t.totalAmount, 0))}
            </div>
            <div className="text-xs text-gray-400">Потрачено, byn</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
