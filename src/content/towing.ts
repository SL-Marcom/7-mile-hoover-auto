/**
 * Standalone Towing content — deliberately kept out of business.ts's
 * `services` array so it never appears in the mechanical-repair services
 * grid, but still reuses the same service-page building blocks (hero,
 * signs/included, why-it-matters, FAQ) via their structural prop types.
 */
export const towing = {
  name: "Towing",
  shortDescription: "In-house towing to get your vehicle safely to our shop when it can't be driven in.",
  intro: [
    "When your vehicle can't be driven safely, whether it won't start, broke down, or was in an accident, we offer towing to bring it to our shop for repair.",
    "Towing is handled in-house with our own truck, so you're working directly with us from pickup through repair.",
  ],
  included: [
    "Vehicle pickup and tow to our shop",
    "Towing for cars, trucks, and SUVs",
    "Coordination with your repair once the vehicle arrives",
  ],
  signs: [
    "Your vehicle won't start and needs to be brought in",
    "Your car broke down and isn't safe to drive",
    "You were in an accident and need your vehicle moved",
    "A warning light or noise means you shouldn't keep driving",
  ],
  whyTimelyMatters:
    "Driving a vehicle that isn't safe to operate can turn a manageable repair into a bigger one, or put you at risk on the road. Towing it in as soon as you notice a serious problem helps prevent further damage.",
  faqs: [
    {
      question: "Do you tow vehicles yourselves or use a third party?",
      answer: "We tow in-house with our own truck, so you're working directly with us from pickup through repair.",
    },
    {
      question: "What areas do you tow from?",
      answer: "We tow within Detroit, MI and nearby communities. Call us to confirm we can reach your location.",
    },
    {
      question: "Is towing available outside your regular shop hours?",
      answer: "Towing follows our regular shop hours. Call us to check availability for your situation.",
    },
  ],
  /** Real mechanical-repair services to cross-link to from the Towing page. */
  relatedSlugs: ["general-auto-repair", "starter-alternator-repair", "check-engine-light-diagnostics"],
};
