/**
 * Real Google reviews provided directly by the client, quoted verbatim.
 * No star rating is included since none was provided — adding a fabricated
 * rating would be inaccurate structured data.
 */
export interface Review {
  name: string;
  quote: string;
  url: string;
}

export const reviews: Review[] = [
  {
    name: "Zadrak Chagoya",
    quote: "Professional people they did a really good job in my car I recommend the shop",
    url: "https://maps.app.goo.gl/hvEFYZKFNRuJE8PV6",
  },
  {
    name: "Lavera Pressley",
    quote: "Uncle Rob's has excellent service and Prices I highly recommended them!",
    url: "https://maps.app.goo.gl/SpiKaGtBPQ7Yfpb4A",
  },
  {
    name: "Citris Nunley",
    quote:
      "They did a excellent job on my Cadillac and they prices is very reasonable i really appreciate them cause every other shop was trying to beat me on the eastside.",
    url: "https://maps.app.goo.gl/V3bgYfynpkSoGJiZ8",
  },
  {
    name: "Eddie Williams",
    quote:
      "I took my Car to 7 mile and hoover Auto Service were they are doing good Work on Customers Cars. They made sure my Car got the right repairs done.",
    url: "https://maps.app.goo.gl/r8brPC3BGwD3SDvq7",
  },
];

export const readAllReviewsUrl = "https://maps.app.goo.gl/SxgkHdHJBWHyuqeJ7";
export const leaveReviewUrl = "https://g.page/r/CZZz9hIs2VhJEBM/review";
