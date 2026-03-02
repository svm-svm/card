import { motion } from 'motion/react';
import { Music } from 'lucide-react';

interface Song {
  title: string;
  artist: string;
  url: string;
}

interface RecordPlayerProps {
  onClose: () => void;
  songs: Song[];
  selectedSong: number | null;
  isPlaying: boolean;
  onSongSelect: (index: number) => void;
  onTogglePlayPause: () => void;
  onStop: () => void;   // 👈 added
}

export function RecordPlayer({
  onClose,
  songs,
  selectedSong,
  isPlaying,
  onSongSelect,
  onTogglePlayPause,
  onStop
}: RecordPlayerProps) {

  const handleClose = () => {
    onStop();       // stop music when closing
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-[#f5f1e8] rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl border-4 border-[#8b6f47]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className="text-center mb-6"
          style={{ fontFamily: 'Georgia, serif', color: '#5a4a3a' }}
        >
          Choose Your Melody
        </h2>

        {/* ALWAYS SHOW SONG LIST (Better UX) */}
        <div className="space-y-3 mb-6">
          {songs.map((song, index) => (
            <button
              key={index}
              onClick={() => {
                if (selectedSong === index) {
                  // reselect same song → reset cleanly
                  onStop();
                  setTimeout(() => onSongSelect(index), 50);
                } else {
                  onSongSelect(index);
                }
              }}
              className={`w-full p-3 rounded-md transition-colors border-2 
                ${selectedSong === index
                  ? 'bg-[#c4b498] border-[#5a4a3a]'
                  : 'bg-[#d4c4a8] border-[#8b6f47] hover:bg-[#c4b498]'
                }`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <div className="font-semibold text-[#5a4a3a]">
                {song.title}
              </div>
              <div className="text-sm text-[#7a6a5a]">
                {song.artist}
              </div>
            </button>
          ))}
        </div>

        {/* CURRENTLY PLAYING SECTION */}
        {selectedSong !== null && (
          <div className="text-center">

            <div className="mb-4">
              <h3
                className="font-semibold text-[#5a4a3a]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Now Playing
              </h3>
            </div>

            {/* Animated Music Icons */}
            <div className="flex justify-center gap-2 mb-4 h-10">
              {isPlaying &&
                [...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [-10, -20, -10] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  >
                    <Music className="text-[#8b6f47]" size={22} />
                  </motion.div>
                ))}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-3">
              <button
                onClick={onTogglePlayPause}
                className="px-5 py-2 bg-[#8b6f47] text-white rounded-md hover:bg-[#7a5f37]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>

              <button
                onClick={onStop}
                className="px-5 py-2 bg-[#b35d5d] text-white rounded-md hover:bg-[#9e4f4f]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Stop
              </button>
            </div>
          </div>
        )}

        {/* Close */}
        <button
          onClick={handleClose}
          className="mt-6 w-full py-2 text-[#7a6a5a] hover:text-[#5a4a3a]"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}