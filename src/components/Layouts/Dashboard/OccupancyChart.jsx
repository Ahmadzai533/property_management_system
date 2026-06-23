// ==============================================
// 11. components/dashboard/OccupancyChart.jsx
// ==============================================

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { property: 'Riverside', occupancy: 95 },
  { property: 'Greenwood', occupancy: 88 },
  { property: 'Lakeview', occupancy: 76 },
  { property: 'Hilltop', occupancy: 92 },
  { property: 'Maple', occupancy: 85 },
  { property: 'Oakwood', occupancy: 70 },
];

const OccupancyChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Property Occupancy</h3>
          <p className="text-sm text-gray-500">Current occupancy rates</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="property" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              border: 'none',
            }}
          />
          <Bar 
            dataKey="occupancy" 
            fill="#8B5CF6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default OccupancyChart;