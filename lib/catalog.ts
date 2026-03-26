export type SeedSector = {
  name: string;
  slug: string;
  mainRisks: string[];
};

export type RegulationSeed = {
  name: string;
  slug: string;
  description: string;
  country: string;
};

const sectorBases = [
  "Dental clinic",
  "Law firm",
  "Tax consulting",
  "Medical center",
  "Psychology practice",
  "Insurance company",
  "HR consulting",
  "Fashion ecommerce",
  "Health ecommerce",
  "Marketing agency",
  "Real estate agency",
  "Construction company",
  "Renovation company",
  "Carpentry workshop",
  "Electrician",
  "Plumber",
  "Mechanic workshop",
  "Car dealership",
  "Driving school",
  "Online academy",
  "Private school",
  "Nursery",
  "Gym",
  "Sports center",
  "Hotel",
  "Restaurant",
  "Catering",
  "Supermarket",
  "Pharmacy",
  "Laboratory",
  "Veterinary clinic",
  "Beauty clinic",
  "Hair salon",
  "Beauty center",
  "Administrative services",
  "Notary office",
  "Architecture firm",
  "Engineering company",
  "Logistics",
  "Transport",
  "Courier service",
  "Telecommunications",
  "B2B software",
  "Financial SaaS",
  "Fintech",
  "Proptech",
  "Insurtech",
  "Human resources",
  "Call center",
  "Contact center",
  "Optician",
  "Physiotherapy clinic",
  "Dental laboratory",
  "Accounting firm",
  "Recruitment agency",
  "Travel agency",
  "Hospital",
  "Electronics ecommerce",
  "Food logistics",
  "Cloud managed services",
  "Education center",
  "Fitness studio",
  "Auto parts workshop",
  "Legal consulting",
  "Insurance broker",
  "Dental practice",
  "Dermatology clinic",
  "Chiropractic clinic",
  "Medical imaging center",
  "Veterinary hospital",
  "Pharmacy retail",
  "Mental wellness center",
  "Hair studio",
  "Beauty spa",
  "Clinic group",
  "Investment broker",
  "Mortgage broker",
  "Insurance brokerage firm",
  "Fintech startup",
  "Fintech payments platform",
  "Cybersecurity software",
  "IT managed services",
  "Cloud security software",
  "SaaS platform",
  "Marketplace ecommerce",
  "Subscription ecommerce",
  "Food retail",
  "Electronics retailer",
  "Electronics distributor",
  "Online marketplace",
  "Employment law firm",
  "Corporate law firm",
  "Tax advisor",
  "Legal consulting firm",
  "Compliance consultancy",
  "Manufacturing engineering company",
  "Food processing plant",
  "Chemical plant engineering",
  "Logistics warehouse",
  "Transport operator",
  "Telecommunications provider",
  "Professional training academy",
  "Education and training institute",
  "Fitness training center",
  "Tech support call center",
  "Customer contact center",
  "HR outsourcing firm",
  "Resort hotel",
  "Restaurant group",
  "Travel services company",
  "Catering business",
  "Car dealership network",
  "Nonprofit organization",
  "Government contractor",
  "Managed service provider",
  "Podcast production studio",
  "Video production company",
  "Influencer marketing agency",
  "Crypto exchange platform",
  "Blockchain consultancy",
  "Coffee roastery",
  "Craft brewery",
  "Winery",
  "Farm shop",
  "Artisan bakery",
  "Yoga studio",
  "Pilates studio",
  "Crossfit gym",
  "Martial arts school",
  "Pet grooming salon",
  "Pet boarding kennel",
  "Dog training school",
  "Funeral home",
  "Translation agency",
  "Interpretation services",
  "Coworking space operator",
  "Shared office provider",
  "Event venue",
  "Wedding planner agency",
  "Photovoltaic installer",
  "Solar panel installer",
  "HVAC contractor",
  "Roofing contractor",
  "Locksmith service",
  "Physical security installer",
  "Boat charter company",
  "Marina services",
  "Aviation services company",
  "Commercial drone operator",
  "Museum",
  "Art gallery",
  "Theater company",
  "Publishing house",
  "News media outlet",
  "Agricultural cooperative",
  "Fishery company",
  "Forestry services",
  "Waste management company",
  "Recycling facility",
  "Cleaning services company",
  "Facilities management firm",
  "Property management company",
  "Landscaping business",
  "Interior design studio",
  "Photography studio",
  "Music school",
  "Dance academy",
  "Tattoo studio",
  "Barbershop",
  "Nail salon",
  "Florist shop",
  "Jewelry retailer",
  "Antique dealer",
  "Auction house",
  "Auction platform",
  "Bicycle shop",
  "Sports equipment retailer",
  "Outdoor adventure company",
  "Ski resort services",
  "Camping ground operator",
  "Hostel",
  "Bed and breakfast",
  "Food truck business",
  "Ghost kitchen operator",
  "Microbrewery taproom",
  "Wine bar",
  "Coffee shop chain",
  "Bakery cafe",
  "Butcher shop",
  "Fishmonger retail",
  "Organic farm shop",
  "Aquaculture farm",
  "Greenhouse agriculture",
  "Seed supplier",
  "Veterinary pharmacy",
  "Medical device distributor",
  "Home care agency",
  "Elderly care residence",
  "Childcare center",
  "Tutoring center",
  "Language school",
  "Coding bootcamp",
  "Executive coaching firm",
  "Career counseling service",
  "Market research agency",
  "UX research consultancy",
  "Brand design agency",
  "PR agency",
  "SEO agency",
  "Performance marketing agency",
];

