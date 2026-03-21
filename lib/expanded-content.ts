/**
 * Long-form, reusable copy for hubs and regulation pages (SEO + usefulness).
 * Keep factual tone; not legal advice.
 */

export type RegulationNarrativeExtra = {
  /** Extra intro paragraphs after the regulation description */
  deepDiveParagraphs: string[];
  /** Practical evidence artefacts reviewers expect */
  evidenceBullets: string[];
  /** What teams get wrong early */
  pitfalls: string[];
  /** 3–6 month rollout framing */
  phases: { title: string; bullets: string[] }[];
};

const DEFAULT_EXTRA: RegulationNarrativeExtra = {
  deepDiveParagraphs: [
    "Implementation is rarely a single project: it is recurring decisions—who approves a new vendor, how you log access, how you test backups, and how you prove training happened. The sector guides below translate the framework into workflows, not slide decks.",
    "Use the search box to match your real business type. Adjacent sectors often share 70–80% of the same controls; the remaining gap is vocabulary and evidence format (e.g. clinical vs retail vs SaaS).",
  ],
  evidenceBullets: [
    "Records of processing or equivalent system inventory",
    "Risk assessments tied to decisions (not generic “high/medium/low” without context)",
    "Vendor list with contracts, review dates, and exit criteria",
    "Incident log with timelines—even near-misses teach your process",
  ],
  pitfalls: [
    "Buying a tool before mapping data flows (you duplicate work and overspend).",
    "Policies that nobody operationalizes into tickets, access reviews, or drills.",
    "Treating security as “IT only” when legal, ops, and leadership sign contracts and priorities.",
  ],
  phases: [
    {
      title: "Month 1 — visibility",
      bullets: [
        "Inventory systems and owners; separate test from production where possible.",
        "List subprocessors and critical user journeys (signup, payment, support).",
      ],
    },
    {
      title: "Months 2–3 — control & proof",
      bullets: [
        "MFA, least privilege, backup restore tests, logging for sensitive actions.",
        "Document decisions: why this vendor, why this retention period.",
      ],
    },
    {
      title: "Ongoing — review",
      bullets: [
        "Quarterly access reviews; annual policy sanity check after major product changes.",
        "Tabletop incident exercise at least once per year for critical scenarios.",
      ],
    },
  ],
};

