/**
 * Blog content — structured the same way as business.ts: one typed array
 * that both the /blog index and /blog/[slug] pages render from, so every
 * post gets consistent metadata, schema, and internal linking without
 * duplicating page structure 10 times.
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "image"; label: string }
  | { type: "link"; text: string; href: string };

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  heroImageLabel: string;
  /** Path under /public to a real photo. When absent, the hero renders the labeled placeholder instead. */
  heroImageSrc?: string;
  relatedServiceSlugs: string[];
  relatedPostSlugs: string[];
  body: BlogBlock[];
  faqs: BlogFaqItem[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-is-my-check-engine-light-on",
    title: "Why Is My Check Engine Light On? Common Causes Detroit Drivers Should Know",
    seoTitle: "Why Is My Check Engine Light On? Common Causes | 7 Mile and Hoover",
    metaDescription:
      "A check engine light can mean many things, from a loose gas cap to a serious engine issue. Here's how to tell the difference and what to do next.",
    excerpt:
      "A check engine light can mean a lot of different things. Here's how to tell a minor issue from something that needs attention right away.",
    publishedAt: "2026-07-14",
    category: "Diagnostics",
    heroImageLabel: "Check engine warning light on a dashboard",
    heroImageSrc: "/images/blog/why-is-my-check-engine-light-on.jpg",
    relatedServiceSlugs: ["check-engine-light-diagnostics", "auto-electrical-repair", "engine-repair"],
    relatedPostSlugs: ["common-car-electrical-problems-explained", "why-is-my-car-overheating"],
    body: [
      {
        type: "p",
        text: "In most cases, a check engine light means your vehicle's computer has detected something outside of its normal operating range — it doesn't necessarily mean your car is about to break down. A steady, solid light usually points to a non-urgent issue, like a loose gas cap, a worn sensor, or a minor emissions-related fault. A flashing check engine light is different: it typically signals an active engine misfire, which can damage the catalytic converter if you keep driving. The safest approach is to have the light scanned so you know which situation you're actually dealing with.",
      },
      {
        type: "h2",
        text: "What the Check Engine Light Actually Means",
      },
      {
        type: "p",
        text: "Modern vehicles run dozens of sensors that monitor everything from oxygen levels in the exhaust to engine timing and fuel mixture. When one of these readings falls outside its expected range, the onboard computer stores a diagnostic trouble code (DTC) and turns on the check engine light. The light itself doesn't tell you what's wrong — it's just a signal that something needs to be looked at. Reading the actual code, and understanding the systems connected to it, is what turns that signal into a real answer.",
      },
      {
        type: "h2",
        text: "Common Reasons a Check Engine Light Comes On",
      },
      {
        type: "p",
        text: "Some causes are minor and inexpensive to fix. Others point to something more involved. A few of the most common causes we see include:",
      },
      {
        type: "ul",
        items: [
          "A loose, cracked, or missing gas cap, which affects the fuel system's pressure",
          "A failing oxygen sensor, which affects fuel efficiency and emissions",
          "A worn ignition coil or spark plug, which can cause a misfire",
          "A vacuum leak, which can cause rough idling or hesitation",
          "A failing catalytic converter",
          "Issues with the mass airflow sensor, which affects how the engine measures incoming air",
        ],
      },
      {
        type: "p",
        text: "Because so many different systems can trigger the same light, guessing at the cause rarely saves money. Two vehicles with the exact same warning light on can have completely different problems underneath it.",
      },
      { type: "image", label: "Technician scanning a vehicle for diagnostic trouble codes" },
      {
        type: "h2",
        text: "Solid vs. Flashing: Why the Difference Matters",
      },
      {
        type: "p",
        text: "A solid check engine light means the issue has been detected but isn't considered an immediate danger to the engine. It's still worth having scanned soon, since small issues can develop into bigger ones. A flashing check engine light is more urgent — it usually means the engine is misfiring badly enough that unburned fuel could reach and damage the catalytic converter. If your check engine light is flashing, it's best to reduce your speed, avoid heavy acceleration, and get it looked at as soon as possible rather than continuing to drive normally.",
      },
      {
        type: "h2",
        text: "Other Warning Signs to Pay Attention To",
      },
      {
        type: "p",
        text: "The check engine light rarely appears completely on its own. Paying attention to what else the vehicle is doing can help you describe the issue more clearly when you call a shop:",
      },
      {
        type: "ul",
        items: [
          "Rough idling, hesitation, or a loss of power",
          "A noticeable drop in fuel economy",
          "Unusual engine noise, such as knocking or ticking",
          "A vehicle that recently failed, or is due for, an emissions check",
        ],
      },
      {
        type: "h2",
        text: "Why This Matters for Detroit and Michigan Drivers",
      },
      {
        type: "p",
        text: "Michigan's temperature swings put extra strain on sensors, hoses, and electrical connections, especially heading into and out of winter. Cold starts are harder on the engine and its sensors, and road salt can accelerate corrosion on wiring and connectors near the engine bay. None of that means every check engine light in Detroit is caused by winter — but it's part of why a light that comes and goes with the weather is still worth having scanned rather than ignored.",
      },
      {
        type: "h2",
        text: "What Happens If You Ignore a Check Engine Light",
      },
      {
        type: "p",
        text: "Ignoring a solid check engine light doesn't usually cause immediate damage, but it removes your ability to catch a developing problem while it's still minor. A small vacuum leak or a single failing sensor can, over enough time, put extra strain on other components — an engine running a slightly wrong fuel mixture, for example, can eventually affect the catalytic converter. What starts as an inexpensive fix has a way of becoming a more involved repair if the underlying cause sits unaddressed for months.",
      },
      {
        type: "h2",
        text: "Should You Trust a Free Auto Parts Store Scan?",
      },
      {
        type: "p",
        text: "Many auto parts stores offer a free code scan, and it can be a reasonable first step to see what code is stored. But a code only points to a system or a range of possible causes — it isn't a diagnosis on its own. For example, a code pointing to a misfire doesn't tell you whether the cause is a worn spark plug, a failing ignition coil, or a vacuum leak. A free scan can be a useful starting point, but the actual inspection work is what turns that code into an accurate answer.",
      },
      {
        type: "h2",
        text: "What a Proper Diagnosis Looks Like",
      },
      {
        type: "p",
        text: "At 7 Mile and Hoover Auto Services, a check engine light visit starts with pulling the stored diagnostic codes and inspecting the systems connected to them — not just clearing the light and hoping it doesn't come back. We explain what the code points to in plain language, what we'd recommend, and why, before any repair work begins.",
      },
      {
        type: "p",
        text: "If more than one code is stored, we also look at whether they're related to each other — sometimes several codes trace back to a single root cause, like a vacuum leak affecting multiple sensor readings at once, rather than several unrelated problems needing separate repairs.",
      },
      {
        type: "link",
        text: "See what's included in our Check Engine Light & Diagnostics service",
        href: "/services/check-engine-light-diagnostics",
      },
      {
        type: "p",
        text: "If the underlying cause turns out to be electrical rather than a sensor or mechanical part, we can trace that down as well.",
      },
      {
        type: "link",
        text: "Read more about common car electrical problems and what they usually mean",
        href: "/blog/common-car-electrical-problems-explained",
      },
    ],
    faqs: [
      {
        question: "Can I still drive with the check engine light on?",
        answer:
          "If the light is solid and the vehicle otherwise drives normally, it's usually safe to drive for a short period, but it's still worth having it scanned soon. If the light is flashing, limit driving and have it checked as soon as possible.",
      },
      {
        question: "Will disconnecting the battery turn off the check engine light?",
        answer:
          "Disconnecting the battery can temporarily clear the light, but if the underlying issue is still there, it will come back once the vehicle detects the same fault again. It doesn't fix the actual cause.",
      },
      {
        question: "How much does it cost to find out what's wrong?",
        answer:
          "Cost depends on the vehicle and what the diagnosis involves. Call us with your vehicle's year, make, and model, and we can talk through what a diagnostic visit looks like.",
      },
      {
        question: "Is a check engine light always related to emissions?",
        answer:
          "No. While many causes are emissions-related, a check engine light can also point to issues with the engine's performance, sensors, or electrical system that have nothing to do with emissions testing.",
      },
    ],
  },
  {
    slug: "grinding-squealing-brakes-what-it-means",
    title: "Grinding or Squealing Brakes? Here's What It Means and What to Do",
    seoTitle: "Grinding or Squealing Brakes: Causes & What to Do | 7 Mile and Hoover",
    metaDescription:
      "Squealing, grinding, or a soft brake pedal all mean something different. Here's how to tell what your brakes are trying to tell you.",
    excerpt:
      "Squealing and grinding are two very different warning signs. Here's what each one usually means, and how urgent it is.",
    publishedAt: "2026-07-21",
    category: "Brakes",
    heroImageLabel: "Close-up of a brake caliper and rotor",
    heroImageSrc: "/images/blog/grinding-squealing-brakes-what-it-means.jpg",
    relatedServiceSlugs: ["brake-repair", "suspension-repair", "wheel-alignment"],
    relatedPostSlugs: ["why-is-my-car-pulling-to-one-side", "detroit-potholes-winter-roads-suspension-damage"],
    body: [
      {
        type: "p",
        text: "A high-pitched squeal usually means your brake pads have worn down to their built-in wear indicator and are telling you it's time for a replacement soon. A grinding noise is more serious — it often means the pads are already worn through and metal is contacting metal, which can damage your rotors. The type of noise you're hearing is actually a useful clue, and paying attention to it early can turn an inexpensive pad replacement into the whole story, instead of a bigger repair.",
      },
      {
        type: "h2",
        text: "Squealing Brakes: An Early Warning, Not an Emergency (Yet)",
      },
      {
        type: "p",
        text: "Most brake pads include a small metal wear indicator that's designed to touch the rotor and create a squeal once the pad material gets thin. It's an intentional, built-in warning system. If your brakes squeal only occasionally, especially first thing in the morning or after the car has been sitting in damp weather, it may just be surface rust or moisture on the rotor that clears up after a few stops. But a squeal that's consistent, or gets louder over time, is a sign that a brake inspection shouldn't wait too long.",
      },
      {
        type: "h2",
        text: "Grinding Brakes: Time to Get It Looked At Promptly",
      },
      {
        type: "p",
        text: "A grinding or scraping sound when braking usually means the pad material is gone and the metal backing plate is now grinding directly against the rotor. This can happen faster than expected once a pad crosses that threshold. Continuing to drive on grinding brakes can damage the rotors badly enough that they need to be replaced rather than resurfaced, turning a routine pad job into a larger repair. If you're hearing grinding, it's worth having it inspected soon rather than waiting.",
      },
      { type: "image", label: "Worn brake pad compared to a new brake pad" },
      {
        type: "h2",
        text: "Other Brake Warning Signs Worth Knowing",
      },
      {
        type: "p",
        text: "Noise isn't the only way brakes tell you something's wrong. A few other signs are just as important to pay attention to:",
      },
      {
        type: "ul",
        items: [
          "A soft, spongy, or low brake pedal that sinks further than usual",
          "Vibration or pulsing through the pedal or steering wheel when braking",
          "The vehicle pulling to one side when you brake",
          "A brake warning light on the dashboard",
          "Longer stopping distances than you're used to",
        ],
      },
      {
        type: "p",
        text: "A pulsing pedal often points to a warped rotor rather than the pads themselves, while pulling to one side during braking can point to an issue on just one wheel — a stuck caliper, for example — rather than the whole system.",
      },
      {
        type: "link",
        text: "If pulling happens even when you're not braking, read our guide on why a car pulls to one side",
        href: "/blog/why-is-my-car-pulling-to-one-side",
      },
      {
        type: "h2",
        text: "Do Rotors Always Need to Be Replaced Too?",
      },
      {
        type: "p",
        text: "Not necessarily. If rotors are caught early and are still within a safe thickness, they can sometimes be resurfaced rather than replaced, which is a less expensive option. But rotors that have been driven on while grinding, or that have worn below their minimum safe thickness, usually need to be replaced rather than resurfaced. This is one more reason grinding brakes are worth addressing quickly — the longer metal-on-metal contact continues, the more likely it is that resurfacing is no longer an option.",
      },
      {
        type: "h2",
        text: "How Long Do Brake Pads Actually Last?",
      },
      {
        type: "p",
        text: "There's no single mileage number that applies to every vehicle, because brake wear depends heavily on how and where you drive. Highway-heavy driving with fewer stops is relatively easy on brakes, since the vehicle spends less time actively slowing down. Stop-and-go city driving, frequent short trips, and carrying extra weight all wear pads faster, since the brakes are working harder and more often per mile driven. Driving style matters too — frequent hard braking wears pads down noticeably faster than smooth, early braking.",
      },
      {
        type: "p",
        text: "This is part of why a mileage-based estimate can be misleading. Two identical vehicles driven differently can need brake service at very different intervals. An inspection is a far more reliable way to know where your specific brakes actually stand than guessing based on mileage alone.",
      },
      {
        type: "h2",
        text: "Why Brakes Wear Differently in Detroit",
      },
      {
        type: "p",
        text: "How and where you drive changes how quickly brakes wear. Stop-and-go city driving, frequent short trips, and winter road salt all add up. Salt and moisture can accelerate corrosion on rotors and calipers over a Michigan winter, which is part of why a fall or early-spring brake inspection is a reasonable habit for Detroit drivers, even if nothing sounds wrong yet.",
      },
      {
        type: "h2",
        text: "What a Brake Inspection Actually Covers",
      },
      {
        type: "p",
        text: "A proper brake inspection looks at more than just pad thickness. At 7 Mile and Hoover, that means checking the pads and rotors, brake fluid condition, calipers and hardware, brake lines and hoses, and the parking brake — so if something else is contributing to the noise or the feel of the pedal, it gets caught at the same time instead of being missed.",
      },
      {
        type: "link",
        text: "See what's included in our Brake Repair service",
        href: "/services/brake-repair",
      },
      {
        type: "p",
        text: "Because worn suspension or alignment issues can sometimes mimic or worsen brake symptoms — like pulling or vibration — we'll flag those too if we find them during the inspection.",
      },
    ],
    faqs: [
      {
        question: "Is it safe to drive with squealing brakes?",
        answer:
          "Occasional squealing, especially in damp weather, isn't necessarily an emergency, but consistent or worsening squealing means the pads are wearing down and should be inspected soon.",
      },
      {
        question: "Is it safe to drive with grinding brakes?",
        answer:
          "Grinding usually means the pad material is already gone. It's best to have it inspected promptly to avoid further rotor damage and reduced stopping power.",
      },
      {
        question: "How often should brake pads be replaced?",
        answer:
          "It varies widely based on driving style and conditions rather than a fixed mileage number. City driving with frequent stops wears pads faster than highway driving. An inspection is the most reliable way to know where your pads actually stand.",
      },
      {
        question: "Why do my brakes feel different in the rain or after a car wash?",
        answer:
          "A layer of surface moisture or light surface rust can briefly change how brakes feel or sound, especially after sitting. This usually clears up within the first few stops. If it doesn't clear up, or if it's accompanied by grinding, it's worth having checked.",
      },
      {
        question: "Do all four brakes wear out at the same rate?",
        answer:
          "Not usually. Front brakes typically handle more of the vehicle's stopping force and often wear faster than rear brakes, though this varies by vehicle. That's part of why we inspect all four corners rather than assuming they're even.",
      },
      {
        question: "Can bad brakes affect my steering?",
        answer:
          "A stuck caliper or uneven brake wear on one side can cause the vehicle to pull during braking, which can feel similar to a steering issue. A full inspection can tell the two apart.",
      },
    ],
  },
  {
    slug: "car-wont-start-battery-starter-or-alternator",
    title: "Car Won't Start? How to Tell If It's the Battery, Starter, or Alternator",
    seoTitle: "Car Won't Start: Battery, Starter, or Alternator? | 7 Mile and Hoover",
    metaDescription:
      "A car that won't start could be the battery, starter, or alternator — and they're not the same repair. Here's how to tell them apart.",
    excerpt:
      "A dead battery, a bad starter, and a failing alternator can all leave you stuck — but the fix is different for each one.",
    publishedAt: "2026-07-28",
    category: "Electrical",
    heroImageLabel: "Mechanic testing a car battery under the hood",
    heroImageSrc: "/images/blog/car-wont-start-battery-starter-or-alternator.jpg",
    relatedServiceSlugs: ["starter-alternator-repair", "auto-electrical-repair"],
    relatedPostSlugs: ["common-car-electrical-problems-explained", "why-is-my-check-engine-light-on"],
    body: [
      {
        type: "p",
        text: "The sound your car makes when it won't start is the biggest clue to what's actually wrong. A single click, or no sound at all, often points to the battery or a connection issue. A rapid clicking sound usually means the battery doesn't have enough charge to engage the starter. Slow, labored cranking that eventually starts often points to a weak battery or a charging system that isn't keeping it topped up. Understanding which situation you're in can save you from replacing the wrong part.",
      },
      {
        type: "h2",
        text: "The Battery: The Most Common Culprit",
      },
      {
        type: "p",
        text: "The battery stores the energy needed to start the engine and power electronics before the alternator takes over. Batteries lose capacity gradually, and cold weather makes a weak battery's limitations obvious almost overnight — a battery that started the car fine in September can struggle by December simply because cold temperatures reduce a battery's effective output. Signs pointing toward the battery include slow cranking, dimming interior lights when you try to start the car, and a battery that's more than a few years old.",
      },
      {
        type: "h2",
        text: "The Starter: A Clicking Sound With No Crank",
      },
      {
        type: "p",
        text: "The starter is the small motor that physically turns the engine over when you turn the key or press the start button. When a starter is failing, you may hear a single solid click but the engine doesn't crank at all, or you may need to try the key a few times before it engages. Unlike a weak battery, a failing starter often shows no other symptoms — the lights and radio work fine, but the engine simply doesn't turn over.",
      },
      { type: "image", label: "Starter motor removed from a vehicle for testing" },
      {
        type: "h2",
        text: "The Alternator: Starts Fine, Then Dies Again",
      },
      {
        type: "p",
        text: "The alternator recharges the battery and powers the vehicle's electrical system while the engine runs. A failing alternator often shows a different pattern than a bad battery or starter: the car might start normally but then stall while driving, or the battery keeps dying repeatedly even after being replaced or jump-started. Dimming headlights or interior lights while driving, rather than just at startup, is a common sign that points toward the charging system rather than the battery itself.",
      },
      {
        type: "h2",
        text: "A Quick Way to Compare the Three",
      },
      {
        type: "ul",
        items: [
          "Battery: Slow cranking, dim lights at startup, no sound at all when the battery is very low",
          "Starter: A single click but no cranking, or inconsistent engagement when turning the key",
          "Alternator: Starts okay but the battery keeps dying, or lights dim while driving rather than at startup",
        ],
      },
      {
        type: "p",
        text: "These patterns are useful for describing the problem, but testing is what actually confirms the cause — several of these symptoms can overlap, and a battery that's simply drained by a failing alternator can look a lot like a battery problem on its own.",
      },
      {
        type: "h2",
        text: "What Is a Parasitic Battery Drain?",
      },
      {
        type: "p",
        text: "Sometimes a car won't start not because the battery or starter is failing on its own, but because something is drawing power while the vehicle is off — an interior light that didn't shut off, a failing relay, or an aftermarket accessory that wasn't wired correctly. This is called a parasitic drain, and it shows up as a battery that's fine one day and completely dead the next after sitting for a while, even though it tested fine recently. Finding a parasitic drain takes a bit more diagnostic work than a standard battery test, since it means tracing which circuit is staying active when it shouldn't be.",
      },
      {
        type: "h2",
        text: "Should You Jump-Start It or Call for Help?",
      },
      {
        type: "p",
        text: "A jump-start is a reasonable option if the symptoms point toward a simply drained battery — slow cranking, dim lights, and a vehicle that's been sitting for a while or was left with something on. It's not a good idea if you're hearing a single click with no cranking at all, since that pattern points more toward the starter, and a jump-start won't help a starter that isn't engaging. If a jump-start gets the car running but it dies again shortly after, that's a strong sign the charging system, not the battery, is the real issue.",
      },
      {
        type: "h2",
        text: "Why This Trips Up Michigan Drivers Specifically",
      },
      {
        type: "p",
        text: "Cold starts demand more from a battery than warm ones, since the engine oil is thicker and the chemical reaction inside the battery itself is slower in cold temperatures. That's why a marginal battery that's been fine all year often finally fails on the first genuinely cold morning of the season. It's a timing coincidence more than a separate problem — but it's a good reason to have your charging system checked heading into winter rather than waiting for a no-start morning.",
      },
      {
        type: "h2",
        text: "How We Diagnose a No-Start Condition",
      },
      {
        type: "p",
        text: "Rather than guessing or defaulting to a battery replacement, we test the battery, starter, and charging system individually to confirm which one is actually causing the problem. That includes checking battery voltage and load capacity, testing the starter's draw, and testing alternator output under load.",
      },
      {
        type: "link",
        text: "See what's included in our Starter & Alternator Repair service",
        href: "/services/starter-alternator-repair",
      },
      {
        type: "p",
        text: "If the issue turns out to be a wiring or connection problem rather than one of the three main components, we can trace that down as part of the same visit.",
      },
      {
        type: "link",
        text: "Learn more about common car electrical problems and what they usually mean",
        href: "/blog/common-car-electrical-problems-explained",
      },
    ],
    faqs: [
      {
        question: "My car won't start but the lights and radio work — is it still the battery?",
        answer:
          "Not necessarily. If accessories work but the engine won't crank, it's often the starter rather than the battery, since a starter draws far more current than lights or the radio.",
      },
      {
        question: "Why does my battery keep dying even after I replace it?",
        answer:
          "This is a common sign of a charging system issue, such as a failing alternator, rather than the battery itself. A new battery will keep dying if it isn't being recharged properly while you drive.",
      },
      {
        question: "Can cold weather alone cause a no-start?",
        answer:
          "Cold temperatures reduce a battery's effective capacity and make the engine harder to turn over, so a battery that's already weak is much more likely to fail on a cold morning than on a warm one.",
      },
      {
        question: "Is jump-starting my car bad for it?",
        answer:
          "An occasional jump-start isn't harmful, but if you find yourself needing one repeatedly, that points to an underlying battery or charging system issue that's worth having tested rather than jump-starting repeatedly.",
      },
      {
        question: "How long should a car battery typically last?",
        answer:
          "It varies by battery and driving habits rather than one fixed number, and cold climates tend to shorten a battery's effective lifespan compared to milder ones. If your battery is getting older, having it load-tested before it fails completely is a reasonable precaution.",
      },
    ],
  },
  {
    slug: "why-is-my-car-overheating",
    title: "Why Is My Car Overheating? Common Causes and What to Do Next",
    seoTitle: "Why Is My Car Overheating? Causes & What to Do | 7 Mile and Hoover",
    metaDescription:
      "An overheating engine can cause serious damage fast. Here are the most common causes and what to do if your temperature gauge climbs.",
    excerpt:
      "An overheating engine can turn into serious damage quickly. Here's what commonly causes it and what to do the moment you notice it.",
    publishedAt: "2026-08-04",
    category: "Cooling System",
    heroImageLabel: "Temperature gauge reading in the hot zone",
    heroImageSrc: "/images/blog/why-is-my-car-overheating.jpg",
    relatedServiceSlugs: ["radiator-cooling-system-repair", "engine-repair", "ac-heating-repair"],
    relatedPostSlugs: ["why-is-my-check-engine-light-on", "signs-of-transmission-trouble"],
    body: [
      {
        type: "p",
        text: "An overheating engine almost always comes down to the cooling system losing its ability to move heat away from the engine — usually because of low coolant, a leak somewhere in the system, or a failed component like the water pump or thermostat. If your temperature gauge climbs into the red, the most important thing is to stop driving as soon as it's safe to do so. Continuing to drive an overheating engine, even for a few more minutes, is one of the fastest ways to turn a repairable issue into an expensive one.",
      },
      {
        type: "h2",
        text: "What the Cooling System Is Actually Doing",
      },
      {
        type: "p",
        text: "Your engine generates a tremendous amount of heat, and the cooling system's job is to move that heat away before it causes damage. Coolant circulates through the engine, absorbs heat, and carries it to the radiator, where outside air cools it back down before it circulates again. The water pump keeps coolant moving, the thermostat regulates when and how much flows, and hoses connect all of it together. A failure in any one of these parts can cause the whole system to stop doing its job.",
      },
      {
        type: "h2",
        text: "Common Causes of Overheating",
      },
      {
        type: "ul",
        items: [
          "Low coolant level, often from a slow leak that's easy to miss",
          "A leaking radiator, hose, or water pump",
          "A stuck thermostat that won't open to let coolant flow",
          "A failing water pump that no longer circulates coolant properly",
          "A clogged radiator that can't release heat efficiently",
          "A failed radiator fan",
        ],
      },
      { type: "image", label: "Coolant reservoir and radiator under the hood" },
      {
        type: "h2",
        text: "Warning Signs Before the Gauge Hits the Red",
      },
      {
        type: "p",
        text: "Overheating doesn't always come out of nowhere. There are usually earlier signs that something in the cooling system needs attention:",
      },
      {
        type: "ul",
        items: [
          "The temperature gauge reading higher than normal, even if it's not yet in the red",
          "A sweet smell, which often means a coolant leak",
          "Steam or visible fluid leaking from under the hood",
          "Low coolant level with no obvious explanation",
          "The heater blowing cooler than expected, which can point to a related issue",
        ],
      },
      {
        type: "link",
        text: "If your AC or heater feels off, see our guide on AC blowing warm air",
        href: "/blog/ac-blowing-warm-air-causes",
      },
      {
        type: "h2",
        text: "Can Overheating Happen Even With a Full Coolant Level?",
      },
      {
        type: "p",
        text: "Yes, though it's less common. If coolant level looks fine but the vehicle still overheats, the cause is more likely a mechanical failure rather than a fluid problem — a water pump that's no longer circulating coolant effectively, a thermostat stuck closed so coolant isn't reaching the radiator, or a radiator fan that isn't engaging when it should, especially at low speeds or while idling. This is exactly why a proper diagnosis checks the whole system rather than stopping at the coolant reservoir.",
      },
      {
        type: "h2",
        text: "What to Do If Your Car Starts Overheating",
      },
      {
        type: "p",
        text: "If you notice the temperature gauge climbing, turn off the air conditioning and, if you're stuck in traffic, turning the heater on full blast can actually help pull some heat away from the engine temporarily. Pull over safely as soon as you can and shut the engine off. Don't open the radiator cap while the engine is hot — pressurized, scalding coolant can spray out. Once the engine has cooled, check the coolant level if you're comfortable doing so, but the safest next step is having it towed or inspected rather than continuing to drive on a system you know is compromised.",
      },
      {
        type: "h2",
        text: "Does the Type of Coolant Matter?",
      },
      {
        type: "p",
        text: "Yes — different vehicles are designed around different coolant formulations, and mixing incompatible types can cause the coolant to break down or lose its ability to protect against corrosion. If you're topping off coolant yourself, it's worth confirming it matches what your vehicle already uses rather than grabbing whatever is on the shelf. When in doubt, a 50/50 pre-mixed coolant matched to your vehicle's specification is the safer choice, or you can have it checked and topped off correctly as part of a service visit.",
      },
      {
        type: "h2",
        text: "Can Overheating Be Prevented?",
      },
      {
        type: "p",
        text: "Regular attention to the cooling system is the most effective form of prevention. That means keeping an eye on the coolant level, watching for any of the early warning signs described above, and having the system checked if the vehicle is due for a coolant flush or if you notice anything unusual under the hood. Catching a small leak, a weakening hose, or an aging water pump before it fails completely is far less disruptive than dealing with it on the side of the road.",
      },
      {
        type: "h2",
        text: "Why Cooling Systems Work Harder in Michigan",
      },
      {
        type: "p",
        text: "Detroit summers bring real heat and humidity, which puts extra demand on a cooling system that may already be marginal from winter wear. Meanwhile, winter's freeze-thaw cycles and road salt can accelerate corrosion on metal cooling system components like the radiator and water pump. That combination — hard use in summer, corrosion exposure in winter — is part of why cooling systems in this climate benefit from being checked on a regular basis rather than only after a problem shows up.",
      },
      {
        type: "h2",
        text: "How We Diagnose an Overheating Issue",
      },
      {
        type: "p",
        text: "We inspect the radiator, hoses, water pump, and thermostat, and pressure-test the system to find leaks that aren't always obvious just from looking under the hood. Catching a small leak or an early water pump issue is one of the most effective ways to avoid a much more serious engine repair down the line.",
      },
      {
        type: "link",
        text: "See what's included in our Radiator & Cooling System Repair service",
        href: "/services/radiator-cooling-system-repair",
      },
    ],
    faqs: [
      {
        question: "Can I keep driving if my car is overheating a little?",
        answer:
          "It's best not to. Even a mild overheat can cause damage if it continues, and it's much safer to pull over and let the engine cool than to keep driving and hope it stabilizes.",
      },
      {
        question: "Is it safe to add coolant myself?",
        answer:
          "Only once the engine has fully cooled down, and only if you're comfortable doing so. Never open a hot radiator cap. If you're not sure what's causing the low coolant, it's worth having the system inspected rather than just topping it off repeatedly.",
      },
      {
        question: "Why does my car overheat only in traffic?",
        answer:
          "Overheating that happens mainly at low speeds or idling, but not on the highway, often points to a cooling fan issue, since airflow from driving isn't there to help compensate.",
      },
      {
        question: "What does a sweet smell from my engine mean?",
        answer:
          "A sweet smell is a common sign of a coolant leak. It's worth having the cooling system inspected to find where the leak is coming from before it leads to overheating.",
      },
      {
        question: "How often should coolant be flushed?",
        answer:
          "It depends on the vehicle and coolant type used, rather than one universal number. We can check your coolant's condition as part of an inspection and let you know if a flush is due.",
      },
    ],
  },
  {
    slug: "signs-of-transmission-trouble",
    title: "Signs of Transmission Trouble You Shouldn't Ignore",
    seoTitle: "Signs of Transmission Trouble You Shouldn't Ignore | 7 Mile and Hoover",
    metaDescription:
      "Delayed shifts, slipping gears, or a burning smell can all point to transmission trouble. Here's what to watch for and why it matters.",
    excerpt:
      "A hesitation or a rough shift today can turn into a much bigger repair if it's ignored. Here's what to watch for.",
    publishedAt: "2026-08-11",
    category: "Transmission",
    heroImageLabel: "Driver shifting a manual transmission gear stick",
    heroImageSrc: "/images/blog/signs-of-transmission-trouble.jpg",
    relatedServiceSlugs: ["transmission-repair", "engine-repair", "check-engine-light-diagnostics"],
    relatedPostSlugs: ["why-is-my-check-engine-light-on", "why-is-my-car-overheating"],
    body: [
      {
        type: "p",
        text: "The earliest signs of transmission trouble are usually subtle — a slight hesitation before the car shifts, a gear change that feels rougher than usual, or a delay between pressing the gas and feeling the car respond. These early symptoms are easy to dismiss because the car still drives. But transmission problems tend to get worse, not better, over time, and catching them early is often the difference between a manageable repair and a much larger one.",
      },
      {
        type: "h2",
        text: "Shifting Problems: What They Usually Mean",
      },
      {
        type: "p",
        text: "Automatic transmissions are supposed to shift smoothly and predictably. When that changes, it's worth paying attention:",
      },
      {
        type: "ul",
        items: [
          "Delayed engagement when shifting from park into drive or reverse",
          "Hard or rough shifts between gears",
          "Slipping, where the engine revs up without a matching increase in speed",
          "Gears that seem to hunt or shift unpredictably",
          "Difficulty staying in gear, especially at higher speeds",
        ],
      },
      {
        type: "p",
        text: "Manual transmissions show trouble differently, often through a clutch that feels off, grinding when shifting gears, or difficulty getting into a specific gear.",
      },
      { type: "image", label: "Underside view of a vehicle's transmission" },
      {
        type: "h2",
        text: "Fluid Leaks and Burning Smells",
      },
      {
        type: "p",
        text: "Transmission fluid plays a critical role in cooling and lubricating the internal components, and low or degraded fluid is one of the most common causes of shifting problems. A reddish or brownish fluid leak under the vehicle is worth investigating quickly, since a transmission that's low on fluid can suffer internal damage surprisingly fast. A burning smell is another red flag — it often points to fluid that's overheated or broken down, which reduces its ability to protect the transmission's internal parts.",
      },
      {
        type: "h2",
        text: "Does Every Transmission Problem End in a Rebuild?",
      },
      {
        type: "p",
        text: "Not at all. Many shifting complaints trace back to something far short of a rebuild — low or degraded fluid, a failing sensor that's affecting shift timing, or a mount that's loose and creating a clunk that feels like a shifting problem. A full rebuild or replacement is generally reserved for cases involving internal mechanical damage, which is exactly why a proper diagnosis matters before assuming the worst. Describing exactly what you're feeling, and when it happens, helps narrow down which category the issue falls into.",
      },
      {
        type: "h2",
        text: "Automatic, Manual, and CVT: Different Warning Signs",
      },
      {
        type: "p",
        text: "Not every transmission shows trouble the same way. Traditional automatic transmissions tend to show the delayed engagement, slipping, and rough shifting described above. Continuously variable transmissions, or CVTs, don't have traditional \"gears\" in the same sense, so trouble often shows up as a shuddering or vibrating sensation during acceleration, a whining noise, or the engine revving without a matching increase in speed. Manual transmissions more often show wear through the clutch — a pedal that feels different than it used to, difficulty finding a gear, or grinding during a shift.",
      },
      {
        type: "p",
        text: "Knowing which type of transmission your vehicle has can help you describe what you're noticing more accurately, since \"slipping\" means something slightly different across the three.",
      },
      {
        type: "h2",
        text: "Why Small Symptoms Shouldn't Be Ignored",
      },
      {
        type: "p",
        text: "Transmissions are built with tight tolerances, and issues inside them tend to compound. A hesitation that starts as an occasional annoyance can develop into consistent slipping, and slipping generates heat and wear that makes the underlying problem worse. What might be a fluid service or a relatively contained repair early on can turn into a much larger repair if the transmission continues operating under those conditions for months.",
      },
      {
        type: "h2",
        text: "Detroit Driving Conditions and Your Transmission",
      },
      {
        type: "p",
        text: "Stop-and-go city traffic, which is common throughout Detroit and the surrounding area, puts more wear on an automatic transmission than steady highway driving does, since it shifts far more frequently. Towing, hauling, or frequently driving in stop-and-go conditions all add up over time. None of this means a transmission problem is inevitable — it just means routine fluid service and paying attention to how your vehicle shifts are worth taking seriously rather than assuming everything is fine as long as the car keeps moving.",
      },
      {
        type: "p",
        text: "Cold starts add another layer in a Michigan winter. Transmission fluid, like engine oil, thickens in cold temperatures, which can make shifting feel slightly rougher for the first few minutes after starting the car on a cold morning. That's normal to a point, but if rough shifting continues well after the vehicle has warmed up, that's a different situation and worth having checked rather than assumed to be a cold-weather quirk.",
      },
      {
        type: "h2",
        text: "What We Check During a Transmission Diagnosis",
      },
      {
        type: "p",
        text: "We start by diagnosing the cause of the shifting issue rather than assuming it requires a full rebuild. That includes checking fluid condition and level, looking for leaks, and, on manual transmissions, inspecting the clutch system. Explaining what we find, and what it does and doesn't require, is part of how we approach every visit.",
      },
      {
        type: "link",
        text: "See what's included in our Transmission Repair service",
        href: "/services/transmission-repair",
      },
      {
        type: "p",
        text: "If the shifting issue turns out to be related to the engine's performance rather than the transmission itself, we'll let you know and point you toward the right repair.",
      },
      {
        type: "link",
        text: "Read about common causes behind a check engine light",
        href: "/blog/why-is-my-check-engine-light-on",
      },
    ],
    faqs: [
      {
        question: "Can low transmission fluid really cause shifting problems?",
        answer:
          "Yes. Transmission fluid cools and lubricates the internal components, and low or degraded fluid is one of the most common causes of rough or delayed shifting.",
      },
      {
        question: "Is a burning smell from my transmission serious?",
        answer:
          "It's worth taking seriously. A burning smell often means the transmission fluid has overheated or broken down, which reduces its ability to protect internal components.",
      },
      {
        question: "Do manual transmissions show the same warning signs as automatics?",
        answer:
          "Not exactly. Manual transmissions more often show trouble through the clutch, grinding gears, or difficulty shifting into a specific gear, rather than the slipping or delayed engagement typical of automatics.",
      },
      {
        question: "How often should transmission fluid be serviced?",
        answer:
          "It depends on the vehicle and driving conditions rather than one fixed interval. We can check your fluid condition and let you know what's appropriate for your specific vehicle.",
      },
      {
        question: "Is it normal for a transmission to shift harder when the engine is cold?",
        answer:
          "A slightly firmer shift for the first minute or two after a cold start can be normal, since fluid is thicker when cold. If rough shifting continues once the vehicle is fully warmed up, that's a different situation worth having checked.",
      },
      {
        question: "Does towing damage an automatic transmission?",
        answer:
          "Regular towing or hauling puts extra strain on a transmission, particularly if it's done often or beyond the vehicle's rated capacity. It doesn't guarantee a problem, but it's a reasonable factor to mention when discussing your vehicle's maintenance needs.",
      },
    ],
  },
  {
    slug: "detroit-potholes-winter-roads-suspension-damage",
    title: "How Detroit's Potholes and Winter Roads Wreck Your Suspension",
    seoTitle: "How Detroit Potholes Damage Your Suspension | 7 Mile and Hoover",
    metaDescription:
      "Potholes and Michigan's freeze-thaw winters are hard on suspension components. Here's how the damage happens and what to watch for.",
    excerpt:
      "Freeze-thaw cycles and pothole season are genuinely hard on a vehicle's suspension. Here's what actually happens underneath your car.",
    publishedAt: "2026-08-18",
    category: "Suspension",
    heroImageLabel: "Close-up of a vehicle's strut, coil spring, and control arm",
    heroImageSrc: "/images/blog/detroit-potholes-winter-roads-suspension-damage.jpg",
    relatedServiceSlugs: ["suspension-repair", "wheel-alignment", "steering-repair"],
    relatedPostSlugs: ["why-is-my-car-pulling-to-one-side", "grinding-squealing-brakes-what-it-means"],
    body: [
      {
        type: "p",
        text: "Hitting a pothole sends a sudden, concentrated impact through the tire and into the wheel, suspension, and steering components behind it. A single hard hit can bend a rim, damage a strut, or knock the suspension and alignment out of position — sometimes without any obvious sign until you notice the car pulling or the tires wearing unevenly weeks later. Michigan's freeze-thaw winters make potholes an annual reality, which is part of why suspension wear is such a common topic for drivers in this area.",
      },
      {
        type: "h2",
        text: "How a Pothole Impact Actually Damages Your Vehicle",
      },
      {
        type: "p",
        text: "When a wheel drops into a pothole, the impact is absorbed first by the tire and rim, then by the suspension components connected to that wheel — control arms, ball joints, tie rods, struts, and bushings. A hard enough hit can bend a rim, damage a strut or shock, or shift these components just enough to throw off the vehicle's alignment, even if nothing looks visibly broken. Smaller, repeated impacts add up too, gradually wearing bushings and joints faster than they would on smoother roads.",
      },
      {
        type: "h2",
        text: "Why Michigan Roads Are Particularly Tough on Suspensions",
      },
      {
        type: "p",
        text: "Michigan's winter freeze-thaw cycle is a major reason potholes form in the first place: water seeps into small cracks in the pavement, freezes and expands, and gradually breaks the road surface apart. On top of pothole impacts, winter road salt accelerates corrosion on metal suspension components like tie rod ends, control arm bushings, and strut mounts. The combination of physical impacts and corrosion is why Detroit-area vehicles often need more frequent suspension attention than the same vehicle might in a milder climate.",
      },
      { type: "image", label: "Suspension control arm and bushing inspection" },
      {
        type: "h2",
        text: "Signs Your Suspension Took a Hit",
      },
      {
        type: "ul",
        items: [
          "A bouncy, rough, or unstable ride compared to how the car normally feels",
          "Clunking or knocking noises over bumps",
          "The vehicle pulling or leaning to one side",
          "Uneven tire wear that develops faster than expected",
          "The vehicle nose-diving noticeably when braking",
        ],
      },
      {
        type: "p",
        text: "These symptoms don't always show up immediately after hitting a pothole. Sometimes a component is weakened by the impact and fails gradually over the following weeks, which is why it's worth getting checked even if the car seems to be driving fine right after a hard hit.",
      },
      {
        type: "h2",
        text: "It's Not Just Suspension — Rims and Tires Take a Hit Too",
      },
      {
        type: "p",
        text: "A hard pothole impact often damages more than the suspension. The tire's sidewall can bulge or develop a weak spot from the impact, and the rim itself can bend or crack, especially on lower-profile tires with less cushioning between the road and the wheel. A bent rim can cause a subtle vibration that's easy to mistake for an alignment or balance issue, and a damaged sidewall can fail suddenly later even if it looks fine right after the impact. It's worth having tires and rims looked at along with the suspension after a hard hit, rather than assuming the impact only affected one part of the vehicle.",
      },
      {
        type: "h2",
        text: "A Few Ways to Reduce Pothole Damage",
      },
      {
        type: "p",
        text: "You can't avoid every pothole, especially ones hidden under standing water or revealed suddenly in traffic, but a few habits reduce how hard the impacts hit. Keeping tires properly inflated helps them absorb impact more effectively — an underinflated tire is more prone to rim damage on a hard hit. Slowing down when you see a rough patch of road ahead, and gripping the wheel firmly rather than swerving suddenly, also reduces the severity of an impact and helps you keep control if you do hit one.",
      },
      {
        type: "h2",
        text: "Suspension and Alignment Are Closely Connected",
      },
      {
        type: "p",
        text: "Suspension damage and alignment issues often go hand in hand. A bent or shifted suspension component changes the angles your wheels sit at, which is exactly what alignment measures and corrects. That's why an alignment performed on top of a damaged suspension component won't hold — the underlying part needs to be repaired first, and then the alignment can be corrected to specification.",
      },
      {
        type: "link",
        text: "Learn more in our guide on why a car pulls to one side",
        href: "/blog/why-is-my-car-pulling-to-one-side",
      },
      {
        type: "h2",
        text: "What to Do After Hitting a Bad Pothole",
      },
      {
        type: "p",
        text: "If you hit a pothole hard enough to notice it, it's worth paying closer attention to how the car drives over the next few days — any pulling, new noise, or vibration is worth having checked. Even if nothing feels different right away, a quick suspension inspection can catch a weakened component before it fails.",
      },
      {
        type: "h2",
        text: "How We Inspect Suspension After Pothole Damage",
      },
      {
        type: "p",
        text: "We check shocks and struts, control arms and bushings, ball joints, sway bar links, and overall ride height to identify which components, if any, were affected. If suspension or steering components need attention, we'll flag whether an alignment is needed as part of the same repair.",
      },
      {
        type: "link",
        text: "See what's included in our Suspension Repair service",
        href: "/services/suspension-repair",
      },
    ],
    faqs: [
      {
        question: "I hit a pothole and nothing feels wrong — do I still need it checked?",
        answer:
          "It's still worth a quick inspection. Some suspension damage doesn't show obvious symptoms right away and can develop into a bigger issue, like uneven tire wear or a failed component, over the following weeks.",
      },
      {
        question: "Can a pothole damage my tires as well as my suspension?",
        answer:
          "Yes. A hard impact can damage a tire's sidewall or a rim in addition to the suspension. We focus on mechanical repair and can flag tire damage if we see it during an inspection.",
      },
      {
        question: "Does hitting a pothole always throw off my alignment?",
        answer:
          "Not always, but it's one of the most common causes of sudden alignment issues. A hard enough impact can shift suspension or steering components just enough to change your wheel angles.",
      },
      {
        question: "Why do potholes seem worse in Detroit every spring?",
        answer:
          "Michigan's winter freeze-thaw cycle causes water in small pavement cracks to freeze and expand repeatedly, which breaks the road surface apart and tends to create more potholes heading into spring.",
      },
      {
        question: "How soon after hitting a pothole should I get checked?",
        answer:
          "If you notice any new noise, pulling, or vibration, it's worth scheduling an inspection within the next week or two rather than waiting. If the impact felt severe, sooner is better, even before symptoms appear.",
      },
      {
        question: "Can worn suspension components fail without a pothole impact?",
        answer:
          "Yes. While pothole impacts accelerate wear, suspension bushings, ball joints, and mounts also wear gradually over time and mileage even on smooth roads. Road salt exposure in Michigan winters can speed that gradual corrosion along as well.",
      },
    ],
  },
  {
    slug: "why-is-my-car-pulling-to-one-side",
    title: "Why Is My Car Pulling to One Side? Wheel Alignment Explained",
    seoTitle: "Why Is My Car Pulling to One Side? | 7 Mile and Hoover",
    metaDescription:
      "A car that pulls to one side usually points to alignment, but not always. Here's how to tell what's causing it and when to get it checked.",
    excerpt:
      "Pulling to one side is one of the clearest signs something needs attention — but it isn't always your alignment. Here's how to tell.",
    publishedAt: "2026-08-25",
    category: "Alignment",
    heroImageLabel: "Wheel alignment equipment on a vehicle's front wheel",
    heroImageSrc: "/images/blog/why-is-my-car-pulling-to-one-side.jpg",
    relatedServiceSlugs: ["wheel-alignment", "suspension-repair", "brake-repair"],
    relatedPostSlugs: ["detroit-potholes-winter-roads-suspension-damage", "grinding-squealing-brakes-what-it-means"],
    body: [
      {
        type: "p",
        text: "A car that pulls to one side while driving straight on a flat road is most often caused by a wheel alignment that's out of specification — but it isn't the only possible cause. Uneven tire pressure, a dragging brake caliper, and worn suspension components can all produce a similar pulling sensation. Paying attention to when the pulling happens can help narrow down which one you're actually dealing with.",
      },
      {
        type: "h2",
        text: "Is It Always Obvious When Alignment Is Off?",
      },
      {
        type: "p",
        text: "Not always. A small alignment deviation might not produce a noticeable pull at all, but it can still cause faster tire wear over time simply because the tires aren't meeting the road at the correct angle. This is one of the reasons alignment is often recommended alongside new tires or after suspension work, even without an obvious pulling complaint — catching a mild deviation early protects a brand-new set of tires from wearing unevenly before their time.",
      },
      {
        type: "h2",
        text: "What Wheel Alignment Actually Adjusts",
      },
      {
        type: "p",
        text: "Alignment refers to the angles your wheels sit at relative to the road and to each other — measurements like camber, caster, and toe. When these angles are within specification, the vehicle tracks straight with even, minimal effort at the steering wheel. When they're off, even slightly, the car can pull toward one side, and the tires start wearing unevenly because they're not making contact with the road the way they're supposed to.",
      },
      {
        type: "h2",
        text: "Does Pulling Feel Different Depending on the Cause?",
      },
      {
        type: "p",
        text: "It often does, and paying attention to the details can help narrow things down before your vehicle is even inspected. A steady, consistent pull that's present the moment you start driving usually points toward alignment. A pull that only appears when braking points more toward the brake system. A pull that changes depending on speed, or that's accompanied by vibration, can point toward a tire or wheel balance issue instead. None of these patterns are a substitute for an inspection, but they're useful details to mention when you call.",
      },
      {
        type: "h2",
        text: "Common Causes of Misalignment",
      },
      {
        type: "ul",
        items: [
          "Hitting a pothole, curb, or other hard impact",
          "Worn suspension or steering components, such as tie rod ends or control arm bushings",
          "Recent suspension work that wasn't followed by an alignment check",
          "Normal wear over time, especially on rougher roads",
        ],
      },
      { type: "image", label: "Alignment measurement readout on a shop monitor" },
      {
        type: "h2",
        text: "Signs Your Alignment May Be Off",
      },
      {
        type: "ul",
        items: [
          "The vehicle pulls to one side while driving straight on a flat road",
          "The steering wheel sits off-center when you're driving straight",
          "Uneven or rapid tire wear, especially on the inner or outer edge",
          "You recently hit a pothole or curb, or had suspension work done",
        ],
      },
      {
        type: "h2",
        text: "When Pulling Isn't an Alignment Issue",
      },
      {
        type: "p",
        text: "Alignment isn't the only explanation for pulling, which is why a proper inspection matters before assuming what's wrong:",
      },
      {
        type: "ul",
        items: [
          "Uneven tire pressure between the left and right side can cause a mild pull",
          "A brake caliper that's dragging or sticking on one side can pull the vehicle during braking specifically",
          "Worn or damaged suspension components can cause pulling that alignment alone won't fix",
        ],
      },
      {
        type: "p",
        text: "If pulling only happens when you brake, the cause is more likely in the brake system than the alignment.",
      },
      {
        type: "link",
        text: "Read our guide on grinding or squealing brakes",
        href: "/blog/grinding-squealing-brakes-what-it-means",
      },
      {
        type: "h2",
        text: "A Quick Check Before You Assume It's Alignment",
      },
      {
        type: "p",
        text: "Before assuming the worst, it's worth doing a simple check: look at your tire pressure across all four tires, ideally when the tires are cold. Tire pressure is printed on a sticker inside the driver's door frame, not on the tire itself. If one tire is noticeably lower than the others, that alone can cause a mild pull, and it's a five-minute check that costs nothing. If pressure is even across all four tires and the pulling continues, alignment or a suspension component becomes the more likely explanation.",
      },
      {
        type: "h2",
        text: "Front-Wheel, Rear-Wheel, and All-Wheel Drive: Does It Matter?",
      },
      {
        type: "p",
        text: "Alignment applies to every vehicle regardless of drivetrain, but where problems tend to show up first can differ. Front-wheel-drive vehicles, which make up most of what's on the road, put more alignment-sensitive stress on the front end, since it handles steering, braking, and power delivery all at once. All-wheel-drive vehicles can be more sensitive to even small alignment differences between wheels, since the drivetrain expects all four wheels to be turning at consistent, coordinated rates. This is part of why AWD owners sometimes notice symptoms, like unusual drivetrain noise, a bit sooner than they might in a front-wheel-drive car with the same degree of misalignment.",
      },
      {
        type: "h2",
        text: "What Your Tire Wear Pattern Can Tell You",
      },
      {
        type: "p",
        text: "Tire wear patterns can offer a clue even before an alignment measurement confirms anything. Wear concentrated on the inner edge of the tread often points to excess negative camber, while wear on the outer edge can point the other way. Wear across the whole tread but with a scalloped or feathered feel when you run your hand across it often points to a toe misalignment rather than camber. These patterns aren't a substitute for a real alignment check, but they can help confirm that what you're feeling behind the wheel lines up with what's happening at the tire.",
      },
      {
        type: "h2",
        text: "Why Alignment Issues Are Common in Detroit",
      },
      {
        type: "p",
        text: "Detroit's pothole season and Michigan's freeze-thaw winters are a well-known combination for knocking vehicles out of alignment. Even a moderate pothole impact can shift the suspension components that alignment depends on, and repeated smaller impacts over a Michigan winter add up as well.",
      },
      {
        type: "link",
        text: "Learn more about how potholes and winter roads affect your suspension",
        href: "/blog/detroit-potholes-winter-roads-suspension-damage",
      },
      {
        type: "h2",
        text: "What an Alignment Service Includes",
      },
      {
        type: "p",
        text: "We measure and adjust your alignment angles to manufacturer specification, check for related suspension or steering wear that might be causing or contributing to the issue, and inspect tire wear patterns for additional clues. If a worn component is found, we'll flag it, since correcting alignment on top of a damaged part won't hold.",
      },
      {
        type: "link",
        text: "See what's included in our Wheel Alignment service",
        href: "/services/wheel-alignment",
      },
    ],
    faqs: [
      {
        question: "How do I know if it's my alignment or my tires?",
        answer:
          "Uneven tire wear can be a symptom of misalignment rather than a separate cause. If your tire pressure is even across all four tires and the car still pulls, alignment or a suspension component is the more likely explanation.",
      },
      {
        question: "Does hitting one pothole really require a full alignment?",
        answer:
          "It can. Even a single hard impact can shift suspension components enough to throw off your alignment angles, especially if you notice pulling or off-center steering afterward.",
      },
      {
        question: "Can I just get an alignment without an inspection?",
        answer:
          "You can, but if a suspension or steering component is worn or damaged, the alignment won't hold. That's why we check related components as part of the alignment service.",
      },
      {
        question: "Will an alignment fix tire wear that's already happened?",
        answer:
          "Alignment corrects the cause going forward, but tire wear that's already occurred won't reverse on its own. Addressing the alignment sooner helps limit how much further wear occurs.",
      },
    ],
  },
  {
    slug: "ac-blowing-warm-air-causes",
    title: "AC Blowing Warm Air? Common Causes and When to Get It Checked",
    seoTitle: "AC Blowing Warm Air: Common Causes | 7 Mile and Hoover",
    metaDescription:
      "If your car's AC suddenly blows warm instead of cold, here are the most common causes and what usually needs to happen next.",
    excerpt:
      "Warm air where cold air should be usually points to one of a few specific causes. Here's how to think through what's going on.",
    publishedAt: "2026-08-29",
    category: "AC & Heating",
    heroImageLabel: "Car AC vent close-up",
    heroImageSrc: "/images/blog/ac-blowing-warm-air-causes.jpg",
    relatedServiceSlugs: ["ac-heating-repair", "radiator-cooling-system-repair", "auto-electrical-repair"],
    relatedPostSlugs: ["why-is-my-car-overheating", "common-car-electrical-problems-explained"],
    body: [
      {
        type: "p",
        text: "When a car's air conditioning suddenly blows warm air instead of cold, the most common cause is low refrigerant, usually from a small leak somewhere in the system. It can also point to a failing compressor, an electrical issue affecting the AC system, or a blend door that isn't moving correctly. The AC system is a closed loop, so warm air rarely appears without a specific, identifiable cause behind it.",
      },
      {
        type: "h2",
        text: "Warm Air vs. No Airflow at All: Two Different Problems",
      },
      {
        type: "p",
        text: "It's worth separating two complaints that sometimes get lumped together. Warm air coming from the vents at normal fan strength usually points to the refrigerant system or compressor. Weak or no airflow at all, even if the air is cold, usually points somewhere else entirely — a failing blower motor, a clogged cabin air filter restricting flow, or a blend door that's stuck in the wrong position. Knowing which of the two you're actually experiencing helps point the diagnosis in the right direction from the start.",
      },
      {
        type: "h2",
        text: "How Your Car's AC System Is Supposed to Work",
      },
      {
        type: "p",
        text: "Your vehicle's air conditioning relies on refrigerant circulating through a sealed system, compressed and expanded in a cycle that pulls heat out of the air blowing into the cabin. The compressor drives that cycle, the condenser releases heat, and various sensors and electrical components control when and how the system engages. Because it's a sealed, pressurized system, a drop in performance almost always points to either a leak, a failed component, or an electrical fault somewhere in that chain.",
      },
      {
        type: "h2",
        text: "Common Causes of Warm Air From the AC",
      },
      {
        type: "ul",
        items: [
          "Low refrigerant from a slow leak somewhere in the system",
          "A failing AC compressor, which is what actually drives the cooling cycle",
          "An electrical issue preventing the compressor from engaging",
          "A blend door actuator that's stuck, mixing in warm air even when the AC is on",
          "A failing condenser that can't release heat properly",
        ],
      },
      { type: "image", label: "AC compressor and refrigerant lines under the hood" },
      {
        type: "h2",
        text: "Why AC Problems Can Point to the Cooling System Too",
      },
      {
        type: "p",
        text: "The AC condenser sits near the radiator and shares some airflow and cooling demands with the engine's cooling system. If your AC is behaving oddly and you've also noticed the engine running warmer than usual, it's worth mentioning both when you call, since they can sometimes share a root cause, like a failing cooling fan.",
      },
      {
        type: "link",
        text: "Read our guide on why a car overheats and what to do about it",
        href: "/blog/why-is-my-car-overheating",
      },
      {
        type: "h2",
        text: "Why Refrigerant Work Isn't a DIY Project",
      },
      {
        type: "p",
        text: "Automotive refrigerant is regulated, and handling it requires certified equipment to recover, evacuate, and recharge the system correctly without releasing refrigerant into the atmosphere. Store-bought recharge cans can sometimes offer a short-term improvement, but they don't address a leak, can't tell you how much refrigerant is actually in the system, and in some cases can introduce the wrong type or amount of refrigerant, which creates a bigger problem for whoever services it next. A proper AC service uses the right equipment to evacuate, measure, and recharge the system to the correct specification.",
      },
      {
        type: "h2",
        text: "Why a Leak Needs to Be Found, Not Just Recharged",
      },
      {
        type: "p",
        text: "Refrigerant doesn't get \"used up\" the way fuel does — a properly sealed AC system should hold its refrigerant charge for years. If a system is low, that almost always means refrigerant has escaped somewhere, whether through a small crack in a line, a failing seal, or a worn fitting. Simply recharging the system without finding the leak usually means the same warm-air problem returns within weeks or months, since the refrigerant has somewhere to keep escaping from. Finding and repairing the actual leak is what makes a recharge worth doing.",
      },
      {
        type: "h2",
        text: "When It's an Electrical Issue Instead",
      },
      {
        type: "p",
        text: "Sometimes the AC hardware is fine, but the system that controls it isn't engaging properly. A blown fuse, a failing relay, or a wiring issue can all prevent the compressor from turning on even if refrigerant levels and mechanical components are otherwise healthy. This is one of the reasons a proper AC diagnosis checks the electrical side of the system, not just refrigerant level.",
      },
      {
        type: "h2",
        text: "Why This Matters Year-Round in Michigan",
      },
      {
        type: "p",
        text: "Detroit summers get hot and humid enough that a failing AC system is more than just an inconvenience on a long drive. And because heating and AC share some components in many vehicles, a system that isn't working right in summer can sometimes point to an issue that would also affect your heat later in the year — which matters heading into a Michigan winter.",
      },
      {
        type: "h2",
        text: "What an AC Diagnosis Involves",
      },
      {
        type: "p",
        text: "We check AC performance, inspect the refrigerant system for leaks, test the compressor and related electrical components, and check the blower motor and cabin air filter, since restricted airflow can sometimes be mistaken for a cooling problem. We explain what we find before recommending a repair.",
      },
      {
        type: "link",
        text: "See what's included in our AC & Heating Repair service",
        href: "/services/ac-heating-repair",
      },
    ],
    faqs: [
      {
        question: "Can I just add refrigerant myself to fix warm AC?",
        answer:
          "Adding refrigerant without knowing why the level is low usually only masks the issue temporarily. If there's a leak, it needs to be found and addressed, or the system will lose refrigerant again.",
      },
      {
        question: "Why does my AC work fine at highway speed but not while idling?",
        answer:
          "This pattern can point to a cooling fan issue, since airflow from driving may be compensating for a fan that isn't working properly at low speeds.",
      },
      {
        question: "Does a warm AC always mean a big repair?",
        answer:
          "Not necessarily. Some causes, like a small leak or an electrical connection, are relatively straightforward. A proper diagnosis is what determines whether it's a simple fix or something larger.",
      },
      {
        question: "Is it normal for AC performance to fade over several years?",
        answer:
          "Some gradual performance loss can happen over time, but a sudden change from cold to warm air usually points to a specific issue rather than simple wear, and is worth having checked.",
      },
      {
        question: "Could a dirty cabin air filter be the real problem?",
        answer:
          "A clogged cabin air filter reduces airflow through the vents, which can make the AC feel weaker even if the cooling system itself is working fine. It's a simple, inexpensive thing to check before assuming a bigger repair is needed.",
      },
      {
        question: "Should I run my AC year-round to keep it in good shape?",
        answer:
          "Running the AC occasionally, even in cooler months, helps keep seals and components lubricated and can catch a developing issue before it becomes a problem you notice on the first hot day of summer.",
      },
    ],
  },
  {
    slug: "how-often-should-you-get-an-oil-change",
    title: "How Often Should You Really Get an Oil Change?",
    seoTitle: "How Often Should You Get an Oil Change? | 7 Mile and Hoover",
    metaDescription:
      "The right oil change interval depends on your vehicle and driving habits, not a fixed number. Here's how to think about it.",
    excerpt:
      "The old \"every 3,000 miles\" rule doesn't apply to every vehicle. Here's how to figure out what actually makes sense for yours.",
    publishedAt: "2026-09-01",
    category: "Preventive Maintenance",
    heroImageLabel: "Oil being drained during an oil change",
    heroImageSrc: "/images/blog/how-often-should-you-get-an-oil-change.jpg",
    relatedServiceSlugs: ["oil-change-preventive-maintenance", "general-auto-repair", "engine-repair"],
    relatedPostSlugs: ["signs-of-transmission-trouble", "why-is-my-car-overheating"],
    body: [
      {
        type: "p",
        text: "There's no single correct oil change interval that applies to every vehicle. The right interval depends on your specific vehicle's manufacturer recommendation, the type of oil it uses, and how you actually drive it. The old \"every 3,000 miles\" rule came from an era of older oil formulations and isn't accurate for most modern vehicles, many of which are designed to go considerably longer between changes when using the right oil type.",
      },
      {
        type: "h2",
        text: "Why the Right Interval Depends on Your Vehicle",
      },
      {
        type: "p",
        text: "Modern synthetic oils are formulated to hold up longer than older conventional oils, and manufacturers factor that into their recommended service intervals. Two different vehicles, or even the same vehicle using two different oil types, can have genuinely different appropriate intervals. Rather than relying on a generic number, the most reliable source is your vehicle's owner's manual — or asking a shop what's appropriate for your specific make, model, and oil type.",
      },
      {
        type: "h2",
        text: "What Actually Happens During an Oil Change",
      },
      {
        type: "p",
        text: "Beyond draining the old oil and installing fresh oil and a new filter, a properly done oil change is also a chance to look underneath the vehicle and notice anything else developing — a slow leak, a worn belt, or a hose that's starting to crack. It's a routine service, but it's also one of the more frequent times a vehicle is up on a lift, which makes it a natural point to catch small issues early rather than only after they've become noticeable from the driver's seat.",
      },
      {
        type: "h2",
        text: "\"Normal\" vs. \"Severe\" Driving Conditions",
      },
      {
        type: "p",
        text: "Most manufacturers list two different service schedules: one for normal driving and one for severe conditions. Severe conditions are more common than people realize, and include things like:",
      },
      {
        type: "ul",
        items: [
          "Frequent short trips that don't let the engine fully warm up",
          "Extensive stop-and-go city driving",
          "Extreme heat or cold",
          "Towing or carrying heavy loads regularly",
          "Dusty or dirty driving conditions",
        ],
      },
      {
        type: "p",
        text: "A lot of everyday Detroit driving — short commutes, stop-and-go traffic, and Michigan's seasonal temperature extremes — actually falls closer to the \"severe\" category than people expect, which is worth factoring in when deciding how often to bring your vehicle in.",
      },
      { type: "image", label: "Oil filter and fresh oil ready for an oil change" },
      {
        type: "h2",
        text: "Does the Oil Filter Matter as Much as the Oil?",
      },
      {
        type: "p",
        text: "It's easy to focus entirely on the oil itself, but the filter plays a real role too. Its job is to trap contaminants that build up in the oil as the engine runs, and a filter that's reused or of poor quality can restrict flow or fail to filter effectively, undermining the benefit of fresh oil. A quality filter matched to your vehicle, replaced at every oil change rather than every other one, is a small detail that makes a real difference in how well the fresh oil can do its job.",
      },
      {
        type: "h2",
        text: "Does the Type of Oil Matter for the Interval?",
      },
      {
        type: "p",
        text: "Yes — the oil type your vehicle uses is one of the biggest factors in how long it can safely go between changes. Full synthetic oil generally holds up longer under heat and stress than conventional oil, which is part of why many newer vehicles that call for full synthetic have longer factory-recommended intervals than older vehicles designed around conventional oil. Using a different oil type than what's recommended, or mixing up intervals from a previous vehicle, is a common way people end up on a schedule that doesn't actually match what their current car needs.",
      },
      {
        type: "p",
        text: "If you're not sure what type of oil your vehicle takes or what interval it's designed around, that's a quick and worthwhile question to ask before your next service.",
      },
      {
        type: "h2",
        text: "Signs You Might Be Overdue",
      },
      {
        type: "ul",
        items: [
          "It's been a while since your last service and you're not sure what's due",
          "The oil change or maintenance reminder light is on",
          "You recently bought the vehicle and don't know its service history",
          "You've noticed a general decline in how the vehicle runs",
          "You're preparing for a long trip",
        ],
      },
      {
        type: "h2",
        text: "Why Oil Changes Matter More Than They Seem",
      },
      {
        type: "p",
        text: "Oil does more than just lubricate the engine's moving parts — it also helps carry heat away and keeps contaminants suspended so they don't build up on critical surfaces. Oil that's overdue for a change gradually loses its ability to do all of that, and an engine running on old, degraded oil experiences more wear than one running on fresh oil. That extra wear accumulates quietly, which is exactly why staying on a reasonable schedule matters more than it might seem day to day.",
      },
      {
        type: "h2",
        text: "What's Included in a Proper Oil Change Visit",
      },
      {
        type: "p",
        text: "At 7 Mile and Hoover, an oil change visit is also a chance to catch small issues early. Along with the oil and filter change, we check fluid levels, do a visual inspection of belts and hoses, check tire pressure, and do a general multi-point inspection — so if something else needs attention, you'll know about it while it's still manageable.",
      },
      {
        type: "link",
        text: "See what's included in our Oil Change & Preventive Maintenance service",
        href: "/services/oil-change-preventive-maintenance",
      },
      {
        type: "p",
        text: "If you're not sure what your vehicle is due for, or you've inherited a vehicle with an unclear service history, a general inspection is a reasonable place to start.",
      },
      {
        type: "link",
        text: "Learn more about our General Auto Repair service",
        href: "/services/general-auto-repair",
      },
    ],
    faqs: [
      {
        question: "Is the 3,000-mile rule still accurate?",
        answer:
          "Not for most modern vehicles. Many manufacturers now recommend longer intervals, especially with synthetic oil. Your owner's manual or a shop familiar with your vehicle is a more reliable guide than the old rule of thumb.",
      },
      {
        question: "Does short-trip city driving really count as severe?",
        answer:
          "Often, yes. Frequent short trips don't give the engine time to fully warm up, which is one of the conditions manufacturers classify as severe driving, along with heavy stop-and-go traffic.",
      },
      {
        question: "What happens if I go too long between oil changes?",
        answer:
          "Oil gradually loses its ability to lubricate and protect the engine as it breaks down, which leads to more wear over time. In more extreme cases, badly neglected oil can contribute to serious engine damage.",
      },
      {
        question: "Do electric or hybrid vehicles still need oil changes?",
        answer:
          "Hybrid vehicles with a gasoline engine still need oil changes on a schedule appropriate to that engine. Fully electric vehicles don't use engine oil the same way, but still have other maintenance needs.",
      },
      {
        question: "Can I go by the dashboard reminder light instead of a set schedule?",
        answer:
          "Many modern vehicles calculate a maintenance reminder based on actual driving conditions rather than a flat mileage number, which can be a reasonably reliable guide. It's still worth confirming it lines up with your manufacturer's recommendation, especially if the vehicle is older or the reminder has ever been reset incorrectly.",
      },
    ],
  },
  {
    slug: "common-car-electrical-problems-explained",
    title: "Common Car Electrical Problems and What They Usually Mean",
    seoTitle: "Common Car Electrical Problems Explained | 7 Mile and Hoover",
    metaDescription:
      "Flickering lights, blown fuses, and dead power windows can all point to different electrical issues. Here's how to make sense of them.",
    excerpt:
      "Flickering lights, blown fuses, and dead accessories can all point to different underlying issues. Here's how to think through them.",
    publishedAt: "2026-09-05",
    category: "Electrical",
    heroImageLabel: "Vehicle fuse box being inspected",
    heroImageSrc: "/images/blog/common-car-electrical-problems-explained.jpg",
    relatedServiceSlugs: ["auto-electrical-repair", "starter-alternator-repair", "check-engine-light-diagnostics"],
    relatedPostSlugs: ["car-wont-start-battery-starter-or-alternator", "why-is-my-check-engine-light-on"],
    body: [
      {
        type: "p",
        text: "Modern vehicles rely on complex electrical systems to run everything from headlights to the engine's own sensors, which means an electrical problem can show up in a lot of different, sometimes unrelated-looking ways. Flickering lights, blown fuses, and dead power accessories are three of the most common complaints, and while they can share a root cause, they don't always. Understanding the pattern of what's happening is the first step toward a real diagnosis rather than a guess.",
      },
      {
        type: "h2",
        text: "Flickering or Dimming Lights",
      },
      {
        type: "p",
        text: "Lights that flicker, dim, or seem inconsistent often point to the charging system or a loose connection rather than the bulb itself. If lights dim specifically when you're idling or accelerating, that pattern can point toward the alternator or battery. If it's isolated to one specific light, a corroded socket or a failing bulb is more likely.",
      },
      {
        type: "link",
        text: "If you're also having trouble starting the car, read our guide on battery, starter, and alternator symptoms",
        href: "/blog/car-wont-start-battery-starter-or-alternator",
      },
      {
        type: "h2",
        text: "Fuses That Keep Blowing",
      },
      {
        type: "p",
        text: "A fuse is designed to blow when too much current passes through a circuit, protecting the wiring and components behind it. A fuse that blows once might be a coincidence, but a fuse that blows repeatedly means something in that circuit is drawing too much current — a short, a failing component, or damaged wiring. Simply replacing the fuse over and over without finding the underlying cause isn't a real fix, and can occasionally make the problem worse.",
      },
      { type: "image", label: "Close-up of an automotive fuse box with fuses removed" },
      {
        type: "h2",
        text: "Power Windows, Locks, and Other Accessories",
      },
      {
        type: "p",
        text: "When a power window, lock, or similar accessory stops working, the cause can range from something mechanical, like a worn window regulator, to something purely electrical, like a bad switch, motor, or wiring connection. If multiple accessories on the same side of the vehicle stop working at once, that pattern often points toward a shared wiring issue rather than several unrelated part failures.",
      },
      {
        type: "h2",
        text: "Do Electrical Problems Get Worse Over Time?",
      },
      {
        type: "p",
        text: "Often, yes. A connector that's slightly corroded will typically get more corroded, not less, especially with continued exposure to moisture and road salt. A wire with a small amount of chafing against a bracket will usually wear through further rather than stopping on its own. This is part of why an intermittent electrical issue is worth addressing when it's still occasional, rather than waiting for it to become constant or to take out a fuse, module, or component downstream of the original fault.",
      },
      {
        type: "h2",
        text: "Aftermarket Add-Ons Can Create New Electrical Issues",
      },
      {
        type: "p",
        text: "Aftermarket accessories — stereos, remote starters, trailer wiring, alarm systems, and similar add-ons — are a common source of electrical gremlins, especially if they weren't installed cleanly. A poorly grounded accessory, a tapped wire that was spliced incorrectly, or a component drawing more current than the circuit was designed for can all cause symptoms that look like they're coming from somewhere else entirely, like a parasitic battery drain overnight or a flickering dashboard light. If your electrical issue started around the same time an accessory was installed, that's a useful detail worth mentioning.",
      },
      {
        type: "h2",
        text: "Intermittent Problems Are the Hardest to Pin Down",
      },
      {
        type: "p",
        text: "Electrical issues that come and go are notoriously frustrating, both for drivers and for diagnosis, because the fault isn't always present when the vehicle is being tested. A loose connection that only misbehaves when it's cold, or a wire that only shorts out when it flexes a certain way, can take longer to isolate than a problem that's constant. Being able to describe when the issue happens — cold mornings, after driving over a bump, only when it rains — gives a real head start on tracking it down.",
      },
      {
        type: "h2",
        text: "Why Michigan Weather Complicates Electrical Issues",
      },
      {
        type: "p",
        text: "Road salt and moisture are hard on electrical connectors and wiring, especially in areas exposed to the elements underneath the vehicle. Corrosion can create exactly the kind of intermittent, hard-to-pin-down electrical issue described above — working fine most of the time, then acting up after a wet or salty drive. It's a reasonable part of why electrical gremlins seem to show up more often as a Michigan winter goes on.",
      },
      {
        type: "h2",
        text: "How We Approach an Electrical Diagnosis",
      },
      {
        type: "p",
        text: "Rather than guessing, we test the actual circuit involved — checking wiring, fuses, connections, and the components themselves — to find the real cause. That includes checking the battery, starter, and charging system when relevant, since a lot of electrical symptoms trace back to the vehicle's core power system.",
      },
      {
        type: "link",
        text: "See what's included in our Auto Electrical Repair service",
        href: "/services/auto-electrical-repair",
      },
      {
        type: "p",
        text: "If the issue is tied to a warning light on the dashboard, we start there and work outward from the stored diagnostic information.",
      },
      {
        type: "link",
        text: "Read our guide on common check engine light causes",
        href: "/blog/why-is-my-check-engine-light-on",
      },
    ],
    faqs: [
      {
        question: "Why do multiple electrical issues seem to show up at once?",
        answer:
          "Sometimes unrelated issues just happen to appear around the same time. Other times, several symptoms trace back to one shared cause, like a weak battery or a corroded ground connection, which is why a full diagnosis matters.",
      },
      {
        question: "Is it safe to keep replacing a fuse that blows repeatedly?",
        answer:
          "No — a fuse that blows repeatedly is protecting a circuit from a real underlying problem. Repeatedly replacing it without finding the cause can allow damage to continue.",
      },
      {
        question: "Can cold weather cause electrical problems on its own?",
        answer:
          "Cold weather doesn't usually create a new problem, but it can make an existing weak connection, corroded terminal, or marginal battery show symptoms it wasn't showing during warmer months.",
      },
      {
        question: "Why is my electrical problem hard to reproduce at the shop?",
        answer:
          "Intermittent electrical issues can depend on temperature, moisture, or specific conditions like driving over a bump. Describing exactly when the issue happens helps narrow down the cause even if it isn't happening at that exact moment.",
      },
      {
        question: "Can a bad ground connection really cause this many different symptoms?",
        answer:
          "Yes. A vehicle's electrical system relies on solid ground connections throughout, and a single corroded or loose ground point can affect multiple, seemingly unrelated components at once, which is why tracing the actual circuit matters more than replacing parts individually.",
      },
      {
        question: "Should I be worried about a single flickering dashboard light?",
        answer:
          "A single flickering light is worth keeping an eye on, but it isn't necessarily urgent on its own. If it's joined by other symptoms, like dimming elsewhere or trouble starting, that combination is worth having looked at sooner.",
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(post: BlogPost): BlogPost[] {
  return post.relatedPostSlugs.map((slug) => getBlogPostBySlug(slug)).filter((p): p is BlogPost => Boolean(p));
}

export function getSortedBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}
