import { motion } from 'framer-motion'

const LoadingSkeleton = ({ className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      className={`bg-slate-200 rounded-xl animate-pulse ${className}`}
    />
  )
}

export default LoadingSkeleton