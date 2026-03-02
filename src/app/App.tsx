import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { RecordPlayer } from './components/RecordPlayer';
import { PhotoCarousel } from './components/PhotoCarousel';
import { NotesPage } from './components/NotesPage';
import { ClockMessage } from './components/ClockMessage';
import { HangingPhotos } from './components/HangingPhotos';

import vintageRoomImage from '../assets/ChatGPT Image Mar 2, 2026, 12_11_54 PM.png';
import song1 from '../assets/music/extracted-audio (1).mp3';
import song2 from '../assets/music/extracted-audio.mp3';

export default function App() {

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedSong, setSelectedSong] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [noteSeed, setNoteSeed] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const songs = [
    { title: "O.K.", artist: "To fall asleep", url: song1 },
    { title: "Aranara", artist: "To feel good", url: song2 }
  ];

  /* ---------------- AUDIO CONTROL ---------------- */

  const handleSongSelect = (index: number) => {

    // stop previous audio cleanly
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setSelectedSong(index);
    setIsPlaying(true);
    setNoteSeed(prev => prev + 1);

    setTimeout(() => {
      audioRef.current?.play();
    }, 100);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setSelectedSong(null);
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#f5ebe0]">

      {/* 🌙 Ambient Light Flicker */}
      <div className="absolute inset-0 pointer-events-none ambient-flicker" />

      {/* 📦 Intro Notification */}
      {showIntro && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#f5f1e8] shadow-xl px-6 py-4 rounded-lg border border-[#8b6f47] z-50">
          <div className="flex items-center justify-between gap-6">
            <p className="text-[#5a4a3a]">Happy Belated Birthday!Click on the record player, camera, pen, or clock to interact with this cozy space. Hope you have fun!</p>
            <button
              onClick={() => setShowIntro(false)}
              className="text-[#8b6f47] hover:text-[#5a4a3a]"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* FULLSCREEN IMAGE */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full">

          <img
            src={vintageRoomImage}
            alt="Cozy vintage room"
            className="absolute inset-0 w-full h-full object-contain"
          />

          {/* 🎵 Slow Floating Music Symbols */}
          {isPlaying && (
            <div key={noteSeed} className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-2xl text-[#8b6f47]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animation: `floatSlow 8s linear infinite`,
                    animationDelay: `${i * 1.5}s`
                  }}
                >
                  ♪
                </div>
              ))}
            </div>
          )}

          {/* ================= HOTSPOTS ================= */}

          {/* Record Player */}
          <button
            onClick={() => setActiveModal('record')}
            className="absolute top-[37%] right-[10%] w-[12%] h-[22%] group cursor-pointer"
          >
            <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-[#8b6f47] group-hover:animate-pulse" />
          </button>

          {/* Camera */}
          <button
            onClick={() => setActiveModal('camera')}
            className="absolute top-[60%] left-[23%] w-[8%] h-[10%] group cursor-pointer"
          >
            <div className="absolute inset-0 rounded border-2 border-transparent group-hover:border-[#8b6f47] group-hover:animate-pulse" />
          </button>

          {/* Pen */}
          <button
            onClick={() => setActiveModal('notes')}
            className="absolute top-[59%] left-[40%] w-[8%] h-[8%] group cursor-pointer"
          >
            <div className="absolute inset-0 rounded border-2 border-transparent group-hover:border-[#8b6f47] group-hover:animate-pulse" />
          </button>

          {/* Clock */}
          <button
            onClick={() => setActiveModal('clock')}
            className="absolute top-[0.5%] left-[48%] w-[10%] h-[20%] rounded-full group cursor-pointer"
          >
            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#8b6f47] group-hover:animate-pulse" />
          </button>

          {/* Hanging Photos */}
          <button
            onClick={() => setActiveModal('hanging')}
            className="absolute top-[24%] left-[50%] w-[10%] h-[10%] group cursor-pointer"
          >
            <div className="absolute inset-0 rounded border-2 border-transparent group-hover:border-[#8b6f47] group-hover:animate-pulse" />
          </button>

        </div>
      </div>

      {/* ================= MODALS ================= */}

      <AnimatePresence>
        {activeModal === 'record' && (
          <RecordPlayer
            onClose={() => setActiveModal(null)}
            songs={songs}
            selectedSong={selectedSong}
            isPlaying={isPlaying}
            onSongSelect={handleSongSelect}
            onTogglePlayPause={togglePlayPause}
            onStop={stopMusic}
          />
        )}

        {activeModal === 'camera' && <PhotoCarousel onClose={() => setActiveModal(null)} />}
        {activeModal === 'hanging' && <HangingPhotos onClose={() => setActiveModal(null)} />}
        {activeModal === 'notes' && <NotesPage onClose={() => setActiveModal(null)} />}
        {activeModal === 'clock' && <ClockMessage onClose={() => setActiveModal(null)} />}
      </AnimatePresence>

      {/* AUDIO */}
      {selectedSong !== null && (
        <audio
          ref={audioRef}
          src={songs[selectedSong].url}
          onEnded={stopMusic}
        />
      )}

    </div>
  );
}