import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useCoin } from '../contexts/CoinContext';
import { format } from 'date-fns';

const { FiTrendingUp, FiActivity, FiClock, FiStar, FiTarget, FiAward } = FiIcons;

const Dashboard = () => {
  const { user } = useAuth();
  const { coinBalance, transactions } = useCoin();

  const stats = [
    {
      label: 'Total Coins',
      value: coinBalance,
      icon: FiStar,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      label: 'Tools Used',
      value: user?.toolsUsed || 0,
      icon: FiActivity,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Total Earned',
      value: user?.totalEarnings || 0,
      icon: FiTrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      label: 'Rank',
      value: '#42',
      icon: FiAward,
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's your activity summary and earnings overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
              <SafeIcon icon={FiClock} className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'earned' 
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      }`}>
                        {transaction.type === 'earned' ? '🪙' : '💸'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {format(new Date(transaction.date), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                    </div>
                    <span className={`font-semibold ${
                      transaction.type === 'earned' 
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No recent activity. Start using tools to earn coins!
                </div>
              )}
            </div>
          </motion.div>

          {/* Progress & Goals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Progress & Goals
              </h2>
              <SafeIcon icon={FiTarget} className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-6">
              {/* Weekly Goal */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Weekly Goal (50 coins)
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.min(coinBalance, 50)}/50
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((coinBalance / 50) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Monthly Challenge */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Monthly Challenge (200 coins)
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.min(user?.totalEarnings || 0, 200)}/200
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-accent-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(((user?.totalEarnings || 0) / 200) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Achievements */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Recent Achievements
                </h3>
                <div className="space-y-2">
                  {(user?.toolsUsed || 0) >= 1 && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-yellow-500">🏆</span>
                      <span>First Tool Used</span>
                    </div>
                  )}
                  {(user?.totalEarnings || 0) >= 10 && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-yellow-500">🎖️</span>
                      <span>Coin Collector</span>
                    </div>
                  )}
                  {(user?.toolsUsed || 0) >= 5 && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-blue-500">💎</span>
                      <span>Power User</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white"
        >
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="#/tools"
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors text-center"
            >
              <SafeIcon icon={FiActivity} className="w-6 h-6 mx-auto mb-2" />
              <span className="block text-sm font-medium">Use Tools</span>
            </a>
            <a
              href="#/wallet"
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors text-center"
            >
              <SafeIcon icon={FiStar} className="w-6 h-6 mx-auto mb-2" />
              <span className="block text-sm font-medium">Redeem Coins</span>
            </a>
            <a
              href="#/profile"
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors text-center"
            >
              <SafeIcon icon={FiAward} className="w-6 h-6 mx-auto mb-2" />
              <span className="block text-sm font-medium">View Profile</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;