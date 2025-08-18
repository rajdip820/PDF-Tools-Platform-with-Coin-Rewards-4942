import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useCoin } from '../contexts/CoinContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const { FiUser, FiMail, FiCalendar, FiEdit, FiSave, FiX, FiAward, FiTrendingUp } = FiIcons;

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { coinBalance, transactions } = useCoin();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const achievements = [
    {
      id: 'first-tool',
      name: 'First Steps',
      description: 'Used your first PDF tool',
      icon: '🎯',
      unlocked: (user?.toolsUsed || 0) >= 1,
      requirement: 'Use 1 tool'
    },
    {
      id: 'coin-collector',
      name: 'Coin Collector',
      description: 'Earned your first 10 coins',
      icon: '🪙',
      unlocked: (user?.totalEarnings || 0) >= 10,
      requirement: 'Earn 10 coins'
    },
    {
      id: 'power-user',
      name: 'Power User',
      description: 'Used 5 different tools',
      icon: '⚡',
      unlocked: (user?.toolsUsed || 0) >= 5,
      requirement: 'Use 5 tools'
    },
    {
      id: 'coin-master',
      name: 'Coin Master',
      description: 'Earned 100 coins',
      icon: '👑',
      unlocked: (user?.totalEarnings || 0) >= 100,
      requirement: 'Earn 100 coins'
    },
    {
      id: 'daily-user',
      name: 'Daily User',
      description: 'Used tools for 7 days',
      icon: '📅',
      unlocked: false, // This would be calculated based on usage days
      requirement: 'Use tools for 7 days'
    },
    {
      id: 'redeemer',
      name: 'First Redemption',
      description: 'Redeemed your first reward',
      icon: '🎁',
      unlocked: transactions.some(t => t.type === 'spent'),
      requirement: 'Redeem 1 reward'
    }
  ];

  const stats = [
    {
      label: 'Member Since',
      value: user?.joinDate ? format(new Date(user.joinDate), 'MMM yyyy') : 'N/A',
      icon: FiCalendar
    },
    {
      label: 'Tools Used',
      value: user?.toolsUsed || 0,
      icon: FiTrendingUp
    },
    {
      label: 'Total Earned',
      value: `${user?.totalEarnings || 0} coins`,
      icon: FiAward
    },
    {
      label: 'Current Balance',
      value: `${coinBalance} coins`,
      icon: FiAward
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Profile
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Manage your account and view your achievements
          </p>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Profile Information
            </h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiEdit} className="w-4 h-4" />
                <span>Edit</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiSave} className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({ name: user?.name || '', email: user?.email || '' });
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiX} className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-6">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-24 h-24 rounded-full border-4 border-primary-200 dark:border-primary-800"
            />
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user?.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 flex items-center space-x-2">
                    <SafeIcon icon={FiMail} className="w-4 h-4" />
                    <span>{user?.email}</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 flex items-center space-x-2">
                    <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                    <span>
                      Member since {user?.joinDate ? format(new Date(user.joinDate), 'MMMM yyyy') : 'N/A'}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 text-center"
            >
              <SafeIcon icon={stat.icon} className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Achievements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border-2 transition-all ${
                  achievement.unlocked
                    ? 'border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'
                }`}
              >
                <div className="text-center">
                  <div className={`text-4xl mb-3 ${
                    achievement.unlocked ? '' : 'grayscale opacity-50'
                  }`}>
                    {achievement.icon}
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    achievement.unlocked 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className={`text-sm mb-3 ${
                    achievement.unlocked 
                      ? 'text-gray-600 dark:text-gray-300' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                  <div className={`text-xs px-3 py-1 rounded-full inline-block ${
                    achievement.unlocked
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {achievement.unlocked ? 'Unlocked' : achievement.requirement}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;