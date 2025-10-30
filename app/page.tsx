import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// ethers import is kept for future functionality but not used in the current version's core logic
import { ethers } from "ethers";

// A utility component to display notifications instead of using alert()
const Notification = ({ message, type, onClose }) => {
  const baseClasses = "fixed bottom-5 right-5 p-4 rounded-xl shadow-2xl z-50 text-white font-semibold flex items-center gap-3";
  let colorClasses = "";

  switch (type) {
    case 'success':
      colorClasses = "bg-green-600 border border-green-400";
      break;
    case 'error':
      colorClasses = "bg-red-600 border border-red-400";
      break;
    case 'info':
    default:
      colorClasses = "bg-blue-600 border border-blue-400";
      break;
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 4000); // Notification disappears after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <motion.div
      className={`${baseClasses} ${colorClasses}`}
      initial={{ opacity: 0, y: 50, x: 50 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 50, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-bold text-lg leading-none">&times;</button>
    </motion.div>
  );
};

// Main App Component
const App = () => {
  // State for inputs
  const [bnbAmount, setBnbAmount] = useState("");
  const [ocosAmount, setOcosAmount] = useState("");
  // State for notifications
  const [notification, setNotification] = useState({ message: '', type: '' });

  const OCOS_PRICE = 47; // stable 47 USD

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  const clearNotification = () => {
    setNotification({ message: '', type: '' });
  };

  // The connection/transaction functions remain placeholders as requested
  const handleConnectWallet = async () => {
      showNotification("Wallet connection logic would go here. (Ethers connection simulation)", 'info');
  };

  const handleBuy = async () => {
    if (!bnbAmount || parseFloat(bnbAmount) <= 0) {
        showNotification("Please enter a valid BNB amount to buy.", 'error');
        return;
    }
    // Connect wallet & call buyWithBNB
    // The actual transaction logic using 'ethers' would be here
    showNotification(`Buying OCOS with ${bnbAmount} BNB... Transaction initiated.`, 'success');
    setBnbAmount("");
  };

  const handleSell = async () => {
    if (!ocosAmount || parseFloat(ocosAmount) <= 0) {
        showNotification("Please enter a valid OCOS amount to sell.", 'error');
        return;
    }
    // The actual transaction logic to sell OCOS would be here
    showNotification(`Selling ${ocosAmount} OCOS... Transaction initiated.`, 'success');
    setOcosAmount("");
  };

  const handleConvert = (coinName, coinPrice) => {
    const ocosValue = (coinPrice / OCOS_PRICE).toFixed(4);
    showNotification(`${coinName} (${coinPrice} USD) = ${ocosValue} OCOS`, 'info');
  };

  const coins = [
    { name: "BTC", price: 110139 },
    { name: "ETH", price: 3897 },
    { name: "BNB", price: 590 },
    { name: "AVAX", price: 42 },
    { name: "MATIC", price: 0.76 },
    { name: "TRX", price: 0.13 },
    { name: "APT", price: 8.41 },
    { name: "SOL", price: 187 },
    { name: "DOT", price: 6.75 },
    { name: "ARB", price: 0.98 },
    { name: "OP", price: 1.89 },
    { name: "BASE", price: 1.00 },
    { name: "NEAR", price: 4.52 },
    { name: "SUI", price: 1.24 },
    { name: "ADA", price: 0.68 },
    { name: "FTM", price: 0.52 },
    { name: "EGLD", price: 42.3 },
    { name: "ICP", price: 9.82 },
    { name: "FIL", price: 4.87 },
    { name: "TON", price: 6.43 },
    { name: "XDC", price: 0.048 }
  ];

  const InputField = ({ value, onChange, placeholder, icon, color }) => (
    <div className="relative">
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-4 pl-12 rounded-lg bg-zinc-800/50 border border-zinc-700 focus:border-${color}-500 transition duration-200 text-white font-mono text-lg outline-none shadow-inner`}
        min="0"
        step="any"
      />
      <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-${color}-400 text-xl font-bold`}>
        {icon}
      </span>
    </div>
  );

  const Card = ({ children, title, colorClass, icon }) => (
    <motion.div
      className={`bg-zinc-900/80 backdrop-blur-md p-6 rounded-3xl w-full max-w-sm border-t-4 ${colorClass} shadow-2xl transition hover:shadow-yellow-500/10`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <h2 className="text-2xl font-extrabold mb-5 flex items-center justify-between">
        <span className="text-zinc-100">{icon} {title}</span>
        <span className="text-sm font-medium text-zinc-400">Stable: $47</span>
      </h2>
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black/95 bg-cover bg-center text-white flex flex-col items-center pt-10 pb-16 font-inter">
      {/* Header/Title Section */}
      <header className="w-full max-w-4xl flex justify-between items-center mb-10 px-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent tracking-tighter"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          OCOS BEP-20 Exchange
        </motion.h1>
        <button 
            onClick={handleConnectWallet}
            className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-black font-bold rounded-full transition duration-300 shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105"
        >
            Connect Wallet
        </button>
      </header>

      {/* Main Trade Cards */}
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-4xl justify-center mb-16 px-4">
        {/* Buy Card */}
        <Card title="Buy OCOS" colorClass="border-yellow-500" icon="🚀">
          <form onSubmit={(e) => { e.preventDefault(); handleBuy(); }} className="flex flex-col gap-6">
            <InputField
              value={bnbAmount}
              onChange={(e) => setBnbAmount(e.target.value)}
              placeholder="0.00 BNB"
              icon="BNB"
              color="yellow"
            />
            <button 
              type="submit"
              className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 text-black font-extrabold rounded-xl transition duration-300 transform hover:-translate-y-0.5 shadow-xl shadow-yellow-800/50"
            >
              <span className="text-lg">Execute Buy Order</span>
            </button>
          </form>
        </Card>

        {/* Sell Card */}
        <Card title="Sell OCOS" colorClass="border-red-500" icon="🎯">
          <form onSubmit={(e) => { e.preventDefault(); handleSell(); }} className="flex flex-col gap-6">
            <InputField
              value={ocosAmount}
              onChange={(e) => setOcosAmount(e.target.value)}
              placeholder="0.00 OCOS"
              icon="OCOS"
              color="red"
            />
            <button 
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl transition duration-300 transform hover:-translate-y-0.5 shadow-xl shadow-red-800/50"
            >
              <span className="text-lg">Execute Sell Order</span>
            </button>
          </form>
        </Card>
      </div>

      {/* Coin Conversion Grid */}
      <motion.div 
        className="w-full max-w-6xl px-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-zinc-200 border-b border-zinc-700 pb-3">
          Swap Price Calculator <span className="text-yellow-400">(21 Native Coins)</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-8 gap-4">
          {coins.map((coin, i) => (
            <motion.button
              key={i}
              onClick={() => handleConvert(coin.name, coin.price)}
              className="bg-zinc-900/90 hover:bg-yellow-600/20 border border-zinc-700 rounded-xl p-4 text-center transition duration-200 flex flex-col items-center justify-center space-y-1 shadow-md hover:border-yellow-500"
              whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(252, 211, 77, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl font-bold text-yellow-400">{coin.name}</div>
              <div className="text-xs text-zinc-400 font-mono">${coin.price.toLocaleString()} USD</div>
              <div className="text-xs text-zinc-500 mt-1">Click to Convert to OCOS</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-16 text-sm text-zinc-500 w-full max-w-4xl border-t border-zinc-800 pt-4 text-center px-4">
        <p>
          OCOS Contract (BSC): <code className="text-yellow-400 bg-zinc-800 p-1 rounded font-mono text-sm tracking-wider select-all">0x58B8d54F3aCF8F6384803b63278C45A7ec08aa15</code>
        </p>
        <p className="mt-2 text-xs text-zinc-600">Premium BEP-20 Exchange Interface - Securely powered by CertiK protocols.</p>
      </footer>

      {/* Notification Display */}
      <AnimatePresence>
        {notification.message && (
          <Notification 
            message={notification.message} 
            type={notification.type} 
            onClose={clearNotification} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
