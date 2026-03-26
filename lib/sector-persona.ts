import type { RegulationSeed } from "@/lib/catalog";
import { getSectorBaseFromName } from "@/lib/catalog";

const GENERIC_RISKS = [
  "Phishing and social engineering",
  "Personal data leaks",
  "Insecure cloud configurations",
  "Ransomware and downtime",
];

const DENTAL_RISKS = [
  "Patient records in practice management and imaging (OPG/CBCT)",
  "Shared reception PCs and USB sticks from labs",
  "Email/SMS reminders with health data",
  "Retention and erasure of medical files",
  "Subprocessors: hosting, backups, marketing agencies",
  "Bring-your-own-device at chairside or front desk",
];

const MEDICAL_RISKS = [
  "EHR / telemedicine logs and access trails",
  "Medical device and IoT on the network",
  "Referrals and shared care with unclear DPA coverage",
  "Emergency access and break-glass procedures",
];

const LEGAL_RISKS = [
  "Matter files and legal privilege boundaries",
  "Client portal and e-discovery exports",
  "Retention vs. deletion after case closure",
  "Vendor access to document review tools",
];

const ECOMMERCE_RISKS = [
  "Payment data scope (PCI) and tokenization",
  "Marketing pixels and consent",
  "Returns and fraud with identity data",
  "Third-party logistics data sharing",
];

const SOFTWARE_RISKS = [
  "Tenant isolation and key management",
  "CI/CD secrets and production access",
  "Subprocessor register and DPAs",
  "Incident disclosure timelines for customers",
];

const INDUSTRIAL_RISKS = [
  "OT/IT segmentation and remote maintenance",
  "Supplier remote access to equipment",
  "Safety systems touching personal data",
  "Mobile crews and lost devices",
];

/** Concrete risks for SEO + guides — not one-size-fits-all. */
export function getSectorMainRisksForName(sectorName: string): string[] {
  const base = getSectorBaseFromName(sectorName)?.toLowerCase() ?? "";

  if (base.includes("dental") || base.includes("orthodont")) {
    return DENTAL_RISKS;
  }
  if (
    base.includes("medical") ||
    base.includes("hospital") ||
    base.includes("physio") ||
    base.includes("dermatolog") ||
    base.includes("chiropract")
  ) {
    return MEDICAL_RISKS;
  }
  if (
    base.includes("law") ||
    base.includes("notary") ||
    base.includes("legal") ||
    base.includes("tax advisor") ||
    base.includes("accounting")
  ) {
    return LEGAL_RISKS;
  }
  if (
    base.includes("ecommerce") ||
    base.includes("retail") ||
    base.includes("supermarket") ||
    base.includes("marketplace")
  ) {
    return ECOMMERCE_RISKS;
  }
  if (
    base.includes("software") ||
    base.includes("saas") ||
    base.includes("fintech") ||
    base.includes("managed service") ||
    base.includes("cloud")
  ) {
    return SOFTWARE_RISKS;
  }
  if (
    base.includes("construction") ||
    base.includes("logistics") ||
    base.includes("transport") ||
    base.includes("electrician") ||
    base.includes("engineering")
  ) {
    return INDUSTRIAL_RISKS;
  }

  return GENERIC_RISKS;
}

