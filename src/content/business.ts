/**
 * 7 Mile and Hoover Auto Services — single source of truth for business facts
 * and service content used across the site. Every field is tagged with its
 * confirmation status so the whole site can be updated by editing this one
 * file. See clients/7-mile-hoover-auto/intake/context.ts for the full,
 * provenance-tagged Client Intake Engine record this was built from.
 */

export type FieldStatus = "client-confirmed" | "placeholder";

export interface Fact<T> {
  value: T;
  status: FieldStatus;
  note?: string;
}

export const business = {
  brandName: {
    value: "7 Mile and Hoover Auto Services",
    status: "client-confirmed",
  } satisfies Fact<string>,

  shortName: "7 Mile and Hoover Auto",

  phone: {
    value: "(313) 897-8888",
    display: "(313) 897-8888",
    href: "tel:+13138978888",
    status: "client-confirmed" as FieldStatus,
  },

  email: {
    value: null as string | null,
    status: "placeholder" as FieldStatus,
    note: "No business email confirmed yet. Do not display or use one until the client provides it.",
  },

  hours: {
    value: [
      { days: "Monday – Friday", time: "8:30 AM – 6:00 PM" },
      { days: "Saturday", time: "8:30 AM – 3:00 PM" },
      { days: "Sunday", time: "Closed" },
    ],
    status: "client-confirmed" as FieldStatus,
  },

  address: {
    street: "11517 Seven Mile E",
    city: "Detroit",
    state: "MI",
    postalCode: "48234",
    country: "US",
    full: "11517 Seven Mile E, Detroit, MI 48234",
    mapsUrl: "https://maps.app.goo.gl/1FiTEZpCnaSDx6m8A",
    status: "client-confirmed" as FieldStatus,
  },

  businessModel: {
    value: "storefront" as const,
    status: "client-confirmed" as FieldStatus,
  },

  serviceAreas: {
    value: ["Detroit, MI", "and nearby communities"],
    status: "client-confirmed" as FieldStatus,
  },

  targetAudience:
    "Vehicle owners in Detroit and nearby communities who need reliable auto repair, maintenance, diagnostics, and mechanical repair.",

  primaryGoal:
    "Generate qualified local auto repair leads — primarily phone calls and free quote requests — while improving organic search, Local SEO, and AI/LLM visibility.",

  ctas: {
    primary: { label: "Call Now" },
    secondary: { label: "Get Free Quote" },
  },

  requiredPages: {
    value: ["Home", "About Us", "Services", "FAQ", "Blog", "Contact Us"],
    status: "client-confirmed" as FieldStatus,
  },

  /** What this shop does not do — never advertise or imply these anywhere on the site. */
  exclusions: ["Collision repair", "Auto body work", "Auto painting", "Tire sales", "Tire replacement"],

  siteUrl: {
    value: "https://7hautoservice.com",
    status: "placeholder" as FieldStatus,
    note: "Target domain for this build. DNS has not been connected and no deployment has occurred — used here only for canonical/OG/JSON-LD URLs.",
  },

  /** Read directly from the Client Intake Engine (clients/7-mile-hoover-auto/intake/context.ts). This build never deploys, publishes to production, changes DNS, installs analytics, or connects an external service regardless of these values. */
  permissions: {
    publishingApproved: false,
    deploymentApproved: true,
    dnsChangesApproved: false,
    analyticsInstallApproved: false,
    externalServiceConnectionsApproved: false,
  },

  services: [
    {
      slug: "brake-repair",
      name: "Brake Repair",
      icon: "brake",
      shortDescription: "Brake inspections, pad and rotor service, and brake system repair to keep your vehicle stopping safely.",
      intro: [
        "Your brakes are one of the most important safety systems on your vehicle, and they wear differently depending on how and where you drive. We inspect your full brake system and explain what we find before any work begins.",
        "We work on the brake systems found on most everyday cars, trucks, and SUVs.",
      ],
      included: [
        "Brake pad and rotor inspection and replacement",
        "Brake fluid inspection",
        "Caliper and brake hardware inspection",
        "Brake line and hose inspection",
        "Parking brake inspection",
      ],
      signs: [
        "Squealing, grinding, or scraping noises when braking",
        "A soft, spongy, or low brake pedal",
        "Vibration or pulsing through the pedal or steering wheel when stopping",
        "The vehicle pulling to one side when braking",
        "A brake warning light on the dashboard",
      ],
      relatedSlugs: ["suspension-repair", "wheel-alignment", "check-engine-light-diagnostics"],
    },
    {
      slug: "muffler-exhaust-repair",
      name: "Muffler & Exhaust Repair",
      icon: "exhaust",
      shortDescription: "Muffler, exhaust pipe, and exhaust system repair to address noise, leaks, and emissions issues.",
      intro: [
        "A damaged exhaust system can mean excess noise, a burning smell, or exhaust fumes entering the cabin. We inspect the full exhaust path — from the manifold back to the tailpipe — to find where the problem actually is.",
        "We repair or replace mufflers, pipes, and related exhaust components as needed.",
      ],
      included: [
        "Muffler inspection and replacement",
        "Exhaust pipe repair for rust-through and leaks",
        "Exhaust clamp, bracket, and hanger repair",
        "Catalytic converter inspection",
        "Exhaust leak diagnosis",
      ],
      signs: [
        "Louder-than-normal engine or exhaust noise",
        "A rattling sound, especially at startup or low speeds",
        "A strong exhaust or burning smell inside or outside the vehicle",
        "Visible rust, holes, or hanging components under the vehicle",
        "Reduced fuel economy",
      ],
      relatedSlugs: ["engine-repair", "check-engine-light-diagnostics", "general-auto-repair"],
    },
    {
      slug: "engine-repair",
      name: "Engine Repair",
      icon: "engine",
      shortDescription: "Engine diagnostics and repair for performance issues, unusual noises, leaks, and drivability problems.",
      intro: [
        "Engine problems range from a minor sensor issue to a major mechanical repair. We start with a proper diagnosis so you know what's actually wrong before we recommend a repair.",
        "We repair a wide range of gasoline engine issues on everyday cars, trucks, and SUVs.",
      ],
      included: [
        "Engine performance and drivability diagnosis",
        "Belt, hose, and gasket repair",
        "Engine leak diagnosis and repair",
        "Timing component service",
        "Engine noise diagnosis",
      ],
      signs: [
        "Rough idling, stalling, or hesitation",
        "Loss of power or poor acceleration",
        "Knocking, ticking, or unusual engine noise",
        "Visible fluid leaks under the vehicle",
        "A check engine or oil pressure warning light",
      ],
      relatedSlugs: ["check-engine-light-diagnostics", "oil-change-preventive-maintenance", "radiator-cooling-system-repair"],
    },
    {
      slug: "transmission-repair",
      name: "Transmission Repair",
      icon: "transmission",
      shortDescription: "Transmission diagnostics and repair for shifting problems, fluid leaks, and drivability concerns.",
      intro: [
        "Transmission issues can start small — a hesitation or a delayed shift — and get worse quickly if left unaddressed. We diagnose the cause before recommending a repair.",
        "We service and repair common automatic and manual transmission issues on everyday vehicles.",
      ],
      included: [
        "Transmission diagnosis for shifting and slipping issues",
        "Transmission fluid inspection and service",
        "Transmission leak diagnosis and repair",
        "Clutch system inspection (manual transmissions)",
        "Transmission mount inspection",
      ],
      signs: [
        "Delayed, rough, or hard shifting between gears",
        "Slipping out of gear or difficulty staying in gear",
        "Grinding or shaking during shifts",
        "Transmission fluid leaks (often red or brown)",
        "A burning smell from the transmission",
      ],
      relatedSlugs: ["engine-repair", "check-engine-light-diagnostics", "general-auto-repair"],
    },
    {
      slug: "oil-change-preventive-maintenance",
      name: "Oil Change & Preventive Maintenance",
      icon: "oil",
      shortDescription: "Oil changes and routine maintenance to help your vehicle stay reliable and avoid bigger repairs.",
      intro: [
        "Routine maintenance is the most effective way to avoid unexpected breakdowns. We follow manufacturer-recommended service guidance for your specific vehicle rather than a one-size-fits-all schedule.",
        "Ask us about the right oil type and service interval for your vehicle.",
      ],
      included: [
        "Oil and oil filter change",
        "Fluid level checks (coolant, brake, power steering, washer fluid)",
        "Visual inspection of belts and hoses",
        "Tire pressure check",
        "General multi-point vehicle inspection",
      ],
      signs: [
        "It's been a while since your last service and you're not sure what's due",
        "The oil change or maintenance reminder light is on",
        "You're preparing for a long trip",
        "You recently bought the vehicle and don't know its service history",
        "You've noticed a general decline in how the vehicle runs",
      ],
      relatedSlugs: ["engine-repair", "check-engine-light-diagnostics", "radiator-cooling-system-repair"],
    },
    {
      slug: "auto-electrical-repair",
      name: "Auto Electrical Repair",
      icon: "electrical",
      shortDescription: "Diagnosis and repair of electrical issues, from wiring and fuses to lights and power accessories.",
      intro: [
        "Modern vehicles rely on complex electrical systems that control everything from lighting to the engine itself. We diagnose electrical issues using proper testing rather than guesswork.",
        "We handle a wide range of electrical repairs on everyday vehicles.",
      ],
      included: [
        "Electrical system diagnosis",
        "Wiring and fuse inspection and repair",
        "Battery, starter, and charging system testing",
        "Lighting system repair (headlights, taillights, interior lighting)",
        "Power accessory diagnosis (windows, locks, and similar systems)",
      ],
      signs: [
        "Lights that flicker, dim, or don't work",
        "A battery that keeps dying or won't hold a charge",
        "Blown fuses that repeat",
        "Power windows, locks, or accessories that stop working",
        "A burning smell or visible damage to wiring",
      ],
      relatedSlugs: ["starter-alternator-repair", "check-engine-light-diagnostics", "general-auto-repair"],
    },
    {
      slug: "check-engine-light-diagnostics",
      name: "Check Engine Light & Diagnostics",
      icon: "diagnostics",
      shortDescription: "Check engine light diagnosis to identify the actual cause before recommending a repair.",
      intro: [
        "A check engine light can mean a lot of different things, from a minor sensor issue to something more serious. We pull the diagnostic codes and inspect the related systems to find the real cause.",
        "We explain what we find in plain language before recommending any repair.",
      ],
      included: [
        "Check engine and warning light diagnosis",
        "Diagnostic trouble code (DTC) scanning",
        "Sensor and emissions component inspection",
        "Drivability and performance diagnosis",
        "Clear explanation of findings and recommended next steps",
      ],
      signs: [
        "The check engine light is on (solid or flashing)",
        "The vehicle is running rough, hesitating, or losing power",
        "Reduced fuel economy with no clear cause",
        "The vehicle recently failed or is due for an emissions check",
        "Any other dashboard warning light you're unsure about",
      ],
      relatedSlugs: ["engine-repair", "auto-electrical-repair", "general-auto-repair"],
    },
    {
      slug: "suspension-repair",
      name: "Suspension Repair",
      icon: "suspension",
      shortDescription: "Suspension inspection and repair for a smoother ride and more predictable handling.",
      intro: [
        "Worn suspension components affect ride comfort, handling, and tire wear. We inspect the full suspension system to identify which components need attention.",
        "We repair common suspension issues on everyday cars, trucks, and SUVs.",
      ],
      included: [
        "Shock and strut inspection and replacement",
        "Control arm and bushing inspection",
        "Ball joint inspection",
        "Sway bar link and bushing inspection",
        "Ride height and general suspension inspection",
      ],
      signs: [
        "A bouncy, rough, or unstable ride",
        "Clunking or knocking noises over bumps",
        "The vehicle pulling or leaning to one side",
        "Uneven tire wear",
        "Nose-diving when braking",
      ],
      relatedSlugs: ["steering-repair", "wheel-alignment", "brake-repair"],
    },
    {
      slug: "steering-repair",
      name: "Steering Repair",
      icon: "steering",
      shortDescription: "Steering system diagnosis and repair for looseness, noise, and hard-to-control steering.",
      intro: [
        "Steering issues can make a vehicle feel unpredictable or physically harder to control. We inspect the steering system, including power steering components, to find the cause.",
        "We repair common steering issues on everyday vehicles.",
      ],
      included: [
        "Power steering fluid and system inspection",
        "Steering rack and linkage inspection",
        "Tie rod end inspection",
        "Steering pump inspection",
        "Steering play and responsiveness check",
      ],
      signs: [
        "Loose, excessive, or vague steering feel",
        "Difficulty turning the steering wheel",
        "Whining or grinding noise when turning",
        "Steering wheel vibration",
        "Fluid leaking near the front wheels",
      ],
      relatedSlugs: ["suspension-repair", "wheel-alignment", "brake-repair"],
    },
    {
      slug: "wheel-alignment",
      name: "Wheel Alignment",
      icon: "alignment",
      shortDescription: "Wheel alignment service to correct pulling, uneven tire wear, and off-center steering.",
      intro: [
        "A proper wheel alignment keeps your vehicle tracking straight and helps your tires wear evenly. We check and adjust alignment angles to manufacturer specification.",
        "Alignment issues are often caused by worn suspension or steering components, which we'll flag if we find them.",
      ],
      included: [
        "Alignment measurement and adjustment",
        "Steering wheel centering",
        "Tire wear pattern inspection",
        "Related suspension and steering component check",
      ],
      signs: [
        "The vehicle pulls to one side while driving straight",
        "The steering wheel is off-center when driving straight",
        "Uneven or rapid tire wear",
        "You recently hit a pothole, curb, or had suspension work done",
      ],
      relatedSlugs: ["suspension-repair", "steering-repair", "brake-repair"],
    },
    {
      slug: "radiator-cooling-system-repair",
      name: "Radiator & Cooling System Repair",
      icon: "cooling",
      shortDescription: "Cooling system diagnosis and repair to help prevent overheating and engine damage.",
      intro: [
        "An overheating engine can cause serious damage quickly. We inspect the radiator, hoses, water pump, and related components to find leaks or failures before they become a bigger problem.",
        "We service cooling systems on everyday cars, trucks, and SUVs.",
      ],
      included: [
        "Radiator inspection and repair",
        "Coolant system leak diagnosis",
        "Water pump inspection",
        "Hose and thermostat inspection",
        "Coolant flush and fluid service",
      ],
      signs: [
        "The temperature gauge reading higher than normal",
        "Steam or fluid leaking from under the hood",
        "A sweet smell from coolant",
        "Low coolant level with no clear cause",
        "The engine overheating"
      ],
      relatedSlugs: ["engine-repair", "ac-heating-repair", "general-auto-repair"],
    },
    {
      slug: "ac-heating-repair",
      name: "AC & Heating Repair",
      icon: "climate",
      shortDescription: "Air conditioning and heating system diagnosis and repair for year-round comfort.",
      intro: [
        "A properly working climate system matters in every season. We diagnose AC and heating issues, from weak airflow to a system that isn't cooling or heating at all.",
        "We service common AC and heating issues on everyday vehicles.",
      ],
      included: [
        "AC performance diagnosis",
        "Refrigerant system inspection",
        "Heating system and heater core inspection",
        "Blower motor and airflow inspection",
        "Cabin air filter check",
      ],
      signs: [
        "Weak or no airflow from the vents",
        "AC blowing warm instead of cold",
        "Heat not working or blowing cold",
        "Unusual smells or noises from the vents",
        "Foggy or slow-clearing windows",
      ],
      relatedSlugs: ["radiator-cooling-system-repair", "auto-electrical-repair", "general-auto-repair"],
    },
    {
      slug: "starter-alternator-repair",
      name: "Starter & Alternator Repair",
      icon: "battery",
      shortDescription: "Starter and alternator diagnosis and repair for no-start and charging system problems.",
      intro: [
        "A vehicle that won't start or a battery that keeps dying often points to the starter or the charging system rather than the battery itself. We test each component to confirm the actual cause.",
        "We repair starter and charging system issues on everyday vehicles.",
      ],
      included: [
        "Starter testing and replacement",
        "Alternator and charging system testing",
        "Battery and battery cable inspection",
        "Drive belt inspection",
        "No-start diagnosis",
      ],
      signs: [
        "A clicking sound when turning the key, but the engine won't start",
        "The engine cranks slowly or takes multiple attempts to start",
        "The battery warning light is on while driving",
        "Dimming headlights or interior lights",
        "The battery repeatedly dies even when it's been replaced",
      ],
      relatedSlugs: ["auto-electrical-repair", "check-engine-light-diagnostics", "general-auto-repair"],
    },
    {
      slug: "general-auto-repair",
      name: "General Auto Repair",
      icon: "wrench",
      shortDescription: "Full-service mechanical auto repair and preventive maintenance for everyday cars, trucks, and SUVs.",
      intro: [
        "Not sure exactly what's wrong, or need something that doesn't fit neatly into one category? We handle general mechanical repair and maintenance across your vehicle's major systems.",
        "We focus on mechanical repair — see our full services list for specifics.",
      ],
      included: [
        "Multi-point vehicle inspection",
        "General mechanical repair and troubleshooting",
        "Preventive maintenance planning",
        "Pre-trip and seasonal vehicle checks",
        "Referral to the right specific service once we've identified the issue",
      ],
      signs: [
        "Something feels, sounds, or smells off, but you're not sure what it is",
        "You want a general inspection before a long trip",
        "You're due for routine maintenance",
        "You want a second opinion on a repair recommendation",
      ],
      relatedSlugs: ["oil-change-preventive-maintenance", "check-engine-light-diagnostics", "engine-repair"],
    },
  ],
} as const;

export type Service = (typeof business.services)[number];
export type ServiceIcon = Service["icon"];

export function getServiceBySlug(slug: string): Service | undefined {
  return business.services.find((service) => service.slug === slug);
}

export function getRelatedServices(service: Service): Service[] {
  return service.relatedSlugs.map((slug) => getServiceBySlug(slug)).filter((s): s is Service => Boolean(s));
}
