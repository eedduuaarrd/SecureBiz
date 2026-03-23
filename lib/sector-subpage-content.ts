import type { SectorContentCategory } from "@/lib/sector-persona";
import { getSectorContentCategory } from "@/lib/sector-persona";

export const SECTOR_SUBPAGE_SLUGS = [
  "checklist",
  "tools-stack",
  "playbook-30",
  "data-map",
  "vendors-dpias",
] as const;

export type SectorSubpageSlug = (typeof SECTOR_SUBPAGE_SLUGS)[number];

export function isSectorSubpageSlug(value: string): value is SectorSubpageSlug {
  return (SECTOR_SUBPAGE_SLUGS as readonly string[]).includes(value);
}

export type SectorSubpageSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type SectorSubpageDocument = {
  title: string;
  description: string;
  sections: SectorSubpageSection[];
};

function section(
  heading: string,
  paragraphs: string[],
  bullets?: string[],
): SectorSubpageSection {
  return { heading, paragraphs, bullets };
}

function buildChecklist(
  sectorName: string,
  cat: SectorContentCategory,
): SectorSubpageDocument {
  const common = [
    section(
      "Governance & accountability",
      [
        `Assign a single owner for privacy and security decisions at ${sectorName} (even part-time). Document who approves subprocessors, who signs DPAs, and who declares incidents.`,
        `Keep a one-page “rules of use” for staff devices, passwords, and customer data—signed on onboarding.`,
      ],
      [
        "Named responsible person + deputy",
        "Annual review date in the calendar",
        "List of systems that hold personal data (see also Data map page)",
      ],
    ),
  ];

  if (cat === "dental") {
    return {
      title: `${sectorName} — GDPR & security checklist (dental)`,
      description: `Actionable checklist for ${sectorName}: patient records, imaging, labs, marketing, and access control—aligned with GDPR and common ISO 27001 evidence.`,
      sections: [
        section(
          "Patient & clinical data",
          [
            `Map every place ${sectorName} stores health data: practice management, imaging servers, cloud backup, email, and USB exports to labs.`,
            `Verify lawful basis for treatment vs. marketing (newsletters, recall SMS, social promos).`,
          ],
          [
            "Retention: how long you keep radiographs and minors’ records",
            "Consent artefacts for cosmetic photo use",
            "Lab file transfer: email vs. portal vs. courier USB",
          ],
        ),
        section(
          "Access & devices",
          [
            "Reception vs. clinical roles: least-privilege in your PMS.",
            "MFA on cloud email and remote access; no shared generic logins.",
            "Encryption on laptops that leave the site (treatment fairs, home visits).",
          ],
        ),
        section(
          "Website & marketing",
          [
            "Cookie banner + CMP before non-essential scripts (analytics, ads, chat).",
            "Privacy notice linked from booking and contact forms.",
          ],
        ),
        ...common,
        section(
          "Incidents & breaches",
          [
            `Define who calls the DPA/patient if ${sectorName} loses a device or mis-sends records. Keep a simple log: date, what happened, mitigation.`,
          ],
          ["72h clock for personal data breaches under GDPR", "Backup restore test once per quarter"],
        ),
      ],
    };
  }

  if (cat === "medical") {
    return {
      title: `${sectorName} — compliance & security checklist (healthcare)`,
      description: `Sector-specific checklist for ${sectorName}: EHR access, telehealth, referrals, devices, and processors.`,
      sections: [
        section(
          "Clinical & administrative data",
          [
            `Separate flows for ${sectorName}: emergency access, referrals, and billing. Document which identifiers go to each system.`,
            "Telehealth: recording policy, consent, and where session metadata lives.",
          ],
          [
            "Break-glass access audited monthly",
            "Inter-hospital transfers: legal basis + security",
          ],
        ),
        section(
          "Devices & medical tech",
          [
            "Inventory networked devices; patch or isolate legacy equipment.",
            "Guest Wi‑Fi segmented from clinical VLAN.",
          ],
        ),
        ...common,
      ],
    };
  }

  if (cat === "legal") {
    return {
      title: `${sectorName} — GDPR & confidentiality checklist (legal)`,
      description: `Checklist for ${sectorName}: matter files, conflicts, client portals, retention, and law-firm security expectations.`,
      sections: [
        section(
          "Client & matter data",
          [
            `Classify what ${sectorName} holds: identity, financial, special categories, and third-party bundles from clients.`,
            "Retention tied to matter type + limitation periods; secure destruction workflow.",
          ],
          [
            "Conflict checks logged without excessive duplication of personal data",
            "Chinese walls where teams cannot share certain matters",
          ],
        ),
        section(
          "Communications",
          [
            "Encryption for sensitive instructions; policy on consumer apps (WhatsApp) if used.",
            "Email archiving that meets e-discovery obligations.",
          ],
        ),
        ...common,
      ],
    };
  }

  if (cat === "ecommerce") {
    return {
      title: `${sectorName} — privacy & security checklist (commerce)`,
      description: `Operational checklist for ${sectorName}: checkout, CRM, pixels, logistics, and fraud.`,
      sections: [
        section(
          "Customer & order data",
          [
            `For ${sectorName}, tie each data field to purpose: account, fulfilment, marketing, analytics.`,
            "Minimize data in support tickets; redact where possible.",
          ],
          [
            "Returns and fraud: ID checks vs. data minimization",
            "Newsletter: double opt-in where appropriate",
          ],
        ),
        section(
          "Payments & partners",
          [
            "PCI scope: who touches card numbers; prefer hosted fields/tokenization.",
            "Logistics partners: DPAs and address data retention.",
          ],
        ),
        ...common,
      ],
    };
  }

  if (cat === "software") {
    return {
      title: `${sectorName} — product security & privacy checklist`,
      description: `B2B checklist for ${sectorName}: tenants, keys, incidents, subprocessors, and customer-facing assurances.`,
      sections: [
        section(
          "Product & production",
          [
            `Map environments for ${sectorName}: dev/stage/prod; secrets in vault; no long-lived keys in repos.`,
            "Customer data residency and backup regions documented.",
          ],
          [
            "Pen test or bug bounty cadence",
            "SOC2/ISO evidence hooks if customers request them",
          ],
        ),
        section(
          "Customer trust",
          [
            "Subprocessor list + change notification process.",
            "Incident comms template with regulatory timelines.",
          ],
        ),
        ...common,
      ],
    };
  }

  if (cat === "industrial") {
    return {
      title: `${sectorName} — site & field security checklist`,
      description: `Checklist for ${sectorName}: crews, contractors, OT/IT, and personal data on job sites.`,
      sections: [
        section(
          "People & access",
          [
            `ID badges, visitor logs, and contractor DPAs for ${sectorName} sites.`,
            "Personal data in work orders, customer signatures, and vehicle tracking.",
          ],
        ),
        section(
          "Systems",
          [
            "Remote maintenance jump boxes; VPN split tunneling policy.",
            "Mobile device loss procedure for tablets used on site.",
          ],
        ),
        ...common,
      ],
    };
  }

  if (cat === "hospitality") {
    return {
      title: `${sectorName} — guest data & security checklist`,
      description: `Hospitality-focused checklist for ${sectorName}: bookings, loyalty, staff, CCTV, and payments.`,
      sections: [
        section(
          "Guest & loyalty data",
          [
            `For ${sectorName}, map PMS, channel manager, spa booking, and marketing tools.`,
            "Retention for no-show disputes and loyalty history.",
          ],
        ),
        section(
          "Premises",
          [
            "CCTV signage and retention; staff areas vs. public.",
            "Wi‑Fi portals: what you log and for how long.",
          ],
        ),
        ...common,
      ],
    };
  }

  return {
    title: `${sectorName} — GDPR & security checklist`,
    description: `Practical checklist tailored to ${sectorName}: data you hold, access, vendors, and incidents.`,
    sections: [
      section(
        "Know your data",
        [
          `List categories of personal data ${sectorName} processes (customers, staff, suppliers).`,
          "Identify systems of record and shadow IT (spreadsheets, personal phones).",
        ],
      ),
      section(
        "Rights & transparency",
        [
          "Privacy notice and process for access/erasure requests.",
          "Contract clauses with processors.",
        ],
      ),
      ...common,
    ],
  };
}

