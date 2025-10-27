import React from 'react';
import { motion } from 'framer-motion';

const KYCQuality = ({ data }) => {
  // Protection against undefined data
  if (!data) {
    return (
      <div className="glass-card p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Качество Данных (KYC)</h3>
          <p className="text-gray-400 text-sm">Полнота профилей клиентов и результаты персонализации</p>
        </div>
        <div className="text-center py-8">
          <div className="text-gray-400">Данные загружаются...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Качество Данных (KYC)</h3>
        <p className="text-gray-400 text-sm">Полнота профилей клиентов и результаты персонализации</p>
      </div>

      {/* Progress comparison */}
      <div className="space-y-6 mb-8">
        {/* B2C Only */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-cyan-400 font-semibold">B2C only клиент</span>
            <span className="text-cyan-400 font-bold">{data.b2cOnly.percentage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${data.b2cOnly.percentage}%` }}
              transition={{ duration: 1.5 }}
              className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-4 rounded-full"
            />
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {data.b2cOnly.filledAttributes} из {data.b2cOnly.totalAttributes} атрибутов заполнено
          </div>
          <div className="text-xs text-gray-500 mt-1">
          Известно: {(data?.b2cOnly?.knownData ?? []).join(', ') || 'Нет данных'}
          </div>
        </div>

        {/* C-T-C */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-purple-400 font-semibold">C-T-C клиент</span>
            <span className="text-purple-400 font-bold">{data.ctc.percentage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${data.ctc.percentage}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="bg-gradient-to-r from-purple-400 to-purple-600 h-4 rounded-full"
            />
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {data.ctc.filledAttributes} из {data.ctc.totalAttributes} атрибутов заполнено
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Известно: маршруты, график работы, тип транспорта, паттерны покупок...
          </div>
        </div>
      </div>

      {/* Personalization Results */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-400/30">
          <div className="text-2xl font-bold text-green-400 mb-1">
            +{data.personalizationResults.recommendationAccuracy}%
          </div>
          <div className="text-xs text-gray-400">Точность рекомендаций</div>
        </div>

        <div className="text-center p-4 bg-cyan-500/10 rounded-lg border border-cyan-400/30">
          <div className="text-2xl font-bold text-cyan-400 mb-1">
            +{data.personalizationResults.offerConversion}%
          </div>
          <div className="text-xs text-gray-400">Конверсия офферов</div>
        </div>

        <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-400/30">
          <div className="text-2xl font-bold text-purple-400 mb-1">
            +{data.personalizationResults.clickThroughRate}%
          </div>
          <div className="text-xs text-gray-400">Кликабельность</div>
        </div>
      </div>

      {/* Quality improvement */}
      <div className="p-4 border-2 border-purple-400/50 rounded-lg bg-purple-500/10">
        <div className="text-center">
          <div className="text-purple-400 font-bold text-lg mb-2">
            📊 Качество данных выросло в 5.8 раза
          </div>
          <div className="text-sm text-gray-300 mb-3">
            C-T-C клиенты предоставляют в 5.8 раза больше данных для персонализации
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-400">B2C only:</div>
              <div className="text-cyan-400 font-semibold">16% заполненности</div>
            </div>
            <div>
              <div className="text-gray-400">C-T-C:</div>
              <div className="text-purple-400 font-semibold">93% заполненности</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCQuality;