export function getSectorPersonaIntro(sectorName: string): {
  title: string;
  paragraphs: string[];
} {
  const base = getSectorBaseFromName(sectorName)?.toLowerCase() ?? "";

  if (base.includes("dental") || base.includes("orthodont")) {
    return {
      title: `Compliance & security built for dental practices`,
      paragraphs: [
        `Whether you run a single chair or a ${sectorName} network, regulators and patients care about the same thing: who can see health data, how long you keep it, and how you prove it. This page lists only the regulations that apply to your profile—GDPR for patient and staff data, ISO 27001 when insurers or chains ask for an ISMS, cookie rules for your booking widgets and ads, plus sector-specific add-ons where relevant.`,
        `Use the guides below with concrete dental scenarios: imaging archives, lab couriers, hygienist schedules, and marketing campaigns. Each guide is written so a practice manager can prioritize—not generic “IT security” talk.`,
      ],
    };
  }

  if (
    base.includes("medical") ||
    base.includes("clinic") ||
    base.includes("hospital") ||
    base.includes("pharmacy")
  ) {
    return {
      title: `Data protection for ${sectorName} workflows`,
      paragraphs: [
        `Clinical settings combine sensitive health data with busy front desks and third-party systems. The regulations here are filtered for your operational reality: patient rights, processors, international transfers when using cloud EHRs, and security measures proportionate to risk.`,
        `Follow the links per regulation to see sector-specific angles—always with checklists you can turn into evidence, not abstract theory.`,
      ],
    };
  }

  if (base.includes("law") || base.includes("notary") || base.includes("legal")) {
    return {
      title: `Professional secrecy, clients & cybersecurity`,
      paragraphs: [
        `For ${sectorName}, confidentiality overlaps with GDPR processor/controller roles, email archiving, and client portals. Guides emphasize lawful bases, retention, and security measures that stand up to bar or regulator scrutiny—not generic SME advice.`,
        `Pick a regulation to see how it maps to matter files, conflicts checks, and vendor access in your context.`,
      ],
    };
  }

  if (
    base.includes("ecommerce") ||
    base.includes("retail") ||
    base.includes("fashion") ||
    base.includes("electronics")
  ) {
    return {
      title: `Storefront compliance: payments, cookies, CRM`,
      paragraphs: [
        `${sectorName} teams juggle checkout flows, newsletters, and logistics partners. Regulations on this page connect to real stacks: payment gateways, analytics pixels, CRMs, and return fraud—so you can align marketing growth with consent and security.`,
        `Prioritise cookie and tracker hygiene before scaling ad spend: enforcement and chargebacks both punish “growth first, privacy later”. The guides below spell out tag inventories, consent UX, and what to log when you change tools.`,
      ],
    };
  }

  if (
    base.includes("software") ||
    base.includes("saas") ||
    base.includes("fintech") ||
    base.includes("managed service")
  ) {
    return {
      title: `B2B security assurances & regulatory overlap`,
      paragraphs: [
        `Product and ops teams need DPAs, subprocessors, and incident playbooks customers can read. These guides tie GDPR, security standards, and emerging EU rules to how ${sectorName} actually ships software and handles production access.`,
        `When enterprise procurement asks for ISO 27001 or SOC 2, they are buying evidence of operation—change control, access reviews, monitoring—not a PDF library. Use the sector subpages for playbooks and vendor maps before you commit to audit scope.`,
      ],
    };
  }

  return {
    title: `Regulations tailored to ${sectorName}`,
    paragraphs: [
      `Generic compliance text wastes your time. This hub keeps only the frameworks that match how ${sectorName} processes data and faces cyber risk—then explains them with sector vocabulary and next steps you can execute without a marketing department driving traffic: SEO and internal links do the acquisition work.`,
      `Open any regulation card for a full guide that pairs this niche with the law: risks, 30-day plans, FAQs, audit CTA, and tools—structured for Google, AI overviews, and humans skimming on mobile.`,
      `If you are unsure where to start, pick GDPR when you store identifiable client or employee data, ISO 27001 when contracts demand an ISMS, and cookie law when your site runs analytics or ads. NIS2 or DORA may apply depending on sector and size—use the cards only when your profile matches.`,
    ],
  };
}

/** Short line for regulation cards on sector pages (concrete, not boilerplate). */
export function getSectorRegulationFocus(
  sectorName: string,
  regulation: RegulationSeed,
): string {
  const base = getSectorBaseFromName(sectorName)?.toLowerCase() ?? "";
  const slug = regulation.slug;

  const dental = () => {
    if (slug === "gdpr")
      return "Patient records, consent for treatment & marketing, DPA with labs and hosting.";
    if (slug === "iso-27001")
      return "ISMS for insurers, chains, or tenders asking for certified security.";
    if (slug === "cookie-law")
      return "Booking widgets, analytics, chat—consent before non-essential scripts run.";
    if (slug === "nis2")
      return "Incident reporting if you’re an essential operator in your Member State.";
    return regulation.description;
  };

  const legal = () => {
    if (slug === "gdpr")
      return "Client data, conflict checks, retention after matter end, transfers to clients.";
    if (slug === "iso-27001")
      return "Prove confidentiality controls for enterprise clients and cyber insurance.";
    if (slug === "cookie-law")
      return "Lead forms, chatbots, and newsletter pixels on your firm’s site.";
    return regulation.description;
  };

  if (base.includes("dental") || base.includes("orthodont")) return dental();
  if (base.includes("law") || base.includes("notary") || base.includes("legal"))
    return legal();

  if (slug === "gdpr")
    return `Personal data for customers, staff, and suppliers—mapped to how ${sectorName} operates day to day.`;
  if (slug === "iso-27001")
    return `Security management when partners or contracts require demonstrable controls.`;
  if (slug === "cookie-law")
    return `Website trackers, CRM embeds, and consent UX for your market.`;

  return regulation.description;
}

