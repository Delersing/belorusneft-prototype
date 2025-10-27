import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, currentMode, onSelect }) => {
  const currentPrice = currentMode === 'corporate' ? product.corporatePrice : product.personalPrice;
  const originalPrice = product.personalPrice;
  const hasDiscount = currentMode === 'corporate' && product.discount > 0;
  const savings = hasDiscount ? (originalPrice - currentPrice) : 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glass-card p-6 cursor-pointer group relative overflow-hidden"
      onClick={() => onSelect(product)}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Discount badge */}
      {hasDiscount && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-1 rounded-full text-xs font-bold"
        >
          -{product.discount}%
        </motion.div>
      )}

      {/* Product Icon */}
      <div className="text-center mb-4">
        <div className="text-5xl mb-2">{product.icon}</div>
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mt-1">{product.description}</p>
      </div>

      {/* Pricing */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          {/* Original price (crossed out if discount) */}
          {hasDiscount && (
            <span className="text-gray-500 text-lg line-through">
              {originalPrice} {product.unit}
            </span>
          )}

          {/* Current price */}
          <span className={`text-2xl font-bold transition-colors duration-300 ${
            hasDiscount ? 'text-green-400' : 'text-white'
          }`}>
            {currentPrice} {product.unit}
          </span>
        </div>

        {/* Savings indicator */}
        {hasDiscount && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-400 text-sm font-semibold"
          >
            Экономия: {savings.toFixed(2)} byn
          </motion.div>
        )}

        {/* Mode indicator */}
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
          currentMode === 'corporate'
            ? 'bg-purple-500/20 text-purple-400 border border-purple-400/40'
            : 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/40'
        }`}>
          {currentMode === 'corporate' ? '🏢 B2B тариф' : '👤 Стандарт'}
        </div>
      </div>

      {/* Buy button */}
      <button className="w-full btn-primary py-3 text-center relative z-10 group-hover:shadow-lg group-hover:shadow-cyan-400/25 transition-all duration-300">
        <span className="flex items-center justify-center space-x-2">
          <span>Купить сейчас</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </span>
      </button>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400/50 rounded-xl transition-all duration-300"></div>

      {/* Pulse effect for discounted items */}
      {hasDiscount && (
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-xl"
        />
      )}
    </motion.div>
  );
};

export default ProductCard;
