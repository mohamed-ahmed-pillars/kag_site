"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

function useIsDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return false;
  return resolvedTheme === "dark";
}

/* ─────────────────────────────────────────────
   Card 1 – Premium Quality
   Neumorphic quality seal with rotating outer
   ring and a sweeping clock-style hand
───────────────────────────────────────────── */
// ── Clock colors — edit here to test ──────────────
const clockColors = (isDark: boolean) => ({
  outerRingFrom: "#ebebeb",                         // outer glow ring gradient start
  outerRingTo: "#d8d8d8",                         // outer glow ring gradient end
  bezelFrom: "#eeeeee",                         // inner bezel gradient start
  bezelTo: "#d8d8d8",                         // inner bezel gradient end
  faceFrom: "#f0f0f0",                         // clock face gradient start
  faceTo: "#e0e0e0",                         // clock face gradient end
  tickMajor: "#888",                            // 12 major tick marks
  tickMinor: "#c0c0c0",                         // 48 minor tick marks
  minuteHand: isDark ? "#555" : "#354c9a",       // minute hand
  hourHand: isDark ? "#333" : "#354c9a",       // hour hand
  centerCap: isDark ? "#333" : "#354c9a",       // center pivot dot
  badgeBg:     isDark ? "#2a2a2a" : "#f0f0f0",   // ISO badge background
  badgeText:   isDark ? "#d1d5db" : "#4b5563",   // ISO badge text
  badgeShadow: isDark ? "none"    : "3px 3px 6px rgba(0,0,0,0.1), -2px -2px 5px rgba(255,255,255,0.9)",
});
// ──────────────────────────────────────────────────

