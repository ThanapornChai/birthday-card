// src/App.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const defaultMessage = `สุขสันต์วันเกิดนะคะ
ขอให้สุขภาพร่างกายแข็งแรง เงินทองไหลมาเทมา
ขอให้มีความสุขในทุก ๆ วัน
อยู่กับแม่กับน้องกับหนูไปนานๆนะคะ
รักป๊าที่สุดเลย ❤`;

const heartfeltNote = `สิ่งนี้หนูตั้งใจทำให้ป๊ามากๆ ถึงจะช้าหน่อยแต่ก็มานะ อิอิ 
ที่ผ่านมาหนูอยากขอบคุณป๊ามากที่ทำงานหนักและเหนื่อยเพื่อให้หนูมีอนาคตที่ดี ได้เรียนที่สูงๆ ขอบคุณป๊าที่คอยอยู่ข้างๆหนูเสมอและขอบคุณที่คอยสนับสนุนทุกอย่างที่หนูทำ
หนูรู้ว่าป๊ารักหนูมากๆ หนูรู้สึกโชคดีมากที่มีป๊าเป็นพ่อ
หนูขอกราบขอโทษที่บางครั้งหนูอาจจะทำให้ป๊าไม่สบายใจหรือไม่พอใจ
หนูคิดถึงป๊ามากๆ รักป๊ากับแม่ที่สุด

จากลูกสาว 💖`;

/* ---------- Confetti จากล่างขึ้นบน ---------- */
function fireBottomConfetti(duration = 900) {
  const end = Date.now() + duration;
  (function frame() {
    confetti({
      particleCount: 8,
      startVelocity: 55,
      spread: 80,
      angle: 90,
      origin: { x: Math.random() * 0.8 + 0.1, y: 1 },
      scalar: 1,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  confetti({ particleCount: 50, angle: 60, spread: 65, origin: { x: 0, y: 1 } });
  confetti({ particleCount: 50, angle: 120, spread: 65, origin: { x: 1, y: 1 } });
}

/* ---------- ปุ่มเพลงจาก YouTube (ไอคอนมินิมอล) ---------- */
function YouTubeMusicButton() {
  const videoId = "oLiMaEFN_bM"; // จากลิงก์ที่ให้มา
  const [on, setOn] = useState(false);
  return (
    <>
      {on && (
        <iframe
          className="fixed -z-10 opacity-0 w-[1px] h-[1px]"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3`}
          title="bg-music"
          allow="autoplay"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
      <button
        onClick={() => setOn(v => !v)}
        title={on ? "หยุดเพลง" : "เปิดเพลง"}
        aria-pressed={on}
        className="fixed bottom-5 right-5 z-50 grid h-10 w-10 place-items-center rounded-full border border-rose-300/70 bg-white/80 text-rose-700 shadow backdrop-blur transition-colors duration-200 hover:bg-rose-500 hover:text-white hover:border-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60"
      >
        ♫
      </button>
    </>
  );
}

/* ---------- ปุ่มคอนเฟตติ (ไอคอนมินิมอล) ---------- */
function ConfettiButton() {
  return (
    <button
      onClick={() => fireBottomConfetti(900)}
      title="ปล่อยคอนเฟตติ"
      className="fixed bottom-5 left-5 z-40 grid h-10 w-10 place-items-center rounded-full border border-rose-300/70 bg-white/80 text-rose-700 shadow backdrop-blur transition-colors duration-200 hover:bg-rose-500 hover:text-white hover:border-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60"
    >
      🎉
    </button>
  );
}

/* ---------- ปุ่มไปหน้าถัดไป / ปุ่มย้อนกลับ (ตรงกลางล่าง) ---------- */
function NextFab({ label = "ถัดไป →", onClick }: { label?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 rounded-full border border-rose-300/70 bg-white/80 px-5 py-2 text-sm text-rose-700 shadow backdrop-blur transition-colors duration-200 hover:bg-rose-500 hover:text-white hover:border-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60"
    >
      {label}
    </button>
  );
}