const nicheSuffixes = [
  "independent",
  "chain",
  "franchise",
  "multi-location",
];

const genericRisks = [
  "Phishing and social engineering",
  "Personal data leaks",
  "Insecure cloud configurations",
  "Ransomware and downtime",
];

export function toSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildSeedSectors(): SeedSector[] {
  const list = sectorBases.flatMap((base) =>
    nicheSuffixes.map((suffix) => {
      const name = `${base} ${suffix}`;
      return {
        name,
        slug: toSlug(name),
        mainRisks: genericRisks,
      };
    }),
  );
  return list.sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
  );
}

const seedRegulationsUnsorted: RegulationSeed[] = [
  {
    name: "GDPR",
    slug: "gdpr",
    description:
      "EU General Data Protection Regulation (GDPR) covering personal data, rights, lawful bases, and accountability.",
    country: "EU",
  },
  {
    name: "ISO 27001",
    slug: "iso-27001",
    description:
      "International standard for information security management systems (ISMS), risk-based controls, and continuous improvement.",
    country: "Global",
  },
  {
    name: "Cookie Law",
    slug: "cookie-law",
    description:
      "Rules for consent, cookies, and similar tracking technologies on websites (including disclosures and consent management).",
    country: "Spain",
  },
  {
    name: "NIS2 Directive",
    slug: "nis2",
    description:
      "EU Directive (2022/2555) setting higher common cybersecurity resilience and incident-reporting requirements.",
    country: "EU",
  },
  {
    name: "DORA Regulation",
    slug: "dora",
    description:
      "EU Regulation (2022/2554) on digital operational resilience for the financial sector.",
    country: "EU",
  },
  {
    name: "ISO 22301",
    slug: "iso-22301",
    description:
      "Standard for risk-based business continuity management systems (BCP/BCMS).",
    country: "Global",
  },
  {
    name: "ISO 27017",
    slug: "iso-27017",
    description:
      "Guidance for cloud security controls aligned with ISO/IEC 27001 and shared responsibility principles.",
    country: "Global",
  },
  {
    name: "SOC 2",
    slug: "soc-2",
    description:
      "SOC 2 Type II report focusing on security and operational transparency controls.",
    country: "Global",
  },
  {
    name: "PCI DSS",
    slug: "pci-dss",
    description:
      "Security standard for protecting cardholder data for organizations that process payments.",
    country: "Global",
  },
  {
    name: "LOPDGDD",
    slug: "spanish-lopdgdd",
    description:
      "Spain’s Organic Law 3/2018 on Data Protection and Digital Rights (LOPDGDD).",
    country: "Spain",
  },
  {
    name: "ePrivacy Directive",
    slug: "eprivacy",
    description:
      "EU rules on confidentiality of communications, electronic marketing, and tracking-related privacy in electronic communications.",
    country: "EU",
  },
  {
    name: "Digital Services Act (DSA)",
    slug: "dsa",
    description:
      "Framework for online platforms: transparency, risk management, notice-and-action processes, and accountability.",
    country: "EU",
  },
  {
    name: "Digital Markets Act (DMA)",
    slug: "dma",
    description:
      "Rules affecting gatekeepers in digital markets: compliance obligations, contestability, and transparency.",
    country: "EU",
  },
  {
    name: "ISO 27701",
    slug: "iso-27701",
    description:
      "Privacy Information Management System extension aligned with ISO/IEC 27001.",
    country: "Global",
  },
  {
    name: "ISO 27018",
    slug: "iso-27018",
    description:
      "Protection of personally identifiable information (PII) in public clouds aligned with ISO/IEC 27002.",
    country: "Global",
  },
  {
    name: "IEC 62443",
    slug: "iec-62443",
    description:
      "Industrial automation and control systems security standard with risk-based security requirements.",
    country: "Global",
  },
  {
    name: "Medical Device Regulation (MDR)",
    slug: "mdr",
    description:
      "EU medical device regulation with requirements that impact quality, data handling, and cybersecurity considerations.",
    country: "EU",
  },
  {
    name: "ISO 27002",
    slug: "iso-27002",
    description:
      "Control catalog for information security: mapping objectives into implementable security controls.",
    country: "Global",
  },
  {
    name: "ISO 27005",
    slug: "iso-27005",
    description:
      "Risk management guidance for information security, including risk assessment and treatment planning.",
    country: "Global",
  },
  {
    name: "NIST Cybersecurity Framework (NIST CSF)",
    slug: "nist-csf",
    description:
      "A cybersecurity framework for organizing and improving security outcomes with a common language.",
    country: "US",
  },
  {
    name: "CIS Controls",
    slug: "cis-controls",
    description:
      "A prioritized set of cybersecurity best practices focused on practical, measurable implementation.",
    country: "US",
  },
  {
    name: "SOC 3",
    slug: "soc-3",
    description:
      "A public SOC report summarizing service organization controls based on Trust Services Criteria.",
    country: "Global",
  },
  {
    name: "HIPAA (US) Privacy Rule",
    slug: "hipaa",
    description:
      "US health information privacy requirements for protecting protected health information (PHI).",
    country: "US",
  },
];

