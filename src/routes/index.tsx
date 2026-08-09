import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/showroom/SiteNav";
import { Hero } from "@/components/showroom/Hero";
import { Collection } from "@/components/showroom/Collection";
import { Categories } from "@/components/showroom/Categories";
import { FeaturedVehicle, Technology } from "@/components/showroom/FeaturedVehicle";
import { HarshaXAutomobile, AboutHarsha } from "@/components/showroom/Harsha";
import { TestDrive, SiteFooter } from "@/components/showroom/Closing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harsha Automobile Showroom | Luxury & Performance Cars" },
      {
        name: "description",
        content:
          "A private showroom of curated luxury sedans, performance coupes, SUVs and electric cars. Personally inspected, 214-point prepared, delivered by appointment.",
      },
      { property: "og:title", content: "Harsha Automobile Showroom" },
      {
        property: "og:description",
        content:
          "Curated luxury and performance automobiles, personally inspected and delivered by private appointment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <Collection />
        <Categories />
        <FeaturedVehicle />
        <Technology />
        <HarshaXAutomobile />
        <AboutHarsha />
        <TestDrive />
      </main>
      <SiteFooter />
    </div>
  );
}
