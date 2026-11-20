import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import novusCss from "@/styles/novus.css?url";
import { NovusMarkup } from "@/components/novus/NovusMarkup";
import { initNovus } from "@/lib/novus-init";
import { submitQuoteRequest } from "@/lib/server-fns";

const TITLE = "Commercial Snow Removal NYC | Novus Maintenance | 24/7, All 5 Boroughs";
const DESCRIPTION = "Commercial-only snow and ice management across Manhattan, Brooklyn, Queens, the Bronx and Staten Island. Plowing, de-icing, sidewalk clearing and snow hauling, dispatched 24/7. Call (917) 970-2960.";
const OG_IMAGE = "https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/14aaee91a_novus-hero.png";
const LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Novus Maintenance Corp",
  "description": "Commercial-only snow and ice management in New York City: snow plowing, de-icing, sidewalk clearing, shoveling and snow hauling.",
  "url": "https://www.novusmaintenance.com/",
  "telephone": "+1-917-970-2960",
  "email": "sales@novusmaintenance.com",
  "image": "https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/14aaee91a_novus-hero.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "434 West 33rd Street, PH Floor",
    "addressLocality": "New York",
    "addressRegion": "NY",
    "postalCode": "10001",
    "addressCountry": "US"
  },
  "areaServed": [
    "Manhattan",
    "Brooklyn",
    "Queens",
    "The Bronx",
    "Staten Island",
    "Long Island City"
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": [
    "https://www.facebook.com/novusmaintenance/",
    "https://www.instagram.com/novussnow/",
    "https://www.yelp.com/biz/novus-maintenance-snow-removal-new-york"
  ],
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Commercial snow plowing"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "De-icing"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Sidewalk snow clearing"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Snow shoveling"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Snow hauling"
      }
    }
  ],
  "priceRange": "$$"
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Novus Maintenance | Commercial Snow Removal NYC" },
      { property: "og:description", content: "Open on time. Every storm. Commercial snow and ice management across all five boroughs, 24/7." },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0A0F1C" },
    ],
    links: [
      { rel: "canonical", href: "https://www.novusmaintenance.com/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Geist:wght@200;300;400;500;600;700&display=swap" },
      { rel: "preload", as: "image", href: OG_IMAGE },
      { rel: "stylesheet", href: novusCss },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(LOCAL_BUSINESS) }],
  }),
  component: HomePage,
});

function HomePage() {
  const submit = useServerFn(submitQuoteRequest);
  useEffect(() => initNovus({ onSubmit: (data) => submit({ data }) }), [submit]);
  return <NovusMarkup />;
}
