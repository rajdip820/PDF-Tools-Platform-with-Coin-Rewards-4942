import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CoinContext = createContext();

export const useCoin = () => {
  const context = useContext(CoinContext);
  if (!context) {
    throw new Error('useCoin must be used within a CoinProvider');
  }
  return context;
};

export const CoinProvider = ({ children }) => {
  const { user, updateUser } = useAuth();
  const [coinBalance, setCoinBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user) {
      const savedCoins = localStorage.getItem(`pdftools_coins_${user.id}`);
      const savedTransactions = localStorage.getItem(`pdftools_transactions_${user.id}`);
      
      if (savedCoins) {
        setCoinBalance(parseInt(savedCoins));
      }
      
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      }
    } else {
      setCoinBalance(0);
      setTransactions([]);
    }
  }, [user]);

  const saveData = (coins, trans) => {
    if (user) {
      localStorage.setItem(`pdftools_coins_${user.id}`, coins.toString());
      localStorage.setItem(`pdftools_transactions_${user.id}`, JSON.stringify(trans));
    }
  };

  const earnCoins = (amount, toolName) => {
    if (!user) return;

    const newBalance = coinBalance + amount;
    const newTransaction = {
      id: Date.now(),
      type: 'earned',
      amount,
      description: `Used ${toolName}`,
      date: new Date().toISOString()
    };

    const newTransactions = [newTransaction, ...transactions];
    
    setCoinBalance(newBalance);
    setTransactions(newTransactions);
    saveData(newBalance, newTransactions);
    
    // Update user stats
    updateUser({
      totalEarnings: (user.totalEarnings || 0) + amount,
      toolsUsed: (user.toolsUsed || 0) + 1
    });

    toast.success(`🪙 Earned ${amount} coins for using ${toolName}!`);
  };

  const spendCoins = (amount, description) => {
    if (!user || coinBalance < amount) {
      toast.error('Insufficient coin balance!');
      return false;
    }

    const newBalance = coinBalance - amount;
    const newTransaction = {
      id: Date.now(),
      type: 'spent',
      amount,
      description,
      date: new Date().toISOString()
    };

    const newTransactions = [newTransaction, ...transactions];
    
    setCoinBalance(newBalance);
    setTransactions(newTransactions);
    saveData(newBalance, newTransactions);
    
    toast.success(`Successfully redeemed ${amount} coins!`);
    return true;
  };

  const value = {
    coinBalance,
    transactions,
    earnCoins,
    spendCoins
  };

  return (
    <CoinContext.Provider value={value}>
      {children}
    </CoinContext.Provider>
  );
};