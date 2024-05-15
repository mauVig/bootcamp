import { motion } from 'framer-motion';

export default function TransitionRecip({ children }) {
  return (
    <motion.div
      initial={{ scale: .7 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  )
}
