let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

export function setMuted(value: boolean) {
  muted = value;
}

export function isMuted() {
  return muted;
}

export function playBlip(freq = 440, duration = 0.06) {
  if (muted) return;
  const audioCtx = getCtx();
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // autoplay restrictions or unsupported browser — fail silently
  }
}

export function playHover() {
  playBlip(880, 0.04);
}

export function playConfirm() {
  playBlip(523.25, 0.08);
  setTimeout(() => playBlip(783.99, 0.1), 70);
}