function buildToolsStack(
  sectorName: string,
  cat: SectorContentCategory,
): SectorSubpageDocument {
  const base = {
    title: `${sectorName} — recommended tools stack (orientation)`,
    description: `Non-exhaustive stack ideas for ${sectorName}: align tools with GDPR, security, and how your team actually works.`,
    sections: [] as SectorSubpageSection[],
  };

  if (cat === "dental") {
    base.sections = [
      section(
        "Practice & imaging",
        [
          `Choose a PMS and imaging stack where ${sectorName} can show access logs and EU/EEA hosting if patients ask.`,
          "Prefer integration over CSV exports to random desktops.",
        ],
        [
          "Practice management / EHR with role-based access",
          "PACS or imaging cloud with encryption in transit",
          "Encrypted backup with tested restore",
        ],
      ),
      section(
        "Identity & devices",
        [
          "Managed Microsoft/Google tenant with MFA enforced.",
          "Endpoint protection on reception PCs and laptops.",
        ],
      ),
      section(
        "Website & consent",
        [
          "CMP + tag inventory for analytics/ads.",
          "HTTPS everywhere; separate booking subdomain if needed.",
        ],
      ),
    ];
    return base;
  }

  if (cat === "software") {
    base.sections = [
      section(
        "Dev & secrets",
        [
          `For ${sectorName}: Git hosting with branch protection; secret scanning; CI that blocks leaked keys.`,
        ],
        ["Vault or cloud KMS", "SSO for prod consoles", "Immutable audit logs"],
      ),
      section(
        "Observability & IR",
          ["Central logging, alerting, on-call runbooks, customer status page."],
      ),
    ];
    return base;
  }

  base.sections = [
    section(
      "Core stack patterns",
      [
        `Document which tools ${sectorName} uses for email, files, CRM/support, and finance—each is a subprocessor under GDPR.`,
        "Prefer vendors with EU data residency options and SSO/MFA.",
      ],
      [
        "Identity provider (SSO)",
        "MDM for company devices",
        "Backup + offline recovery test",
      ],
    ),
    section(
      "Website & analytics",
      [
        "Tag manager + consent; minimize third-party scripts on logged-in areas.",
      ],
    ),
  ];
  return base;
}

