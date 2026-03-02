import { motion } from 'motion/react';

interface ClockMessageProps {
  onClose: () => void;
}

export function ClockMessage({ onClose }: ClockMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="bg-[#f5f1e8] rounded-lg p-12 max-w-lg mx-4 shadow-2xl border-4 border-[#8b6f47] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[#5a4a3a] text-2xl italic"
          style={{ fontFamily: 'Georgia, serif', lineHeight: '1.6' }}
        >
          "Don't worry, time is frozen here, forever."
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onClose}
          className="mt-8 px-6 py-2 text-[#7a6a5a] hover:text-[#5a4a3a] transition-colors"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
