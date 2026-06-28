import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon: Icon,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-[#6D28D9] text-white hover:shadow-lg hover:shadow-[#6D28D9]/30 hover:bg-[#5B21B6]',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300',
    success: 'bg-emerald-500 text-white hover:shadow-lg hover:shadow-emerald-500/30 hover:bg-emerald-600',
    danger: 'bg-red-500 text-white hover:shadow-lg hover:shadow-red-500/30 hover:bg-red-600',
    warning: 'bg-amber-500 text-white hover:shadow-lg hover:shadow-amber-500/30 hover:bg-amber-600',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center gap-2 font-semibold rounded-xl transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.button>
  )
}

export default Button