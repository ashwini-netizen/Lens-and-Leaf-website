/**
 * Lens & Leaf Audio Synthesizer
 * Uses Web Audio API to produce a mechanical camera shutter sound
 * Zero external MP3 downloads required, instant, crisp, and luxury feeling.
 */

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playShutterSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. First click: Shutter curtain open (high snappy frequency)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const filter1 = ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(2400, now);
    osc1.frequency.exponentialRampToValueAtTime(300, now + 0.035);

    filter1.type = 'highpass';
    filter1.frequency.setValueAtTime(1200, now);

    gain1.gain.setValueAtTime(0.28, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.045);

    // 2. Second click: Mirror / curtain close (warm mechanical thump at +65ms)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    const filter2 = ctx.createBiquadFilter();

    const t2 = now + 0.065;
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(950, t2);
    osc2.frequency.exponentialRampToValueAtTime(140, t2 + 0.045);

    filter2.type = 'bandpass';
    filter2.frequency.setValueAtTime(600, t2);
    filter2.Q.setValueAtTime(2, t2);

    gain2.gain.setValueAtTime(0.32, t2);
    gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.05);

    osc2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(t2);
    osc2.stop(t2 + 0.055);
  } catch (err) {
    // Graceful fallback if audio is not permitted
    console.debug('Audio play avoided:', err);
  }
}
