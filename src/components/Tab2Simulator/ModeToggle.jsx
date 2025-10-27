import React from 'react';
import { motion } from 'framer-motion';

const ModeToggle = ({ currentMode, onModeChange }) => {
  return (
    <div className="glass-card p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Режим Покупок</h3>
        <p className="text-gray-400 text-sm">
          Переключение между личным и корпоративным контекстом
        </p>
      </div>

      {/* Toggle Switch */}
      <div className="flex items-center justify-center space-x-6">
        {/* Personal Mode */}
        <div className="text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
            currentMode === 'personal'
              ? 'bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg shadow-cyan-400/50'
              : 'bg-gray-600 hover:bg-gray-500'
          }`}>
            <span className="text-2xl">👤</span>
          </div>
          <div className={`text-sm font-semibold transition-colors duration-300 ${
            currentMode === 'personal' ? 'text-cyan-400' : 'text-gray-400'
          }`}>
            Личный
          </div>
          <div className="text-xs text-gray-500">B2C</div>
        </div>

        {/* Toggle Switch */}
        <div className="relative">
          <div className="w-20 h-10 bg-gray-600 rounded-full relative cursor-pointer" onClick={() => onModeChange(currentMode === 'personal' ? 'corporate' : 'personal')}>
            {/* Track background */}
            <motion.div
              className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                currentMode === 'corporate' ? 'bg-gradient-to-r from-purple-500 to-purple-700' : 'bg-gradient-to-r from-cyan-500 to-cyan-700'
              }`}
            />

            {/* Toggle circle */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`absolute top-1 w-8 h-8 rounded-full shadow-lg flex items-center justify-center ${
                currentMode === 'corporate' ? 'left-11 bg-purple-400' : 'left-1 bg-cyan-400'
              }`}
            >
              <span className="text-white text-sm">
                {currentMode === 'corporate' ? '🏢' : '👤'}
              </span>
            </motion.div>

            {/* Labels on track */}
            <div className="absolute inset-0 flex items-center justify-between px-2">
              <span className={`text-xs font-semibold transition-colors duration-300 ${
                currentMode === 'personal' ? 'text-cyan-200' : 'text-gray-400'
              }`}>
                B2C
              </span>
              <span className={`text-xs font-semibold transition-colors duration-300 ${
                currentMode === 'corporate' ? 'text-purple-200' : 'text-gray-400'
              }`}>
                B2B
              </span>
            </div>
          </div>
        </div>

        {/* Corporate Mode */}
        <div className="text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
            currentMode === 'corporate'
              ? 'bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg shadow-purple-400/50'
              : 'bg-gray-600 hover:bg-gray-500'
          }`}>
            <span className="text-2xl">🏢</span>
          </div>
          <div className={`text-sm font-semibold transition-colors duration-300 ${
            currentMode === 'corporate' ? 'text-purple-400' : 'text-gray-400'
          }`}>
            Корпоративный
          </div>
          <div className="text-xs text-gray-500">БелТрансЛогистик</div>
        </div>
      </div>

      {/* Mode Description */}
      <motion.div
        key={currentMode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6 p-4 rounded-lg border border-white/20"
      >
        {currentMode === 'personal' ? (
          <div className="text-center">
            <div className="text-cyan-400 font-semibold mb-2">👤 Личный Режим Активен</div>
            <p className="text-gray-400 text-sm">
              Покупки для личного использования. Стандартные цены, начисление баллов лояльности.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-purple-400 font-semibold mb-2">🏢 Корпоративный Режим Активен</div>
            <p className="text-gray-400 text-sm">
              Покупки от лица компании "БелТрансЛогистик". Скидки B2B, повышенные баллы, корпоративная отчетность.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ModeToggle;
