/**
 * SITE MEDIA REGISTRY — HARSHA AUTOMOBILE SHOWROOM
 *
 * ★★★ REPLACE THE HARSHA PHOTOGRAPHS HERE ★★★
 * Every frame that shows Harsha is a named slot pointing at an EXACT file path:
 *
 *   src/assets/hero/01-hero-harsha.jpg        → shots.heroMain     (full-screen hero)
 *   src/assets/hero/02-hero-harsha-side.jpg   → shots.heroSide     (hero portrait inset)
 *   src/assets/arrival/03-arrival-walking.jpg → shots.arrivalWalking
 *   src/assets/interior/17-harsha-inside-car.jpg → shots.harshaInside
 *   src/assets/harsha/21-harsha-with-maybach.jpg → shots.harshaMaybach
 *   src/assets/harsha/22-harsha-mercedes.jpg  → shots.harshaMercedes
 *
 * To swap any of them, drop the new file at that exact path (or replace the
 * matching `<name>.jpg.asset.json` pointer sitting beside it). Nothing else in
 * the codebase needs to change.
 *
 * RULE: a human face is NEVER generated or substituted. If a Harsha file is
 * missing, the layout renders a clearly labelled reserved slot naming the exact
 * file to supply. Car / showroom frames may fall back to a neutral photograph.
 */


import heroCar from "@/assets/hero-car.jpg";
import vehicleSedan from "@/assets/vehicle-sedan.jpg";
import vehicleCoupe from "@/assets/vehicle-coupe.jpg";
import vehicleSuv from "@/assets/vehicle-suv.jpg";
import featureDetail from "@/assets/feature-detail.jpg";
import techInterior from "@/assets/tech-interior.jpg";

/** All real assets present in src/assets (any nesting), keyed by "folder/file.jpg". */
const found = import.meta.glob("/src/assets/**/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

/** CDN-hosted photographs, delivered as `<name>.jpg.asset.json` pointer files. */
const pointers = import.meta.glob("/src/assets/**/*.asset.json", {
  eager: true,
  import: "default",
}) as Record<string, { url: string }>;

function resolve(path: string): string | null {
  return found[`/src/assets/${path}`] ?? pointers[`/src/assets/${path}.asset.json`]?.url ?? null;
}

export type Slot = {
  /** Exact asset path expected in the repo. */
  path: string;
  /** Resolved URL when the real photograph exists. */
  src: string | null;
  /** Neutral stand-in used only for car / showroom frames. */
  fallback: string | null;
  /** Human-readable description of the photograph. */
  label: string;
};

function slot(path: string, label: string, fallback: string | null = null): Slot {
  return { path, label, src: resolve(path), fallback };
}

export const shots = {
  heroMain: slot("hero/01-hero-harsha.jpg", "Harsha with the car — primary hero"),
  heroSide: slot("hero/02-hero-harsha-side.jpg", "Harsha, side portrait"),

  arrivalWalking: slot("arrival/03-arrival-walking.jpg", "Arrival — walking in"),
  arrivalShowroom: slot("arrival/04-arrival-showroom.jpg", "The showroom floor", heroCar),

  openingDoor: slot("experience/05-opening-door.jpg", "Opening the door"),
  touchingHood: slot("experience/19-touching-hood.jpg", "A hand across the hood"),
  touchDetail: slot("experience/20-touch-detail.jpg", "Touch detail", featureDetail),

  maybach: slot("collection/06-maybach-s-class.jpg", "Maybach S-Class", vehicleSedan),
  panamera: slot("collection/07-porsche-panamera.jpg", "Porsche Panamera", vehicleCoupe),
  rangeRover: slot(
    "collection/08-range-rover-autobiography.jpg",
    "Range Rover Autobiography",
    vehicleSuv,
  ),
  bmwXm: slot("collection/09-bmw-xm.jpg", "BMW XM", vehicleSuv),
  audiA8: slot("collection/10-audi-a8.jpg", "Audi A8", vehicleSedan),
  bmw7: slot("collection/11-bmw-7-series.jpg", "BMW 7 Series", vehicleCoupe),

  wheelDetail: slot("details/12-wheel-detail.jpg", "Forged wheel detail", featureDetail),
  dashboardDetail: slot("details/13-dashboard-detail.jpg", "Dashboard detail", techInterior),

  frontCabin: slot("interior/14-front-cabin.jpg", "Front cabin", techInterior),
  rearLounge: slot("interior/16-rear-lounge.jpg", "Rear lounge", techInterior),
  harshaInside: slot("interior/17-harsha-inside-car.jpg", "Harsha inside the car"),

  harshaMaybach: slot("harsha/21-harsha-with-maybach.jpg", "Harsha with the Maybach"),
  harshaMercedes: slot("harsha/22-harsha-mercedes.jpg", "Harsha and the Mercedes"),

  showroomFinal: slot("closing/23-showroom-final.jpg", "Showroom, final frame", heroCar),
} satisfies Record<string, Slot>;
