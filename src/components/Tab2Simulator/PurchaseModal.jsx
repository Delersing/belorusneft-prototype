import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PurchaseModal = ({ product, currentMode, userPoints, onClose, onPurchase }) => {
  const [quantity, setQuantity] = useState(1);
  const [usePoints, setUsePoints] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentPrice = currentMode === 'corporate' ? product.corporatePrice : product.personalPrice;
  const originalAmount = currentPrice * quantity;

  // Updated loyalty points calculation based on Belarus requirements
  let pointsToEarn = 0;
  if (product.category === 'fuel') {
    // За литр топлива: 1 балл
    pointsToEarn = Math.floor(quantity);
  } else if (product.category === 'cafe') {
    // За 10 BYN в кафе: 1 балл
    pointsToEarn = Math.floor(originalAmount / 10);
  } else if (product.category === 'services') {
    // За мойку: 5 баллов
    pointsToEarn = 5;
  }

  const maxPointsDiscount = Math.floor(originalAmount * 0.5); // Max 50% discount
  const pointsDiscount = Math.min(usePoints, maxPointsDiscount, userPoints);
  const finalAmount = originalAmount - (pointsDiscount * 0.01); // 1 point = 0.01 byn

  const handlePurchase = async () => {
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      const transactionData = {
        productId: product.id,
        productName: product.name,
        quantity,
        mode: currentMode,
        unitPrice: currentPrice,
        totalAmount: finalAmount,
        originalAmount,
        pointsEarned: pointsToEarn,
        pointsSpent: pointsDiscount,
        location: 'АЗС Минск-Восточная',
        cardNumber: currentMode === 'corporate' ? '**** 4891' : '**** 3421',
        company: currentMode === 'corporate' ? 'БелТрансЛогистик' : null,
        tripNumber: currentMode === 'corporate' ? `TX${Date.now()}` : null
      };

      onPurchase(transactionData);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-card max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Подтверждение покупки</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Product info */}
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{product.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-white">{product.name}</h3>
                <p className="text-gray-400 text-sm">{product.description}</p>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold mt-1 ${
                  currentMode === 'corporate'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {currentMode === 'corporate' ? '🏢 Корпоративный' : '👤 Личный'}
                </div>
              </div>
            </div>
          </div>

          {/* Purchase details */}
          <div className="p-6 space-y-6">
            {/* Quantity selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Количество
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center text-white font-bold"
                >
                  -
                </button>
                <span className="text-xl font-bold text-white w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center text-white font-bold"
                >
                  +
                </button>
                <span className="text-gray-400 ml-4">{product.unit}</span>
              </div>
            </div>

            {/* Points usage */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Использовать баллы лояльности
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max={Math.min(maxPointsDiscount, userPoints)}
                  value={usePoints}
                  onChange={(e) => setUsePoints(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-white font-bold w-16 text-center">
                  {usePoints}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0 баллов</span>
                <span>Макс: {Math.min(maxPointsDiscount, userPoints)} баллов</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Доступно: {userPoints} баллов
              </div>
            </div>

            {/* Price breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Стоимость товаров:</span>
                <span className="text-white font-semibold">{originalAmount.toFixed(2)} byn</span>
              </div>

              {pointsDiscount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-green-400">Скидка по баллам:</span>
                  <span className="text-green-400 font-semibold">-{pointsDiscount * 0.01} byn</span>
                </div>
              )}

              <div className="border-t border-white/20 pt-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-white">Итого к оплате:</span>
                  <span className="text-cyan-400">{finalAmount.toFixed(2)} byn</span>
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="glass-card p-4">
              <div className="text-sm font-semibold text-gray-300 mb-2">Способ оплаты</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                    💳
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {currentMode === 'corporate' ? 'Корпоративная карта' : 'Личная карта'}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {currentMode === 'corporate' ? 'БелТрансЛогистик' : 'Visa'} •••• {currentMode === 'corporate' ? '4891' : '3421'}
                    </div>
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  currentMode === 'corporate' ? 'bg-purple-500/20 text-purple-400' : 'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {currentMode === 'corporate' ? 'B2B' : 'B2C'}
                </div>
              </div>
            </div>

            {/* Loyalty points */}
            <div className="glass-card p-4">
              <div className="text-sm font-semibold text-gray-300 mb-3">Баллы лояльности</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">⭐</span>
                  <span className="text-white">Будет начислено:</span>
                </div>
                <span className="text-yellow-400 font-bold text-lg">+{pointsToEarn}</span>
              </div>
              {pointsDiscount > 0 && (
                <div className="flex items-center justify-between mt-2">
                  <span className="text-green-400">Списано:</span>
                  <span className="text-green-400 font-semibold">-{pointsDiscount}</span>
                </div>
              )}
            </div>

            {/* Corporate specific info */}
            {currentMode === 'corporate' && (
              <div className="glass-card p-4 bg-purple-500/10 border border-purple-400/30">
                <div className="text-sm font-semibold text-purple-400 mb-2">Корпоративная информация</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Компания:</span>
                    <span className="text-white">БелТрансЛогистик</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Рейс:</span>
                    <span className="text-white">#{Math.floor(Math.random() * 90000) + 10000}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Водитель:</span>
                    <span className="text-white">Петров А.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/20">
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 btn-secondary"
                disabled={isProcessing}
              >
                Отмена
              </button>
              <button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="flex-1 btn-primary relative"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Обработка...</span>
                  </span>
                ) : (
                  <span>Подтвердить покупку</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PurchaseModal;
