import { motion } from 'framer-motion';

export default function Transitions({ children, direction = 'left' }) {
  const res =
    direction === 'left'
      ? leftToRight
      : direction === 'right'
      ? rightToLeft
      : leftToRight;

  return (
    <>
      <motion.div
        initial={res.initial}
        animate={res.animate}
        transition={res.transition}
      >
        {children}
      </motion.div>
    </>
  );
}

const rightToLeft = {
  initial: { translateX: 90, skew: 5, opacity: 0 },
  animate: { translateX: 0, skew: 0, opacity: 1 },
  transition: { duration: 2, ease: 'backOut' },
};
const leftToRight = {
  initial: { translateX: -90, skew: -5, opacity: 0 },
  animate: { ...rightToLeft.animate },
  transition: { ...rightToLeft.transition },
};