/** Long-form intro block for guide pages — sector + regulation specific. */
export function getGuidePersonaNarrative(
  sectorName: string,
  regulationName: string,
  regulationSlug: string,
): string[] {
  const base = getSectorBaseFromName(sectorName)?.toLowerCase() ?? "";

  if (base.includes("dental") || base.includes("orthodont")) {
    return [
      `In ${sectorName}, ${regulationName} shows up in everyday tools: practice software, radiology storage, WhatsApp reminders, and payroll. This guide frames obligations as chairside and reception workflows—not abstract “company” duties.`,
      regulationSlug === "gdpr"
        ? `Expect concrete angles: health data categories, lawful bases for care vs. marketing, retention of ortho files, and what to put in agreements with labs and marketing agencies.`
        : regulationSlug === "cookie-law"
          ? `Your site likely runs booking, maps, analytics, or ads—here’s how to align banners, CMPs, and logging with enforcement reality.`
          : `You’ll see how ${regulationName} expectations translate into policies, access control, and evidence ${sectorName} can maintain with limited IT staff.`,
    ];
  }

  return [
    `For ${sectorName}, ${regulationName} should read as operational requirements: who touches which data, on which systems, with what safeguards. This guide keeps language specific to your sector so you can reuse sections in policies, RFPs, and training.`,
    `When you compare vendors or answer insurers, you’ll have a structured narrative: risks, controls, and residual gaps—plus the audit CTA when you want hands-on help.`,
  ];
}

/** Coarse vertical for long-form sector subpages (checklist, tools, playbook, etc.). */
export type SectorContentCategory =
  | "dental"
  | "medical"
  | "legal"
  | "ecommerce"
  | "software"
  | "industrial"
  | "hospitality"
  | "other";

export function getSectorContentCategory(
  sectorName: string,
): SectorContentCategory {
  const base = getSectorBaseFromName(sectorName)?.toLowerCase() ?? "";

  if (base.includes("dental") || base.includes("orthodont")) {
    return "dental";
  }
  if (
    base.includes("medical") ||
    base.includes("hospital") ||
    base.includes("physio") ||
    base.includes("dermatolog") ||
    base.includes("chiropract") ||
    base.includes("psychology") ||
    base.includes("imaging center") ||
    base.includes("veterinary") ||
    base.includes("pharmacy") ||
    (base.includes("laboratory") && !base.includes("dental"))
  ) {
    return "medical";
  }
  if (
    base.includes("law") ||
    base.includes("notary") ||
    base.includes("legal") ||
    base.includes("tax advisor") ||
    base.includes("accounting") ||
    base.includes("compliance consultancy")
  ) {
    return "legal";
  }
  if (
    base.includes("ecommerce") ||
    base.includes("retail") ||
    base.includes("supermarket") ||
    base.includes("marketplace") ||
    base.includes("fashion") ||
    base.includes("food retail") ||
    base.includes("subscription ecommerce")
  ) {
    return "ecommerce";
  }
  if (
    base.includes("software") ||
    base.includes("saas") ||
    base.includes("fintech") ||
    base.includes("managed service") ||
    base.includes("cloud") ||
    base.includes("cybersecurity") ||
    base.includes("proptech") ||
    base.includes("insurtech")
  ) {
    return "software";
  }
  if (
    base.includes("hotel") ||
    base.includes("restaurant") ||
    base.includes("catering") ||
    base.includes("travel") ||
    base.includes("resort") ||
    base.includes("gym") ||
    base.includes("fitness") ||
    base.includes("spa") ||
    base.includes("salon")
  ) {
    return "hospitality";
  }
  if (
    base.includes("construction") ||
    base.includes("logistics") ||
    base.includes("transport") ||
    base.includes("electrician") ||
    base.includes("engineering") ||
    base.includes("warehouse") ||
    base.includes("manufacturing") ||
    base.includes("plumber") ||
    base.includes("carpentry") ||
    base.includes("mechanic")
  ) {
    return "industrial";
  }

  return "other";
}
