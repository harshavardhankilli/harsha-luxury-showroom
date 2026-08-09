/**
 * SITE MEDIA MAP — every image used on the site is declared here.
 *
 * To swap any visual: drop a new file into `src/assets/` with the same name,
 * or change the import path below. Nothing else in the codebase hardcodes an image.
 */

import heroCar from "@/assets/hero-car.jpg";
import vehicleSedan from "@/assets/vehicle-sedan.jpg";
import vehicleCoupe from "@/assets/vehicle-coupe.jpg";
import vehicleSuv from "@/assets/vehicle-suv.jpg";
import featureDetail from "@/assets/feature-detail.jpg";
import techInterior from "@/assets/tech-interior.jpg";

export const media = {
  hero: heroCar,
  sedan: vehicleSedan,
  coupe: vehicleCoupe,
  suv: vehicleSuv,
  featureDetail,
  techInterior,
};

/**
 * RESERVED IMAGE SLOTS FOR HARSHA'S REAL PHOTOGRAPHS.
 *
 * No stand-in face is used anywhere on this site. When the real photos are ready:
 *   1. Save them as:
 *        src/assets/harsha-portrait.jpg   (portrait, ~3:4, used in "Harsha x Automobile")
 *        src/assets/harsha-about.jpg      (editorial/wide, used in "About Harsha")
 *   2. Uncomment the matching import + value below.
 *
 * Until then the layout renders a refined reserved frame in the exact final position,
 * so no re-layout is needed after upload.
 */
// import harshaPortrait from "@/assets/harsha-portrait.jpg";
// import harshaAbout from "@/assets/harsha-about.jpg";

export const harshaMedia: {
  portrait: string | null;
  about: string | null;
} = {
  portrait: null, // harshaPortrait
  about: null, // harshaAbout
};
