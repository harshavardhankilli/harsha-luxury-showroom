/**
 * SITE MEDIA REGISTRY — HARSHA AUTOMOBILE SHOWROOM
 *
 * Every photograph on the site is referenced by its EXACT delivery path/name, e.g.
 *   src/assets/hero/01-hero-harsha.jpg
 *   src/assets/collection/06-maybach-s-class.jpg
 *
 * Drop the real files into `src/assets/<folder>/<exact-name>.jpg` and they are picked
 * up automatically — no code change required. Until a file exists:
 *   - car / showroom frames fall back to a neutral placeholder photograph
 *   - every frame containing Harsha renders a clearly named reserved slot
 *     (no stand-in human is ever substituted).
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

function resolve(path: string): string | null {
  return found[`/src/assets/${path}`] ?? null;
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
