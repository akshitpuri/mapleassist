import React, { useState, useEffect, useRef } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function Metronome() {
  const [bpm, setBpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beat, setBeat] = useState(0);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const playClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const startMetronome = () => {
    if (!isPlaying) {
      intervalRef.current = setInterval(() => {
        setBeat((prev) => prev + 1);
        playClick();
      }, (60 / bpm) * 1000);
      setIsPlaying(true);
    }
  };

  const stopMetronome = () => {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
    setBeat(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <CalculatorLayout title="🎼 Metronome">
      <Helmet>
        <title>Metronome – MapleAssist</title>
        <meta name="description" content="Practice rhythm and tempo with MapleAssist's metronome. Set BPM and stay in time with a clean, browser-based beat." />
        <meta name="keywords" content="metronome, bpm, beat tracker, mapleassist, rhythm tool, music practice" />
      </Helmet>

      <BackButton />

      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', color: '#444' }}>
        Set your desired tempo in beats per minute (BPM) and start the metronome to hear a steady click. Ideal for musicians, dancers, and timing drills.
      </p>

      {/* 🎚 BPM Control */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px', margin: '0 auto', marginBottom: '20px' }}>
        <label>
          BPM: {bpm}
          <input
            type="range"
            min="30"
            max="240"
            value={bpm}
            onChange={(e) => setBpm(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </label>

        <div style={{ display: 'flex', gap: '12px' }}>
          {!isPlaying ? (
            <button
              onClick={startMetronome}
              style={{ padding: '10px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', flex: 1 }}
            >
              Start
            </button>
          ) : (
            <button
              onClick={stopMetronome}
              style={{ padding: '10px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', flex: 1 }}
            >
              Stop
            </button>
          )}
        </div>
      </div>

      {/* 🔊 Audio Click */}
      <audio ref={audioRef} src="https://www.soundjay.com/button/beep-07.wav" preload="auto" />

      {/* 🧾 Beat Count */}
      {isPlaying && (
        <div style={{ textAlign: 'center', fontSize: '1.2rem', color: '#333' }}>
          Beat: {beat}
        </div>
      )}
    </CalculatorLayout>
  );
}