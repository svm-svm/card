import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface NotesPageProps {
  onClose: () => void;
}

export function NotesPage({ onClose }: NotesPageProps) {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('vintageNotes');
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    localStorage.setItem('vintageNotes', newNotes);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateX: -10 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateX: 10 }}
        className="bg-[#faf8f3] max-w-2xl w-full shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage: `repeating-linear-gradient(
            transparent,
            transparent 31px,
            #e8dcc8 31px,
            #e8dcc8 32px
          )`,
          paddingTop: '40px'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#e8dcc8] rounded-full transition-colors"
        >
          <X size={24} className="text-[#8b6f47]" />
        </button>

        <div className="px-12 py-8">
          <h2 
            className="text-center mb-8 text-[#5a4a3a]"
            style={{ 
              fontFamily: 'Georgia, serif',
              fontSize: '28px'
            }}
          >
            My Journal
          </h2>

          <textarea
            value={notes}
            onChange={handleNotesChange}
            placeholder="Write your thoughts here..."
            className="w-full h-96 bg-transparent border-none outline-none resize-none text-[#5a4a3a] placeholder:text-[#a89878]"
            style={{
              fontFamily: "'Dancing Script', cursive, Georgia, serif",
              fontSize: '20px',
              lineHeight: '32px',
              paddingTop: '4px'
            }}
          />
        </div>

        <div className="h-8 bg-gradient-to-b from-transparent to-[#e8dcc8]" />
      </motion.div>
    </motion.div>
  );
}
