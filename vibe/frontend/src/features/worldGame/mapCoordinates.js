// Master End-to-End Coordinates for SAYLO 30-Level Game World Map
// Canvas Height: 5600px | Container Max-Width: 680px
// Wide End-to-End Serpentine Path: X swings from 14% (far left) to 86% (far right)

export const MAP_CANVAS_HEIGHT = 5600;

export const LEVEL_MAP_COORDINATES = {
  // WORLD 1 — EASY (1–10: Emerald Grove)
  1: { x: 50, y: 5350 }, // Starting Node (bottom center)
  2: { x: 28, y: 5170 }, // Sweeping left
  3: { x: 14, y: 4990 }, // Far left curve (14%)
  4: { x: 38, y: 4810 }, // Cutting across to center-right
  5: { x: 70, y: 4630 }, // Sweeping right
  6: { x: 86, y: 4450 }, // Far right curve (86%)
  7: { x: 62, y: 4270 }, // Sweeping left
  8: { x: 32, y: 4090 }, // Mid-left
  9: { x: 16, y: 3910 }, // Far left hook (16%)
  10: { x: 50, y: 3710 }, // Boss 10: The Starter Hub Milestone

  // WORLD 2 — MEDIUM (11–20: Cyber District)
  11: { x: 78, y: 3510 }, // Sweeping right
  12: { x: 86, y: 3330 }, // Far right wall (86%)
  13: { x: 60, y: 3150 }, // Cutting back towards center
  14: { x: 28, y: 2970 }, // Sweeping left
  15: { x: 14, y: 2790 }, // Far left wall (14%)
  16: { x: 38, y: 2610 }, // Cutting across
  17: { x: 72, y: 2430 }, // Sweeping right
  18: { x: 86, y: 2250 }, // Far right hook (86%)
  19: { x: 64, y: 2070 }, // Inward curve
  20: { x: 50, y: 1870 }, // Boss 20: The Vibe District Milestone

  // WORLD 3 — HARD (21–30: Apex Summit)
  21: { x: 24, y: 1670 }, // Sweeping left
  22: { x: 14, y: 1490 }, // Far left wall (14%)
  23: { x: 44, y: 1310 }, // Crossing center
  24: { x: 76, y: 1130 }, // Sweeping right
  25: { x: 86, y: 950 },  // Far right wall (86%)
  26: { x: 62, y: 770 },  // Cutting back left
  27: { x: 28, y: 590 },  // Mid-left
  28: { x: 16, y: 430 },  // Far left final ascent (16%)
  29: { x: 34, y: 280 },  // Hooking towards center
  30: { x: 50, y: 140 },  // Boss 30: Grand Summit Apex!
};

// World boundary Y markers for ambient lighting and theme transitions
export const WORLD_BOUNDARIES = {
  world1: { startY: 5600, endY: 3650 },
  world2: { startY: 3650, endY: 1800 },
  world3: { startY: 1800, endY: 0 },
};
