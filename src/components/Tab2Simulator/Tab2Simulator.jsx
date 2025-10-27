import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModeToggle from './ModeToggle';
import UserSidebar from './UserSidebar';
import ProductCatalog from './ProductCatalog';
import PurchaseModal from './PurchaseModal';

const Tab2Simulator = () => {
  const [currentMode, setCurrentMode] = useState('personal'); // 'personal' or 'corporate'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [userPoints, setUserPoints] = useState(247);
  const [transactions, setTransactions] = useState([]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setShowPurchaseModal(true);
  };

  const handlePurchase = (transactionData) => {
    // Update user points
    const pointsEarned = transactionData.pointsEarned || 0;
    const pointsSpent = transactionData.pointsSpent || 0;

    setUserPoints(prev => prev + pointsEarned - pointsSpent);

    // Add transaction to history
    const newTransaction = {
      id: Date.now(),
      ...transactionData,
      timestamp: new Date().toISOString()
    };

    setTransactions(prev => [newTransaction, ...prev.slice(0, 2)]); // Keep only last 3

    setShowPurchaseModal(false);
    setSelectedProduct(null);
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
          Интерактивный Симулятор C-T-C
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-cyan-400 text-lg"
        >
          Переключайте режимы и наблюдайте за изменением цен и баллов лояльности в белорусских рублях
        </motion.p>
      </div>

      {/* Mode Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ModeToggle
          currentMode={currentMode}
          onModeChange={setCurrentMode}
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-1"
        >
          <UserSidebar
            currentMode={currentMode}
            userPoints={userPoints}
            transactions={transactions}
          />
        </motion.div>

        {/* Product Catalog */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-3"
        >
          <ProductCatalog
            currentMode={currentMode}
            onProductSelect={handleProductSelect}
          />
        </motion.div>
      </div>

      {/* Purchase Modal */}
      <AnimatePresence>
        {showPurchaseModal && selectedProduct && (
          <PurchaseModal
            product={selectedProduct}
            currentMode={currentMode}
            userPoints={userPoints}
            onClose={() => {
              setShowPurchaseModal(false);
              setSelectedProduct(null);
            }}
            onPurchase={handlePurchase}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tab2Simulator;