function buildPlaybook30(
  sectorName: string,
  cat: SectorContentCategory,
): SectorSubpageDocument {
  const weeks = [
    section(
      "Days 1–7: inventory",
      [
        `Week one for ${sectorName}: list data, systems, and external parties. No new tools until you know what you already leak.`,
      ],
      [
        "Stakeholder interview: front office + IT + owner",
        "Export user list from main SaaS tools",
        "Sketch network diagram even if rough",
      ],
    ),
    section(
      "Days 8–14: quick wins",
      [
        "Enable MFA everywhere; remove shared accounts.",
        "Turn on encryption for laptops and phones that touch customer data.",
      ],
    ),
    section(
      "Days 15–21: policies & notices",
      [
        "Privacy notice + internal acceptable use; cookie banner if you run marketing tags.",
        cat === "dental"
          ? "Dental-specific: radiograph retention note and marketing consent split."
          : "Align retention tables with real business needs.",
      ],
    ),
    section(
      "Days 22–30: evidence & review",
      [
        `Schedule a 60-minute review at ${sectorName}: what changed, what’s still open, and whether you need ISO scope or external audit.`,
      ],
      [
        "Incident tabletop (lost phone scenario)",
        "Vendor DPA folder + renewal dates",
      ],
    ),
  ];

  return {
    title: `${sectorName} — 30-day implementation playbook`,
    description: `A realistic 30-day sequence for ${sectorName}: inventory, quick wins, policy, and evidence—not generic “compliance project” fluff.`,
    sections: weeks,
  };
}

function buildDataMap(
  sectorName: string,
  cat: SectorContentCategory,
): SectorSubpageDocument {
  return {
    title: `${sectorName} — data map (RoPA-style)`,
    description: `How to document processing activities for ${sectorName}: purposes, categories, recipients, and transfers—ready for GDPR Article 30 style records.`,
    sections: [
      section(
        "Processing activities table",
        [
          `For each row, ${sectorName} should answer: what activity, whose data, why (lawful basis), where stored, who receives it, how long kept, how secured.`,
        ],
        [
          "Example row: “Customer support email” → identity + contract data → contract/legitimate interests → O365 EU → 24 months → TLS + MFA",
          "Example row: “Payroll” → employees → legal obligation → HR SaaS → 7y tax → access control",
        ],
      ),
      section(
        "Special cases",
        [
          cat === "dental" || cat === "medical"
            ? "Health data: note lawful basis for care vs. research vs. marketing separately."
            : cat === "legal"
              ? "Matter files: privilege vs. processor access; export controls."
              : `Highlight high-risk processing for ${sectorName} (profiling, automated decisions, large-scale sensitive data).`,
        ],
      ),
      section(
        "Transfers",
        [
          "If any tool stores data in the US or other third countries, document SCCs/DPA and transfer impact assessment where needed.",
        ],
      ),
    ],
  };
}

