// ==============================================
// 9. components/dashboard/StatsCard.jsx
// ==============================================
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  gradient = false,
  delay = 0 
}) => {
  const [count, setCount] = React.useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const target = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;
    const duration = 1000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        clearInterval(timer);
        setCount(target);
      } else {
        setCount(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const displayValue = typeof value === 'string' && value.includes('$') 
    ? `$${count.toLocaleString()}`
    : count.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`stat-card ${gradient ? 'gradient-card text-white' : 'bg-white'}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${gradient ? 'text-white/80' : 'text-gray-500'}`}>
            {title}
          </p>
          <p className={`text-3xl font-bold mt-2 ${gradient ? 'text-white' : 'text-gray-900'}`}>
            {displayValue}
          </p>
          {change && (
            <p className={`text-xs font-medium mt-2 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
            </p>
          )}
        </div>
        <div className={`p-4 rounded-2xl ${gradient ? 'bg-white/20' : 'bg-purple-50'}`}>
          <Icon className={`w-6 h-6 ${gradient ? 'text-white' : 'text-purple-600'}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;