import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const ProductCatalog = ({ currentMode, onProductSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('fuel');

  const categories = [
    { id: 'fuel', name: '⛽ Топливо', icon: '⛽' },
    { id: 'cafe', name: '☕ Кафе', icon: '☕' },
    { id: 'services', name: '🚗 Услуги', icon: '🚗' }
  ];

  const products = [
    // Топливо
    {
      id: 'fuel-92',
      category: 'fuel',
      name: 'АИ-92',
      icon: '⛽',
      personalPrice: 2.80,
      corporatePrice: 2.62,
      discount: 6.5,
      unit: 'byn/литр',
      description: 'Бензин АИ-92 стандарт'
    },
    {
      id: 'fuel-95',
      category: 'fuel',
      name: 'АИ-95',
      icon: '⛽',
      personalPrice: 3.10,
      corporatePrice: 2.90,
      discount: 6.5,
      unit: 'byn/литр',
      description: 'Бензин АИ-95 премиум'
    },
    {
      id: 'fuel-diesel',
      category: 'fuel',
      name: 'Дизель',
      icon: '⛽',
      personalPrice: 2.90,
      corporatePrice: 2.71,
      discount: 6.5,
      unit: 'byn/литр',
      description: 'Дизельное топливо'
    },

    // Кафе
    {
      id: 'coffee-espresso',
      category: 'cafe',
      name: 'Кофе Эспрессо',
      icon: '☕',
      personalPrice: 4.00,
      corporatePrice: 4.00,
      discount: 0,
      unit: 'byn',
      description: 'Классический эспрессо'
    },
    {
      id: 'coffee-latte',
      category: 'cafe',
      name: 'Кофе Латте',
      icon: '☕',
      personalPrice: 5.00,
      corporatePrice: 5.00,
      discount: 0,
      unit: 'byn',
      description: 'Нежный латте'
    },
    {
      id: 'sandwich',
      category: 'cafe',
      name: 'Сэндвич',
      icon: '🥪',
      personalPrice: 8.00,
      corporatePrice: 8.00,
      discount: 0,
      unit: 'byn',
      description: 'Свежий сэндвич'
    },
    {
      id: 'breakfast-combo',
      category: 'cafe',
      name: 'Комбо Завтрак',
      icon: '🍳',
      personalPrice: 15.00,
      corporatePrice: 15.00,
      discount: 0,
      unit: 'byn',
      description: 'Завтрак на любой вкус'
    },

    // Услуги
    {
      id: 'express-wash',
      category: 'services',
      name: 'Экспресс-мойка',
      icon: '🚗',
      personalPrice: 25.00,
      corporatePrice: 25.00,
      discount: 0,
      unit: 'byn',
      description: 'Быстрая мойка автомобиля'
    },
    {
      id: 'full-wash',
      category: 'services',
      name: 'Комплексная мойка',
      icon: '🚗',
      personalPrice: 35.00,
      corporatePrice: 35.00,
      discount: 0,
      unit: 'byn',
      description: 'Полная мойка с сушкой'
    },
    {
      id: 'tire-service',
      category: 'services',
      name: 'Шиномонтаж',
      icon: '🛠️',
      personalPrice: 80.00,
      corporatePrice: 80.00,
      discount: 0,
      unit: 'byn',
      description: 'Замена и ремонт шин'
    }
  ];

  const filteredProducts = products.filter(product => product.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="glass-card p-4">
        <div className="flex space-x-1 mb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`tab-button flex-1 py-3 px-4 text-center transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'active bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400'
                  : 'hover:bg-white/10'
              }`}
            >
              <span className="text-lg mr-2">{category.icon}</span>
              <span className="text-sm font-semibold">{category.name.split(' ')[1]}</span>
            </button>
          ))}
        </div>

        {/* Mode indicator */}
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${currentMode === 'personal' ? 'bg-cyan-400' : 'bg-gray-500'}`}></div>
            <span className={currentMode === 'personal' ? 'text-cyan-400 font-semibold' : 'text-gray-400'}>
              Личный: {products.filter(p => p.category === selectedCategory && p.discount === 0).length} товаров
            </span>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${currentMode === 'corporate' ? 'bg-purple-400' : 'bg-gray-500'}`}></div>
            <span className={currentMode === 'corporate' ? 'text-purple-400 font-semibold' : 'text-gray-400'}>
              Корпоративный: скидки до {Math.max(...products.filter(p => p.category === selectedCategory).map(p => p.discount))}%
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard
              product={product}
              currentMode={currentMode}
              onSelect={() => onProductSelect(product)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <div className="glass-card p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-bold text-gray-400 mb-2">Товары не найдены</h3>
          <p className="text-gray-500">Попробуйте выбрать другую категорию</p>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