/* ---------- Gift Box (ไม่มี confetti ตอนเปิด) ---------- */
function GiftBox({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  const handleClick = () => {
    if (opened) return;
    setTimeout(() => onOpen(), 450); // จังหวะก่อนเปิดฝา
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="เปิดของขวัญ"
      onClick={handleClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick()}
      className="relative mx-auto w-72 select-none cursor-pointer sm:w-80 md:w-[28rem] outline-none"
      whileHover={{ rotate: -0.6, scale: 1.01 }}
      whileTap={{ scale: 0.98, rotate: 0.6 }}
    >
      {!opened && (
        <motion.span
          className="absolute -inset-10 -z-10 rounded-full bg-pink-300/25 blur-3xl"
          animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.65, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.6 }}
        />
      )}

      <div className="relative h-44 md:h-56 w-full rounded-xl bg-gradient-to-br from-rose-200 via-pink-200 to-amber-200 shadow-2xl ring-1 ring-rose-300/50">
        <div className="absolute inset-y-0 left-1/2 w-8 md:w-10 -translate-x-1/2 bg-gradient-to-b from-fuchsia-300 to-pink-400" />
        <div className="absolute top-1/2 h-8 md:h-10 w-full -translate-y-1/2 bg-gradient-to-r from-fuchsia-300 to-pink-400" />
        <div className="absolute -top-5 left-1/2 h-10 w-10 -translate-x-1/2 rotate-45 rounded-full bg-pink-300 shadow ring-1 ring-rose-300/70" />
        <div className="absolute -top-7 left-1/2 h-8 w-8 -translate-x-1/2 -rotate-12 rounded-full bg-pink-200 shadow ring-1 ring-rose-300/40" />
        <motion.div
          className="pointer-events-none absolute inset-0 -skew-x-12"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.65) 50%, rgba(255,255,255,0) 100%)",
            width: "40%",
          }}
          initial={{ x: "-160%" }}
          animate={{ x: ["-160%", "160%"] }}
          transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={false}
        animate={opened ? { y: -48, rotate: -18 } : { y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        style={{ transformOrigin: "50% 100%" }}
        className="absolute -top-10 md:-top-12 left-0 h-20 md:h-24 w-full rounded-xl bg-gradient-to-br from-rose-300 via-pink-300 to-amber-200 shadow-xl ring-1 ring-rose-300/60"
      >
        <div className="absolute inset-y-0 left-1/2 w-8 md:w-10 -translate-x-1/2 bg-gradient-to-b from-fuchsia-400 to-pink-500" />
      </motion.div>
    </motion.div>
  );
}

