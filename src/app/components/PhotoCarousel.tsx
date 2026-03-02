import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import cam1 from '../../assets/pictures/cam1.jpeg';
import cam2 from '../../assets/pictures/cam2.jpeg';
import cam3 from '../../assets/pictures/cam3.jpeg';
interface PhotoCarouselProps {
  onClose: () => void;
}

export function PhotoCarousel({ onClose }: PhotoCarouselProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const photos = [
  {
    url: cam1,
    caption: "A distant fire of hope"
  },
  {
    url: cam2,
    caption: "Croissant"
  },
  {
    url: cam3,
    caption: "Through the Lens"
  }
];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [photos.length]);

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-[#f5f1e8] p-6 max-w-2xl w-full mx-4 shadow-2xl border-8 border-[#8b6f47] relative"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.4)' }}
      >
        <div className="relative aspect-[4/3] bg-[#e5d5b8] overflow-hidden mb-4">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentPhoto}
              src={photos[currentPhoto].url}
              alt={photos[currentPhoto].caption}
              className="w-full h-full object-cover"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>

        <div className="text-center mb-4">
          <p className="text-[#5a4a3a] italic" style={{ fontFamily: 'Georgia, serif' }}>
            {photos[currentPhoto].caption}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={prevPhoto}
            className="p-2 bg-[#8b6f47] text-white rounded-full hover:bg-[#7a5f37] transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhoto(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentPhoto ? 'bg-[#8b6f47]' : 'bg-[#d4c4a8]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextPhoto}
            className="p-2 bg-[#8b6f47] text-white rounded-full hover:bg-[#7a5f37] transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 text-[#7a6a5a] hover:text-[#5a4a3a] transition-colors"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}
