import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroMetrics from './HeroMetrics';
import ClientDistribution from './ClientDistribution';
import LTVComparison from './LTVComparison';
import CrossSellPatterns from './CrossSellPatterns';
import LoyaltyStats from './LoyaltyStats';
import KYCQuality from './KYCQuality';
import LiveMap from './LiveMap';

const Tab3Analytics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch metrics
    const fetchMetrics = async () => {
      try {
        // In real app, this would be an API call
        const response = await fetch('/api/metrics');
        if (!response.ok) {
          throw new Error('Failed to fetch metrics');
        }
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.warn('API call failed, using mock data:', error);
        // Use mock data if API fails
        setMetrics({
          heroMetrics: {
            ctcCoverage: { value: 267, label: 'Пользователей с двойной ролью', percentage: 21.4, icon: '👥' },
            synergyGrowth: { value: 500, label: 'Увеличение LTV по сравнению с B2C', percentage: 500, icon: '📈' },
            additionalRevenue: { value: 1600000, label: 'Выручка в месяц от C-T-C сегмента', percentage: 45, icon: '💰' }
          },
          clientDistribution: {
            b2cOnly: { count: 856, percentage: 68.6, color: '#06b6d4', avgLtv: 12000 },
            b2bOnly: { count: 124, percentage: 9.9, color: '#f97316', avgLtv: 54000 },
            ctc: { count: 267, percentage: 21.4, color: '#a855f7', avgLtv: 72000 }
          },
          ltvComparison: {
            b2cOnly: { avgLtv: 12000, transactionsPerMonth: 9, activeProducts: 2, redemptionRate: 34 },
            b2bOnly: { avgLtv: 54000, transactionsPerMonth: 22, activeProducts: 4, redemptionRate: 12 },
            ctc: { avgLtv: 72000, transactionsPerMonth: 38, activeProducts: 6, redemptionRate: 65 }
          },
          crossSellPatterns: [
            {
              id: 'morning-coffee',
              title: 'Утренний Паттерн ☕',
              description: '67% C-T-C водителей покупают кофе в течение 15 минут после корпоративной заправки',
              badge: 'Высокая корреляция',
              chartData: [12, 18, 25, 32, 28, 35, 42, 38, 45, 52, 48, 55, 62, 58, 65, 70, 68, 72]
            },
            {
              id: 'lunch-pattern',
              title: 'Обеденный Паттерн 🍔',
              description: '43% заказывают еду в кафе АЗС во время дальних рейсов',
              comparison: 'против 8% у обычных B2C',
              badge: '+437% эффективность'
            },
            {
              id: 'weekend-wash',
              title: 'Мойка в Выходные 🚗',
              description: '78% C-T-C клиентов моют личные авто на рабочих АЗС',
              detail: 'Привычка к локации = лояльность',
              badge: 'Sticky эффект'
            },
            {
              id: 'evening-retail',
              title: 'Вечерний Ритейл 🛒',
              description: '54% покупают товары в магазине по дороге домой после смены',
              detail: 'Используют накопленные за день баллы',
              badge: 'Instant gratification'
            }
          ],
          loyaltyStats: {
            totalPoints: 1850000,
            b2cPoints: 124790,
            crossBonusPoints: 389124,
            ctcRedemptionRate: 65,
            b2cRedemptionRate: 34,
            improvement: 1.9
          },
          kycQuality: {
            b2cOnly: {
              filledAttributes: 3.2,
              totalAttributes: 20,
              percentage: 16,
              knownData: ['имя', 'email', 'телефон']
            },
            ctc: {
              filledAttributes: 18.7,
              totalAttributes: 20,
              percentage: 93,
              knownData: ['имя', 'email', 'телефон', 'маршруты', 'график работы', 'тип транспорта', 'паттерны покупок', 'предпочтения', 'контакты', 'адреса доставки']
            },
            personalizationResults: { recommendationAccuracy: 340, offerConversion: 210, clickThroughRate: 180 }
          },
          liveMapData: [
            {
              id: 'station-1',
              name: 'АЗС Минск-Восточная',
              crossPurchases: 145,
              activity: 'high',
              coordinates: { x: 320, y: 180 },
              coffeeAfterFuel: 97,
              storePurchases: 78,
              cafeOrders: 45
            },
            {
              id: 'station-2',
              name: 'АЗС Минск-Западная',
              crossPurchases: 89,
              activity: 'medium',
              coordinates: { x: 80, y: 200 },
              coffeeAfterFuel: 56,
              storePurchases: 45,
              cafeOrders: 23
            },
            {
              id: 'station-3',
              name: 'АЗС Брест-Центральная',
              crossPurchases: 67,
              activity: 'medium',
              coordinates: { x: 150, y: 280 },
              coffeeAfterFuel: 40,
              storePurchases: 34,
              cafeOrders: 18
            },
            {
              id: 'station-4',
              name: 'АЗС Гродно-Западная',
              crossPurchases: 45,
              activity: 'low',
              coordinates: { x: 200, y: 120 },
              coffeeAfterFuel: 25,
              storePurchases: 18,
              cafeOrders: 12
            },
            {
              id: 'station-5',
              name: 'АЗС Витебск-Северная',
              crossPurchases: 78,
              activity: 'medium',
              coordinates: { x: 280, y: 100 },
              coffeeAfterFuel: 52,
              storePurchases: 40,
              cafeOrders: 21
            },
            {
              id: 'station-6',
              name: 'АЗС Могилев-Центр',
              crossPurchases: 56,
              activity: 'low',
              coordinates: { x: 350, y: 250 },
              coffeeAfterFuel: 30,
              storePurchases: 25,
              cafeOrders: 15
            },
            {
              id: 'station-7',
              name: 'АЗС Гомель-Южная',
              crossPurchases: 92,
              activity: 'high',
              coordinates: { x: 180, y: 220 },
              coffeeAfterFuel: 65,
              storePurchases: 50,
              cafeOrders: 28
            },
            {
              id: 'station-8',
              name: 'АЗС МКАД-Запад',
              crossPurchases: 73,
              activity: 'medium',
              coordinates: { x: 120, y: 120 },
              coffeeAfterFuel: 38,
              storePurchases: 22,
              cafeOrders: 16
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Загрузка аналитики...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold gradient-text mb-2"
        >
          Аналитика Экосистемы C-T-C
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-cyan-400 text-lg"
        >
          Масштаб эффекта синергии на уровне всей экосистемы
        </motion.p>
      </div>

      {/* Hero Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <HeroMetrics data={metrics.heroMetrics} />
      </motion.div>

      {/* Client Distribution & LTV Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ClientDistribution data={metrics.clientDistribution} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <LTVComparison data={metrics.ltvComparison} />
        </motion.div>
      </div>

      {/* Cross-Sell Patterns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <CrossSellPatterns data={metrics.crossSellPatterns} />
      </motion.div>

      {/* Loyalty Stats & KYC Quality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <LoyaltyStats data={metrics.loyaltyStats} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <KYCQuality data={metrics.kycQuality} />
        </motion.div>
      </div>

      {/* Live Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <LiveMap data={metrics.liveMapData} />
      </motion.div>
    </div>
  );
};

export default Tab3Analytics;