const BY_SLUG: Partial<Record<string, Partial<RegulationNarrativeExtra>>> = {
  rgpd: {
    deepDiveParagraphs: [
      "GDPR is not only “privacy policy text”: it is demonstrable governance—lawful bases, data subject rights, retention, DPIAs when appropriate, and breach timelines. Sector guides focus on where personal data actually lives in your stack.",
      "Controllers vs processors: many SMBs are both. The guides call out when you must flow obligations into contracts and when you must prove internal segregation of duties.",
    ],
    evidenceBullets: [
      "RoPA / processing inventory with business owners per system",
      "Privacy notices aligned to actual data uses (marketing vs service delivery)",
      "DSAR playbook: identity checks, extension rules, secure delivery channel",
      "Breach log with 72h assessment discipline (even if many events are non-reportable)",
    ],
    pitfalls: [
      "Consent as a catch-all lawful basis when contract or legitimate interest fits better.",
      "Retention “forever” because storage is cheap—creates disproportionate risk.",
    ],
  },
  "iso-27001": {
    deepDiveParagraphs: [
      "ISO 27001 is about a living ISMS: scope, risk treatment, operation, performance evaluation, and improvement. Certification is optional; many buyers care about evidence of operation even before an audit badge.",
      "Align security investment to client contracts and incident scenarios—not every control is relevant on day one.",
    ],
    evidenceBullets: [
      "ISMS scope statement tied to services and locations",
      "Risk register with owners, treatment plans, and residual risk acceptance",
      "Internal audit and management review records",
      "Supplier security assessments for critical processors",
    ],
    pitfalls: [
      "Treating ISO as a documentation project without measurable control operation.",
      "Ignoring shadow IT that holds client data outside approved systems.",
    ],
  },
  "llei-cookies": {
    deepDiveParagraphs: [
      "Cookie and tracker rules intersect marketing, analytics, and product. Practical work is tag inventory, consent state, and logging changes—especially when agencies add pixels without security review.",
      "Mobile apps and embedded webviews must follow the same transparency principles as classic websites.",
    ],
    evidenceBullets: [
      "Tag manager inventory with categories (essential, analytics, ads, social)",
      "Consent records and versioning when banner text or categories change",
      "Links to privacy/cookie info from every lead capture surface",
    ],
    pitfalls: [
      "Pre-ticked non-essential categories or bundling consent with terms acceptance only.",
      "Loading heavy trackers before consent on high-traffic landing pages.",
    ],
  },
  nis2: {
    deepDiveParagraphs: [
      "NIS2 raises the bar for governance, supply-chain security, and incident reporting in scope sectors and entity sizes. National transposition details vary—treat guides as operational preparation, not a substitute for jurisdiction-specific legal review.",
      "Management bodies often have explicit oversight expectations: training evidence and sign-off on risk treatments matter.",
    ],
    evidenceBullets: [
      "Cyber risk management policy aligned to business impact scenarios",
      "Incident reporting runbooks with escalation and regulator notification steps",
      "Supply chain review for critical ICT providers",
    ],
    pitfalls: [
      "Assuming “we are too small” without checking national thresholds and sector rules.",
      "Reporting channels that bypass security—duplicated chaos during incidents.",
    ],
  },
  dora: {
    deepDiveParagraphs: [
      "DORA targets financial entities and critical ICT third parties. Operational resilience, incident reporting, and third-party concentration risk are central—maps closely to board-level ICT oversight expectations.",
      "If you are a fintech or critical vendor to banks, your customers may flow contractual audits into your roadmap.",
    ],
    evidenceBullets: [
      "ICT risk management framework with testing (e.g. penetration tests, resilience tests)",
      "Contractual exit and substitutability analysis for critical platforms",
      "Incident communication templates for customers and regulators where applicable",
    ],
    pitfalls: [
      "Over-relying on a single cloud region or provider without resilience testing.",
    ],
  },
  "soc-2": {
    deepDiveParagraphs: [
      "SOC 2 is trust service criteria mapped to your real control environment—security is table stakes; availability and confidentiality often matter for B2B SaaS buyers.",
      "Evidence is change management, access, monitoring, and vendor due diligence—not generic policy PDFs alone.",
    ],
    evidenceBullets: [
      "Change tickets linked to releases; emergency change post-mortems",
      "Logical access reviews and termination checklists",
      "Monitoring alerts with runbooks for common incident types",
    ],
    pitfalls: [
      "Control language that does not match how engineers actually ship code.",
    ],
  },
};

export function getRegulationNarrativeExtra(
  slug: string,
): RegulationNarrativeExtra {
  const patch = BY_SLUG[slug];
  return {
    deepDiveParagraphs: [
      ...(patch?.deepDiveParagraphs ?? []),
      ...DEFAULT_EXTRA.deepDiveParagraphs,
    ],
    evidenceBullets: [...(patch?.evidenceBullets ?? []), ...DEFAULT_EXTRA.evidenceBullets],
    pitfalls: [...(patch?.pitfalls ?? []), ...DEFAULT_EXTRA.pitfalls],
    phases: patch?.phases?.length ? patch.phases : DEFAULT_EXTRA.phases,
  };
}

/** Sectors hub: vertical clusters for internal linking + scanning */
export const SECTOR_VERTICAL_CLUSTERS: {
  label: string;
  hint: string;
  exampleSlug: string;
}[] = [
  {
    label: "Healthcare & clinics",
    hint: "Patient data, imaging, referrals, telehealth",
    exampleSlug: "dental-clinic-independent",
  },
  {
    label: "Professional services",
    hint: "Matter files, portals, retention, confidentiality",
    exampleSlug: "law-firm-independent",
  },
  {
    label: "Commerce & logistics",
    hint: "Payments, CRM, warehouses, trackers",
    exampleSlug: "fashion-ecommerce-independent",
  },
  {
    label: "Software & SaaS",
    hint: "Tenants, CI/CD, subprocessors, incidents",
    exampleSlug: "b2b-software-independent",
  },
  {
    label: "Hospitality & venues",
    hint: "Bookings, POS, staff data, guest marketing",
    exampleSlug: "hotel-independent",
  },
  {
    label: "Industrial & field services",
    hint: "OT/IT, subcontractors, mobile devices",
    exampleSlug: "construction-company-independent",
  },
];
