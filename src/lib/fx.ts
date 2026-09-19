// Juicy feedback: sound + confetti + screen shake

let audioCtx: AudioContext | null = null;
function ctx(): AudioContext {
  if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return audioCtx;
}

function beep(freq: number, duration: number, type: OscillatorType = "sine", vol = 0.15, when = 0) {
  try {
    const c = ctx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = vol;
    o.connect(g);
    g.connect(c.destination);
    const t = c.currentTime + when;
    o.start(t);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    o.stop(t + duration);
  } catch {
    /* ignore */
  }
}

export const sfx = {
  correct() {
    beep(523.25, 0.12, "triangle", 0.18, 0);
    beep(659.25, 0.12, "triangle", 0.18, 0.1);
    beep(783.99, 0.2, "triangle", 0.18, 0.2);
  },
  wrong() {
    beep(220, 0.18, "sawtooth", 0.12, 0);
    beep(180, 0.22, "sawtooth", 0.12, 0.12);
  },
  click() {
    beep(600, 0.05, "square", 0.06);
  },
  pop() {
    beep(880, 0.08, "sine", 0.12);
  },
  star() {
    beep(659, 0.1, "triangle", 0.15, 0);
    beep(988, 0.15, "triangle", 0.15, 0.09);
  },
  win() {
    [523, 659, 783, 1046].forEach((f, i) => beep(f, 0.25, "triangle", 0.18, i * 0.14));
  },
};

// Confetti / particle burst on a canvas overlay
interface Particle {
  x: number; y: number; vx: number; vy: number; life: number; max: number;
  color: string; size: number; rot: number; vr: number; shape: number;
}

const COLORS = ["#ffd54a", "#e8492b", "#ff9b3d", "#57b846", "#4aa3ff", "#ff5fa2"];

export function burst(x: number, y: number, count = 40) {
  let canvas = document.getElementById("fx-canvas") as HTMLCanvasElement | null;
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "fx-canvas";
    canvas.style.cssText =
      "position:fixed;inset:0;pointer-events:none;z-index:9999;";
    document.body.appendChild(canvas);
  }
  const c = canvas;
  const dpr = window.devicePixelRatio || 1;
  c.width = window.innerWidth * dpr;
  c.height = window.innerHeight * dpr;
  c.style.width = window.innerWidth + "px";
  c.style.height = window.innerHeight + "px";
  const g = c.getContext("2d")!;
  g.setTransform(dpr, 0, 0, dpr, 0, 0);

  const parts: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const ang = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 8;
    parts.push({
      x, y,
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed - 4,
      life: 0,
      max: 60 + Math.random() * 40,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 5 + Math.random() * 7,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      shape: Math.floor(Math.random() * 2),
    });
  }

  // add to global pool
  (window as any).__fxParts = (window as any).__fxParts || [];
  const pool: Particle[] = (window as any).__fxParts;
  pool.push(...parts);

  if ((window as any).__fxRunning) return;
  (window as any).__fxRunning = true;

  function frame() {
    g.clearRect(0, 0, c.width, c.height);
    const pool: Particle[] = (window as any).__fxParts;
    for (let i = pool.length - 1; i >= 0; i--) {
      const p = pool[i];
      p.life++;
      p.vy += 0.25;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      const alpha = 1 - p.life / p.max;
      if (p.life >= p.max) {
        pool.splice(i, 1);
        continue;
      }
      g.save();
      g.globalAlpha = Math.max(0, alpha);
      g.translate(p.x, p.y);
      g.rotate(p.rot);
      g.fillStyle = p.color;
      if (p.shape === 0) {
        g.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else {
        g.beginPath();
        g.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        g.fill();
      }
      g.restore();
    }
    if (pool.length > 0) {
      requestAnimationFrame(frame);
    } else {
      (window as any).__fxRunning = false;
      g.clearRect(0, 0, c.width, c.height);
    }
  }
  requestAnimationFrame(frame);
}

export function shake(el: HTMLElement | null) {
  if (!el) return;
  el.classList.remove("animate-shake");
  void el.offsetWidth; // reflow
  el.classList.add("animate-shake");
  setTimeout(() => el.classList.remove("animate-shake"), 500);
}
