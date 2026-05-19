import React, { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";

export function SoundToggle() {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("sound_muted");
      return saved === "true";
    } catch (e) {
      return false;
    }
  });

  const handleToggle = () => {
    const nextVal = !isMuted;
    setIsMuted(nextVal);
    localStorage.setItem("sound_muted", nextVal.toString());
    
    // Play transition click sound if unmuted
    if (!nextVal) {
      playSound("click", false);
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`fixed bottom-8 left-24 p-4 rounded-full shadow-lg transition-all z-[10000] border ${
        isMuted
          ? "bg-neutral-100 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600 border-neutral-200/50 dark:border-neutral-800"
          : "bg-[#0071e3] text-white border-transparent"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle Soundscapes"
      title={isMuted ? "Unmute Soundscapes" : "Mute Soundscapes"}
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </motion.button>
  );
}

// Global playSound helper for runtime synthesize soundscapes
export function playSound(type: 'click' | 'success' | 'error' | 'switch', forceMute?: boolean) {
  const isMuted = forceMute ?? (localStorage.getItem('sound_muted') === 'true');
  if (isMuted) return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();

    if (type === 'click') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.06);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.06);
    } else if (type === 'switch') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(450, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } else if (type === 'error') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } else if (type === 'success') {
      const playNote = (freq: number, startTime: number, duration: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.0, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };
      const now = audioCtx.currentTime;
      playNote(523.25, now, 0.3);       // C5
      playNote(659.25, now + 0.07, 0.3); // E5
      playNote(783.99, now + 0.14, 0.3); // G5
      playNote(1046.50, now + 0.21, 0.5); // C6
    }
  } catch (e) {
    console.warn('Audio Synthesis Error:', e);
  }
}
