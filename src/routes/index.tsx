import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/showroom/SiteNav";
import { Hero } from "@/components/showroom/Hero";
import { Collection } from "@/components/showroom/Collection";
import { Showroom } from "@/components/showroom/Showroom";
import { Journey } from "@/components/showroom/Journey";
import { Interior, Details } from "@/components/showroom/Interior";
import { Categories } from "@/components/showroom/Categories";
import { HarshaXAutomobile, AboutHarsha } from "@/components/showroom/Harsha";
import { TestDrive, SiteFooter } from "@/components/showroom/Closing";
import { BookingProvider } from "@/components/showroom/booking";

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
    <BookingProvider>
      <div className="min-h-screen bg-background text-foreground">
        <SiteNav />
        <main>
          <Hero />
          <Collection />
          <Showroom />
          <Journey />
          <Interior />
          <Details />
          <Categories />
          <HarshaXAutomobile />
          <AboutHarsha />
          <TestDrive />
        </main>
        <SiteFooter />
      </div>
    </BookingProvider>
  );
}