export function QualityIllustration() {
  const isDark = useIsDark();
  const CLOCK = clockColors(isDark);

  const [angle, setAngle] = useState(0);
  const [minuteAngle, setMinuteAngle] = useState(0);
  useAnimationFrame((t) => {
    setAngle((t / 8000) * 360);
    setMinuteAngle((t / 80000) * 360);
  });

  const ticks = Array.from({ length: 60 }, (_, i) => i);
  const majorTicks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Outer glow ring */}
      <div
        className="absolute w-44 h-44 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${CLOCK.outerRingFrom}, ${CLOCK.outerRingTo})`,
          boxShadow:
            "8px 8px 18px rgba(0,0,0,0.12), -6px -6px 14px rgba(255,255,255,0.95)",
        }}
      />

      {/* Rotating tick ring */}
      <motion.div
        className="absolute w-44 h-44 rounded-full"
        style={{ rotate: minuteAngle }}
      >
        {ticks.map((i) => {
          const isMajor = majorTicks.includes(i);
          return (
            <div
              key={i}
              className="absolute"
              style={{
                width: "100%",
                height: "100%",
                transform: `rotate(${i * 6}deg)`,
              }}
            >
              <div
                className="absolute left-1/2"
                style={{
                  top: 6,
                  width: isMajor ? 2 : 1,
                  height: isMajor ? 10 : 6,
                  marginLeft: isMajor ? -1 : -0.5,
                  borderRadius: 2,
                  background: isMajor ? CLOCK.tickMajor : CLOCK.tickMinor,
                }}
              />
            </div>
          );
        })}
      </motion.div>

      {/* Inner bezel */}
      <div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: `linear-gradient(145deg, ${CLOCK.bezelFrom}, ${CLOCK.bezelTo})`,
          boxShadow:
            "inset 4px 4px 8px rgba(0,0,0,0.1), inset -4px -4px 8px rgba(255,255,255,0.9)",
        }}
      />

      {/* Face */}
      <div
        className="absolute w-28 h-28 rounded-full"
        style={{
          background: `linear-gradient(145deg, ${CLOCK.faceFrom}, ${CLOCK.faceTo})`,
          boxShadow:
            "3px 3px 7px rgba(0,0,0,0.08), -3px -3px 7px rgba(255,255,255,0.9)",
        }}
      />

      {/* Minute hand */}
      <motion.div
        className="absolute rounded-full origin-bottom"
        style={{
          width: 3,
          height: 36,
          bottom: "50%",
          left: "50%",
          marginLeft: -1.5,
          borderRadius: 4,
          background: CLOCK.minuteHand,
          rotate: minuteAngle * 12,
          transformOrigin: "50% 100%",
        }}
      />

      {/* Hour hand */}
      <motion.div
        className="absolute rounded-full origin-bottom"
        style={{
          width: 4,
          height: 26,
          bottom: "50%",
          left: "50%",
          marginLeft: -2,
          borderRadius: 4,
          background: CLOCK.hourHand,
          rotate: angle,
          transformOrigin: "50% 100%",
        }}
      />

      {/* Center cap */}
      <div
        className="absolute w-4 h-4 rounded-full z-10"
        style={{
          background: CLOCK.centerCap,
          boxShadow: "1px 1px 3px rgba(0,0,0,0.3)",
        }}
      />

      {/* Quality badge label */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div
          className="px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.18em] uppercase text-gray-600 dark:text-gray-300"
          style={{
            background: 'var(--neuo-badge-bg)',
            boxShadow: 'var(--neuo-badge-shadow)',
          }}
        >
          ISO 22000
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card 2 – Global Export
   Animated bar chart — bars grow from a fixed
   baseline, "30+ countries" floats above the
   tallest bar. Heights use animate so the bar
   physically grows rather than scaleY-squishing.
───────────────────────────────────────────── */
// ── Export chart colors — edit here to test ───────
const exportColors = (isDark: boolean) => ({
  axisLine: "#e5e7eb",                         // left axis + baseline line
  axisLabel: isDark ? "#d1d5db" : "#000",          // "EXPORTS" label + x-axis labels
  badgeBg:     isDark ? "#2a2a2a" : "#ebebeb",   // "30+ countries" badge background
  badgeText:   isDark ? "#d1d5db" : "#374151",   // "30+ countries" badge text
  badgeShadow: isDark ? "none"    : "3px 3px 6px rgba(0,0,0,0.10), -2px -2px 5px rgba(255,255,255,0.92)",
  barFrom:     isDark ? "#e8e8e8" : "#354c9a",   // bar gradient top
  barTo:       isDark ? "#d4d4d4" : "#354c9a",   // bar gradient bottom
});
// ──────────────────────────────────────────────────

const exportBars = [
  { label: "EU", pct: 0.50 },
  { label: "GCC", pct: 0.74 },
  { label: "ASIA", pct: 0.60 },
  { label: "AFR", pct: 0.40 },
  { label: "USA", pct: 0.92 },
];

const MAX_BAR_H = 148;

export function ExportIllustration() {
  const isDark = useIsDark();
  const EXPORT = exportColors(isDark);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* ── Left axis ── */}
      <div className="absolute left-5 top-5 bottom-[42px] flex flex-col items-center gap-1">
        <div className="flex-1 w-px" style={{ background: EXPORT.axisLine }} />
        <span
          className="text-[8px] tracking-[0.18em] font-semibold"
          style={{ color: EXPORT.axisLabel, writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          EXPORTS
        </span>
      </div>

      {/* ── Bars row ── sits on a fixed baseline ── */}
      <div className="absolute left-12 right-5 bottom-[42px] flex items-end gap-2.5">
        {exportBars.map((bar, i) => {
          const targetH = Math.round(bar.pct * MAX_BAR_H);
          return (
            <div key={bar.label} className="relative flex-1 flex flex-col items-center">
              {/* Floating badge above tallest bar */}
              {bar.pct >= 0.9 && (
                <motion.div
                  className="absolute whitespace-nowrap text-[9px] font-bold tracking-[0.18em] uppercase text-gray-600 dark:text-gray-300 px-2 py-[3px] rounded-full"
                  style={{
                    bottom: targetH + 10,
                    background: 'var(--neuo-badge-bg)',
                    boxShadow: 'var(--neuo-badge-shadow)',
                  }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.75, duration: 0.45, ease: "easeOut" }}
                >
                  30+ countries
                </motion.div>
              )}

              {/* Bar */}
              <motion.div
                className="w-full rounded-2xl"
                style={{
                  background: `linear-gradient(180deg, ${EXPORT.barFrom} 0%, ${EXPORT.barTo} 100%)`,
                  boxShadow:
                    "4px 4px 8px rgba(0,0,0,0.10), -3px -3px 7px rgba(255,255,255,0.88)",
                }}
                initial={{ height: 0 }}
                animate={{ height: targetH }}
                transition={{
                  delay: 0.08 * i,
                  duration: 0.65,
                  ease: [0.22, 1.2, 0.36, 1],
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ── Baseline ── */}
      <div
        className="absolute left-5 right-5 h-px"
        style={{ bottom: 42, background: EXPORT.axisLine }}
      />

      {/* ── X-axis labels ── */}
      <div className="absolute left-12 right-5 bottom-3 flex gap-2.5">
        {exportBars.map((bar) => (
          <div key={bar.label} className="flex-1 flex justify-center">
            <span className="text-[9px] font-medium tracking-wide" style={{ color: EXPORT.axisLabel }}>
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card 3 – Trusted Partner
   Orbiting user nodes connected by lines to
   a central hub.
───────────────────────────────────────────── */

// ── Partner diagram colors — edit here to test ────
const partnerColors = (isDark: boolean) => ({
  connectionLine: "#ccc",                           // dashed lines
  pulseRing: "rgba(0,0,0,0.07)",               // pulse ring border
  hubOuterFrom: "#e8e8e8",                        // hub outer gradient start
  hubOuterTo: "#d4d4d4",                        // hub outer gradient end
  hubInner: isDark ? "#444" : "#354c9a",      // hub inner circle
  hubArrow: "white",                          // arrow icon
  nodeFrom: "#eeeeee",                        // satellite node gradient start
  nodeTo: "#d8d8d8",                        // satellite node gradient end
  personIcon: "#555",                           // person silhouette
  badgeBg:     isDark ? "#2a2a2a" : "#f0f0f0",  // badge background
  badgeText:   isDark ? "#d1d5db" : "#4b5563",  // badge text
  badgeShadow: isDark ? "none"    : "3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)",
});
// ──────────────────────────────────────────────────

const satellites = [
  { dx: -68, dy: -18, delay: 0.05 },
  { dx: 58, dy: -46, delay: 0.15 },
  { dx: -52, dy: 52, delay: 0.25 },
];

function PersonIcon({ size = 24, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill={color} />
      <path
        d="M4 20c0-3.866 3.582-7 8-7s8 3.134 8 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function SatelliteNode({
  dx,
  dy,
  delay,
  floatDuration,
}: {
  dx: number;
  dy: number;
  delay: number;
  floatDuration: number;
}) {
  const isDark = useIsDark();
  const PARTNER = partnerColors(isDark);

  return (
    <motion.div
      className="absolute z-10 rounded-full flex items-center justify-center"
      style={{
        width: 44,
        height: 44,
        left: `calc(50% + ${dx}px - 22px)`,
        top: `calc(50% + ${dy}px - 22px)`,
        background: `linear-gradient(145deg, ${PARTNER.nodeFrom}, ${PARTNER.nodeTo})`,
        boxShadow: "5px 5px 10px rgba(0,0,0,0.10), -3px -3px 8px rgba(255,255,255,0.92)",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 280, damping: 18 }}
    >
      <motion.div
        className="flex items-center justify-center w-full h-full"
        animate={{ y: [-3, 3, -3] }}
        transition={{ delay: delay + 0.6, duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
      >
        <PersonIcon size={24} color={PARTNER.personIcon} />
      </motion.div>
    </motion.div>
  );
}

export function PartnerIllustration() {
  const isDark = useIsDark();
  const PARTNER = partnerColors(isDark);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">

      {/* ── SVG dashed connection lines ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 300 256"
        style={{ pointerEvents: "none" }}
      >
        {satellites.map((s, i) => (
          <motion.line
            key={i}
            x1={150}
            y1={128}
            x2={150 + s.dx}
            y2={128 + s.dy}
            stroke={PARTNER.connectionLine}
            strokeWidth="1.5"
            strokeDasharray="5 4"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ delay: s.delay + 0.25, duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* ── Pulse ring behind hub ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 80,
          height: 80,
          border: `1.5px solid ${PARTNER.pulseRing}`,
        }}
        animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
      />

      {/* ── Central hub ── */}
      <motion.div
        className="absolute z-10 w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: `linear-gradient(145deg, ${PARTNER.hubOuterFrom}, ${PARTNER.hubOuterTo})`,
          boxShadow: "8px 8px 16px rgba(0,0,0,0.13), -6px -6px 14px rgba(255,255,255,0.92)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: PARTNER.hubInner,
            boxShadow: "2px 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke={PARTNER.hubArrow}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>

      {/* ── Satellite nodes ── */}
      {satellites.map((s, i) => (
        <SatelliteNode
          key={i}
          dx={s.dx}
          dy={s.dy}
          delay={s.delay}
          floatDuration={3 + i * 0.6}
        />
      ))}

      {/* ── Bottom badge ── */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
      >
        <div
          className="px-4 py-1.5 rounded-full text-[9px] font-bold tracking-[0.18em] uppercase text-gray-600 dark:text-gray-300"
          style={{
            background: 'var(--neuo-badge-bg)',
            boxShadow: 'var(--neuo-badge-shadow)',
          }}
        >
          500+ Clients
        </div>
      </motion.div>
    </div>
  );
}