function buildVendorsDpias(
  sectorName: string,
  cat: SectorContentCategory,
): SectorSubpageDocument {
  return {
    title: `${sectorName} — vendors, DPAs & DPIAs`,
    description: `Processor governance for ${sectorName}: when you need a DPA, how to prioritize DPIAs, and what to ask vendors before you sign.`,
    sections: [
      section(
        "Processor register",
        [
          `Maintain a live list: vendor, service, data categories, region, DPA signed date, renewal, exit plan.`,
          `For ${sectorName}, include any “free” tools marketing adopted without IT review.`,
        ],
      ),
      section(
        "DPIA triggers",
        [
          "Large-scale sensitive data, systematic monitoring, automated decisions with legal effects, new invasive tech.",
          cat === "dental"
            ? "Examples: new patient app with geolocation; AI triage; cross-border imaging cloud."
            : `Examples relevant to ${sectorName}: new CRM with scoring; biometric access; extensive CCTV analytics.`,
        ],
      ),
      section(
        "Security questions to ask",
        [
          "SOC2/ISO reports, pen test summaries, subprocessors, breach notification SLA, data deletion certification.",
        ],
        [
          "Who at vendor answers incidents at night?",
          "Can you get export on exit in machine-readable form?",
        ],
      ),
    ],
  };
}

export function getSectorSubpageDocument(
  sectorName: string,
  subSlug: SectorSubpageSlug,
): SectorSubpageDocument {
  const cat = getSectorContentCategory(sectorName);

  switch (subSlug) {
    case "checklist":
      return buildChecklist(sectorName, cat);
    case "tools-stack":
      return buildToolsStack(sectorName, cat);
    case "playbook-30":
      return buildPlaybook30(sectorName, cat);
    case "data-map":
      return buildDataMap(sectorName, cat);
    case "vendors-dpias":
      return buildVendorsDpias(sectorName, cat);
  }
}

export function getSectorSubpageLabel(slug: SectorSubpageSlug): string {
  const labels: Record<SectorSubpageSlug, string> = {
    checklist: "Checklist",
    "tools-stack": "Tools & stack",
    "playbook-30": "30-day playbook",
    "data-map": "Data map",
    "vendors-dpias": "Vendors & DPIAs",
  };
  return labels[slug];
}

export function getSectorSubpageContext(
  sectorName: string,
  subSlug: SectorSubpageSlug,
): { title: string; paragraphs: string[] } {
  if (subSlug === "checklist") {
    return {
      title: `How to use this checklist in ${sectorName}`,
      paragraphs: [
        `Run it with operations and whoever owns tooling in ${sectorName}. Mark each point as done / partial / unknown and attach one evidence item per done control.`,
        "Avoid policy-only progress. If a control is \"done\", there should be a log, ticket, screenshot, or contract to prove it.",
      ],
    };
  }
  if (subSlug === "tools-stack") {
    return {
      title: `How to decide tools for ${sectorName}`,
      paragraphs: [
        "Choose the minimum stack that gives auditability: identity, access, backups, and vendor governance before adding extra dashboards.",
        "Every new tool adds data transfers and contractual obligations. Consolidation often improves both security and compliance.",
      ],
    };
  }
  if (subSlug === "playbook-30") {
    return {
      title: `How to run the 30-day playbook`,
      paragraphs: [
        `Treat week goals as non-negotiable checkpoints for ${sectorName}. If a week slips, re-scope the next week instead of skipping evidence tasks.`,
        "The objective is momentum with proof, not perfect documentation on day 30.",
      ],
    };
  }
  if (subSlug === "data-map") {
    return {
      title: `How to keep your data map alive`,
      paragraphs: [
        `For ${sectorName}, update the map on every new vendor, process, or form field. Stale maps create false confidence and bad incident response.`,
        "Link each row to a real owner and a review cadence so it survives staff turnover.",
      ],
    };
  }
  return {
    title: `How to use vendor and DPIA governance`,
    paragraphs: [
      `For ${sectorName}, treat this page as your procurement security baseline: no DPA, no production data.`,
      "High-risk processing should trigger DPIA-style review before launch, not after customer complaints.",
    ],
  };
}