/* ---------- เค้ก (เทียนเดียว) ---------- */
function PastelDripCake({ lit, onBlow }: { lit: boolean; onBlow: () => void }) {
  const candleX = 180;
  return (
    <svg viewBox="0 0 360 220" preserveAspectRatio="xMidYMid meet" className="w-72 sm:w-96 md:w-[32rem] h-auto drop-shadow">
      <defs>
        <filter id="softShadow2" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#000" floodOpacity="0.15" />
        </filter>
        <linearGradient id="tierBottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd1dc" />
          <stop offset="100%" stopColor="#fecdd3" />
        </linearGradient>
        <linearGradient id="tierTop" x1="0" y="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe4e6" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        <radialGradient id="flameGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff7ae" />
          <stop offset="60%" stopColor="#fdba74" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.9" />
        </radialGradient>
      </defs>

      <ellipse cx="180" cy="200" rx="130" ry="14" fill="#e5e7eb" />

      <g filter="url(#softShadow2)">
        <rect x="70" y="120" width="220" height="70" rx="20" fill="url(#tierBottom)" stroke="#f9a8d4" strokeOpacity="0.3" />
        <path d="M70,135 C110,115 250,115 290,135 L290,150 C280,145 272,165 262,150 C252,135 238,165 228,150 C218,135 204,165 194,150 C184,135 170,165 160,150 C150,135 136,165 126,150 C116,135 98,165 90,150 C84,140 78,142 70,150 Z" fill="#ffe4e6" />
      </g>

      <g filter="url(#softShadow2)">
        <rect x="110" y="75" width="140" height="55" rx="18" fill="url(#tierTop)" stroke="#facc15" strokeOpacity="0.25" />
        <path d="M110,86 C140,66 220,66 250,86 L250,96 C242,94 236,104 230,96 C224,88 216,104 210,96 C204,88 196,104 190,96 C184,88 176,104 170,96 C164,88 156,104 150,96 C144,88 136,104 130,96 C124,88 118,98 110,96 Z" fill="#fff1f2" />
      </g>

      {/* เทียนเดียว */}
      <g transform={`translate(${candleX},48)`} style={{ cursor: lit ? "pointer" : "default" }} onClick={() => lit && onBlow()}>
        <rect x={-4} y={30} width="8" height="24" rx="2" fill="#fde68a" stroke="#f59e0b" strokeOpacity="0.4" />
        {lit && (
          <>
            <motion.path
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: [2, 0, 2], scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              d="M 0 18 C 5 10, 5 4, 0 0 C -5 4, -5 10, 0 18 Z"
              fill="url(#flameGrad)"
            />
            <rect x={-0.6} y={22} width={1.2} height={6} fill="#7c2d12" />
          </>
        )}
      </g>
    </svg>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [candleLit, setCandleLit] = useState(true);
  const [showLetter, setShowLetter] = useState(false);

  const openGift = () => {
    if (!opened) setOpened(true); // ไม่มี confetti ตอนเปิด
  };
  const blow = () => {
    if (candleLit) {
      setCandleLit(false);
      confetti({ particleCount: 20, spread: 45, origin: { y: 0.3 }, scalar: 0.9 });
    }
  };
  const relight = () => setCandleLit(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff2f4] via-[#fff7e3] to-[#ffeef9] text-slate-800">
      {/* ปุ่มลอย (มินิมอล) */}
      <YouTubeMusicButton />
      <ConfettiButton />
      {/* ปุ่มถัดไป/ย้อนกลับ — แสดงเฉพาะซีนที่เกี่ยวข้อง */}
      {!showLetter && opened && <NextFab onClick={() => setShowLetter(true)} />}
      {showLetter && <NextFab label="← ย้อนกลับ" onClick={() => setShowLetter(false)} />}

      <div className="mx-auto max-w-screen-xl px-6 py-14 md:py-20">
        <header className="mb-16 sm:mb-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-rose-600 via-pink-500 to-amber-500 bg-clip-text text-transparent
                       text-4xl sm:text-5xl md:text-6xl font-black leading-[1.2] pb-1 drop-shadow"
          >
            สุขสันต์วันเกิดคุณพ่อ
          </motion.h1>
        </header>

        {/* Scene A: Gift */}
        <AnimatePresence>
          {!opened && (
            <motion.section
              key="closed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 sm:mt-4 flex flex-col items-center gap-6"
            >
              <GiftBox opened={false} onOpen={openGift} />
              <p className="text-sm text-rose-600/80">แตะที่กล่องเพื่อเปิด</p>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Scene B: Card + Cake */}
        <AnimatePresence>
          {opened && !showLetter && (
            <motion.section
              key="open"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* การ์ดอวยพร (ไม่มีปุ่มความในใจในกล่องแล้ว) */}
              <div className="mx-auto max-w-2xl rounded-2xl bg-white/85 p-6 md:p-10 text-center shadow-xl ring-1 ring-rose-200">
                <h2 className="mb-3 bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent text-xl md:text-2xl font-extrabold">
                  ถึงคุณพ่อที่รัก
                </h2>
                <p className="whitespace-pre-line text-base md:text-lg leading-relaxed text-slate-700">
                  {defaultMessage}
                </p>
              </div>

              {/* เค้ก + ปุ่มจุดเทียนใหม่ */}
              <div className="mx-auto max-w-3xl rounded-[1.5rem] bg-white/85 p-5 md:p-7 text-center shadow-xl ring-1 ring-rose-200">
                <h3 className="mb-2 text-sm font-medium text-rose-600">เป่าเทียนอธิษฐาน</h3>
                <div className="flex flex-col items-center">
                  <PastelDripCake lit={candleLit} onBlow={blow} />
                  <p className="mt-2 text-xs text-slate-500">แตะที่เปลวไฟเพื่อเป่าเทียน</p>
                  <div className="mt-4">
                    <button
                      onClick={relight}
                      className="rounded-full border border-rose-300/70 bg-white/70 px-4 py-2 text-sm text-rose-700 shadow-sm backdrop-blur transition-colors duration-200 hover:bg-rose-500 hover:text-white hover:border-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60"
                    >
                      จุดเทียนใหม่
                    </button>
                  </div>
                </div>
              </div>
              {/* ปุ่มถัดไป จะโผล่ล่างกลาง (NextFab) */}
            </motion.section>
          )}
        </AnimatePresence>

        {/* Scene C: Letter (รูปโพลารอยด์แปะเทปข้าง ๆ ข้อความ) */}
        <AnimatePresence>
          {showLetter && (
            <motion.section
              key="letter"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mx-auto max-w-4xl"
            >
              <div
                className="rounded-2xl bg-white/90 p-6 md:p-10 shadow-xl ring-1 ring-rose-200"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(180deg, rgba(255,182,193,0.10) 0px, rgba(255,182,193,0.10) 2px, transparent 2px, transparent 32px)",
                }}
              >
                <div className="grid gap-6 md:grid-cols-5 items-start">
                  {/* โพลารอยด์ + เทป */}
                  <div className="md:col-span-2 mx-auto md:mx-0">
                    <div className="relative w-[260px] sm:w-[280px]">
                      <div className="absolute -top-3 left-6 rotate-[-8deg] h-6 w-16 rounded bg-amber-200/85 shadow-sm ring-1 ring-amber-300/60" />
                      <div className="absolute -top-3 right-6 rotate-[6deg] h-6 w-16 rounded bg-amber-200/85 shadow-sm ring-1 ring-amber-300/60" />
                      <div className="rotate-[-2.5deg] rounded-xl bg-white p-3 shadow-lg ring-1 ring-rose-200/60">
                        <img
                          src={`${import.meta.env.BASE_URL}images/IMG_4121.JPG`}
                          alt="ความทรงจำของเรา"
                          className="h-64 w-[234px] rounded-lg object-cover"
                        />
                        <div className="mt-2 text-center text-xs text-slate-600">ปักหมุดความทรงจำ</div>
                      </div>
                    </div>
                  </div>

                  {/* ข้อความ */}
                  <div className="md:col-span-3">
                    <h2 className="mb-3 text-2xl font-bold text-rose-600">ความในใจของเรา</h2>
                    <p className="whitespace-pre-line text-lg leading-relaxed text-slate-700">
                      {heartfeltNote}
                    </p>
                  </div>
                </div>
              </div>

              
              {/* ปุ่มย้อนกลับ จะโผล่ล่างกลาง (NextFab) */}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