/** Regulations sorted A–Z by display name (for hubs, SEO lists, and consistent URLs in sitemap). */
export const seedRegulations: RegulationSeed[] = [...seedRegulationsUnsorted].sort(
  (a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
);

export const affiliateTools = [
  {
    name: "Cookiebot",
    description: "Cookie consent management and automated cookie scanning.",
    href: "https://www.cookiebot.com/?ref=securebiz-org",
  },
  {
    name: "NordLayer",
    description: "Secure access with enterprise VPN and Zero Trust.",
    href: "https://nordlayer.com/?ref=securebiz-org",
  },
  {
    name: "1Password Business",
    description: "Secure credential management and shared secrets for teams.",
    href: "https://1password.com/business/?ref=securebiz-org",
  },
];

const commonRegulationSlugs = [
  // Core compliance and security building blocks
  "gdpr", // GDPR
  "iso-27001",
  "iso-27002",
  "iso-27005",
  "cookie-law", // Cookie Law
  "spanish-lopdgdd",
  "nist-csf",
  "cis-controls",
  "eprivacy",
  "iso-22301",
  "iso-27701",
  "iso-27017",
  "soc-2",
  "soc-3",
  "iso-27018",
  "hipaa",
] as const;

type SectorCategory =
  | "healthcare"
  | "finance"
  | "ecommerce"
  | "software"
  | "legal"
  | "industrial"
  | "education"
  | "contact-center"
  | "hr"
  | "hospitality"
  | "other";

export function getSectorBaseFromName(sectorName: string): string | null {
  // sectorName is `${base} ${suffix}`; match the longest base first.
  const candidates = sectorBases
    .map((b) => ({ base: b, len: b.length }))
    .sort((a, b) => b.len - a.len);
  for (const c of candidates) {
    if (sectorName.startsWith(c.base)) return c.base;
  }
  return null;
}

function categorizeSectorBase(base: string | null): SectorCategory {
  if (!base) return "other";

  const b = base.toLowerCase();

  // Healthcare (broad but practical)
  if (
    b.includes("dental") ||
    b.includes("medical") ||
    b.includes("hospital") ||
    b.includes("pharmacy") ||
    b.includes("laboratory") ||
    b.includes("veterinary") ||
    b.includes("physiotherapy") ||
    b.includes("psychology") ||
    b.includes("beauty") ||
    b.includes("hair") ||
    b.includes("clinic") ||
    b.includes("wellness")
  ) {
    return "healthcare";
  }

  // Finance + regulated
  if (
    b.includes("fintech") ||
    b.includes("financial") ||
    b.includes("insurance") ||
    b.includes("insurtech") ||
    b.includes("broker")
  ) {
    return "finance";
  }

  // Software & platforms
  if (b.includes("software") || b.includes("managed services")) {
    return "software";
  }

  // E-commerce and payments-heavy
  if (
    b.includes("ecommerce") ||
    b.includes("supermarket") ||
    b.includes("electronics") ||
    b.includes("food")
  ) {
    return "ecommerce";
  }

  // Legal / professional services
  if (
    b.includes("law") ||
    b.includes("notary") ||
    b.includes("tax") ||
    b.includes("accounting") ||
    b.includes("legal") ||
    b.includes("administrative")
  ) {
    return "legal";
  }

  // Education/training
  if (
    b.includes("school") ||
    b.includes("academy") ||
    b.includes("nursery") ||
    b.includes("education") ||
    b.includes("driving") ||
    b.includes("fitness")
  ) {
    return "education";
  }

  // Contact centers / support
  if (b.includes("call center") || b.includes("contact center")) {
    return "contact-center";
  }

  // HR and recruitment
  if (b.includes("hr") || b.includes("human resources") || b.includes("recruitment")) {
    return "hr";
  }

  // Industrial / OT leaning
  if (
    b.includes("construction") ||
    b.includes("engineering") ||
    b.includes("logistics") ||
    b.includes("transport") ||
    b.includes("courier") ||
    b.includes("electrician") ||
    b.includes("plumber") ||
    b.includes("carpentry") ||
    b.includes("mechanic") ||
    b.includes("auto parts") ||
    b.includes("telecommunications")
  ) {
    return "industrial";
  }

  // Hospitality/retail/service
  if (
    b.includes("hotel") ||
    b.includes("restaurant") ||
    b.includes("catering") ||
    b.includes("travel") ||
    b.includes("car dealership") ||
    b.includes("insurance broker")
  ) {
    return "hospitality";
  }

  return "other";
}

export function getRegulationSlugsForSectorName(
  sectorName: string,
): string[] {
  const base = getSectorBaseFromName(sectorName);
  const category = categorizeSectorBase(base);

  const categorySpecific: Record<SectorCategory, string[]> = {
    healthcare: ["nis2", "mdr"],
    finance: ["nis2", "dora", "dma"],
    ecommerce: ["pci-dss", "nis2"],
    software: ["dsa", "dma", "nis2"],
    legal: ["nis2"],
    industrial: ["iec-62443"],
    education: ["nis2"],
    "contact-center": ["nis2"],
    hr: ["nis2"],
    hospitality: [],
    other: [],
  };

  // Filter out unknown slugs safely (we only keep ones present in seedRegulations).
  const known = new Set(seedRegulations.map((r) => r.slug));
  const extra = (categorySpecific[category] ?? []).filter((s) => known.has(s));

  return [...commonRegulationSlugs.filter((s) => known.has(s)), ...extra];
}

export function getRegulationSeedsForSectorName(
  sectorName: string,
): typeof seedRegulations {
  const slugs = getRegulationSlugsForSectorName(sectorName);
  const map = new Map(seedRegulations.map((r) => [r.slug, r]));
  return slugs.map((slug) => map.get(slug)).filter(Boolean) as typeof seedRegulations;
}

export function getRegulationSeedsForSectorSlug(
  sectorSlug: string,
): typeof seedRegulations {
  const sector = buildSeedSectors().find((s) => s.slug === sectorSlug);
  if (!sector) return [];
  return getRegulationSeedsForSectorName(sector.name);
}

export function isRegulationAllowedForSectorSlug(
  sectorSlug: string,
  regulationSlug: string,
): boolean {
  const regs = getRegulationSeedsForSectorSlug(sectorSlug);
  return regs.some((r) => r.slug === regulationSlug);
}
