import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useCoin } from '../contexts/CoinContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const { FiStar, FiGift, FiDollarSign, FiClock, FiCheck, FiX, FiTrendingUp } = FiIcons;

const WalletPage = () => {
  const { coinBalance, transactions, spendCoins } = useCoin();
  const [selectedReward, setSelectedReward] = useState(null);
  const [showRedeemModal, setShowRedeemModal] = useState(false);

  const rewards = [
    {
      id: 'google-play-50',
      name: 'Google Play Gift Card',
      value: '₹50',
      coins: 100,
      description: 'Redeem for Google Play Store credit',
      icon: '🎮',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'google-play-100',
      name: 'Google Play Gift Card',
      value: '₹100',
      coins: 200,
      description: 'Redeem for Google Play Store credit',
      icon: '🎮',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'google-play-250',
      name: 'Google Play Gift Card',
      value: '₹250',
      coins: 500,
      description: 'Redeem for Google Play Store credit',
      icon: '🎮',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'upi-50',
      name: 'UPI Cash',
      value: '₹50',
      coins: 120,
      description: 'Direct transfer to your UPI ID',
      icon: '💰',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'upi-100',
      name: 'UPI Cash',
      value: '₹100',
      coins: 240,
      description: 'Direct transfer to your UPI ID',
      icon: '💰',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'upi-250',
      name: 'UPI Cash',
      value: '₹250',
      coins: 600,
      description: 'Direct transfer to your UPI ID',
      icon: '💰',
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const handleRedeem = (reward) => {
    setSelectedReward(reward);
    setShowRedeemModal(true);
  };

  const confirmRedeem = () => {
    if (selectedReward && spendCoins(selectedReward.coins, `Redeemed ${selectedReward.name} (${selectedReward.value})`)) {
      setShowRedeemModal(false);
      setSelectedReward(null);
      // In a real app, you would process the redemption here
      toast.success('Redemption successful! You will receive your reward within 24 hours.');
    }
  };

  const earnedTransactions = transactions.filter(t => t.type === 'earned');
  const spentTransactions = transactions.filter(t => t.type === 'spent');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Wallet
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Manage your coins and redeem rewards
          </p>
        </div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-8 text-white mb-8 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Current Balance</h2>
              <div className="flex items-center space-x-2">
                <span className="text-4xl">🪙</span>
                <span className="text-4xl font-bold">{coinBalance.toLocaleString()}</span>
              </div>
              <p className="text-primary-100 mt-2">
                Keep using tools to earn more coins!
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-primary-100 mb-1">Total Earned</div>
              <div className="text-xl font-semibold">
                {earnedTransactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()} coins
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rewards Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Available Rewards
            </h2>
            <SafeIcon icon={FiGift} className="w-6 h-6 text-gray-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className={`h-24 bg-gradient-to-r ${reward.color} flex items-center justify-center`}>
                  <span className="text-4xl">{reward.icon}</span>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {reward.name}
                  </h3>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {reward.value}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {reward.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-accent-600 dark:text-accent-400">🪙</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {reward.coins}
                      </span>
                    </div>
                    <div className={`text-sm ${
                      coinBalance >= reward.coins 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {coinBalance >= reward.coins ? 'Available' : 'Insufficient coins'}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={coinBalance < reward.coins}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      coinBalance >= reward.coins
                        ? `bg-gradient-to-r ${reward.color} text-white hover:opacity-90`
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Redeem
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Earnings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Earnings
              </h3>
              <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-green-500" />
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {earnedTransactions.slice(0, 10).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                      <span className="text-sm">🪙</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {format(new Date(transaction.date), 'MMM dd, HH:mm')}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    +{transaction.amount}
                  </span>
                </div>
              ))}
              
              {earnedTransactions.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No earnings yet. Start using tools to earn coins!
                </div>
              )}
            </div>
          </motion.div>

          {/* Redemptions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Redemption History
              </h3>
              <SafeIcon icon={FiGift} className="w-5 h-5 text-purple-500" />
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {spentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
                      <span className="text-sm">🎁</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {format(new Date(transaction.date), 'MMM dd, HH:mm')}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    -{transaction.amount}
                  </span>
                </div>
              ))}
              
              {spentTransactions.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No redemptions yet. Start redeeming your coins!
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Redeem Confirmation Modal */}
        {showRedeemModal && selectedReward && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">{selectedReward.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Confirm Redemption
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Are you sure you want to redeem {selectedReward.coins} coins for {selectedReward.name} ({selectedReward.value})?
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowRedeemModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRedeem}
                  className={`flex-1 px-4 py-2 bg-gradient-to-r ${selectedReward.color} text-white rounded-lg hover:opacity-90 transition-opacity`}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;