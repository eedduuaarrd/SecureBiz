export type ChecklistFaq = { question: string; answer: string };

export type ChecklistContent = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  intro: string;
  steps: string[];
  evidenceRows: Array<[string, string, string]>;
  mistakes: string[];
  planTitle: string;
  plan: string[];
  kpis: string[];
  faqs: ChecklistFaq[];
  related: Array<{ href: string; label: string }>;
};

const BASE_FAQS: ChecklistFaq[] = [
  {
    question: "How detailed should checklist evidence be?",
    answer:
      "Evidence should prove execution quality: owner, date, system scope, and review cadence.",
  },
  {
    question: "Can small teams implement this without consultants?",
    answer:
      "Yes. Most teams can execute in phases if ownership is clear and the checklist is tied to operations.",
  },
];

const CHECKLISTS: ChecklistContent[] = [
  {
    slug: "gdpr-checklist-smb",
    title: "GDPR checklist for SMB",
    description:
      "Actionable GDPR checklist for small and mid-sized businesses: scope, lawful basis, rights handling, and evidence.",
    keywords: ["GDPR checklist SMB", "GDPR implementation checklist"],
    intro:
      "This checklist turns GDPR into an execution workflow with clear owners, recurring controls, and evidence discipline.",
    steps: [
      "Map all personal-data processing activities by system and team.",
      "Assign lawful basis and transparency language to each processing purpose.",
      "Set data retention and deletion workflow with owner and review interval.",
      "Operationalize rights requests with SLA, intake channel, and escalation path.",
      "Run recurring privacy-control reviews with measurable outcomes.",
    ],
    evidenceRows: [
      ["RoPA coverage", "Privacy lead", "Monthly"],
      ["Lawful basis mapping", "Legal/privacy", "Quarterly"],
      ["DSAR handling log", "Operations", "Weekly"],
      ["Processor contract register", "Legal/procurement", "Quarterly"],
    ],
    mistakes: [
      "Documenting policies without integrating them into daily workflows.",
      "No owner assigned for rights-request handling.",
      "No deletion evidence for expired retention windows.",
    ],
    planTitle: "30-day GDPR activation plan",
    plan: [
      "Week 1: full data inventory and owner assignment.",
      "Week 2: lawful basis and notice alignment.",
      "Week 3: rights workflow and retention mechanics.",
      "Week 4: control review and remediation cycle.",
    ],
    kpis: [
      "Data activities with lawful basis assigned.",
      "DSAR requests resolved within target SLA.",
      "Retention-policy exceptions open >30 days.",
    ],
    faqs: BASE_FAQS,
    related: [{ href: "/compare/gdpr-vs-iso-27001", label: "GDPR vs ISO 27001" }],
  },
  {
    slug: "iso-27001-checklist-smb",
    title: "ISO 27001 checklist for SMB",
    description:
      "Practical ISO 27001 checklist for SMB teams with scope definition, risk treatment, and ISMS evidence.",
    keywords: ["ISO 27001 checklist SMB", "ISMS checklist"],
    intro:
      "Use this checklist to build a lean ISMS with realistic governance and audit-ready evidence quality.",
    steps: [
      "Define ISMS scope boundaries and business context.",
      "Create risk register with treatment plans and named owners.",
      "Map and deploy controls against prioritized risk scenarios.",
      "Run internal review cycle and issue-remediation workflow.",
      "Prepare evidence package for recurring assurance checks.",
    ],
    evidenceRows: [
      ["ISMS scope statement", "Security manager", "Annual"],
      ["Risk register updates", "Risk owner", "Monthly"],
      ["Control test records", "IT/security", "Monthly"],
      ["Management review notes", "Leadership", "Quarterly"],
    ],
    mistakes: [
      "Over-scoping the ISMS before process maturity exists.",
      "Risk register not connected to control execution.",
      "Missing recurring management review cadence.",
    ],
    planTitle: "60-day ISMS execution plan",
    plan: [
      "Days 1-15: scope, governance, and risk inventory.",
      "Days 16-30: control selection and responsibility mapping.",
      "Days 31-45: testing, monitoring, and evidence discipline.",
      "Days 46-60: review cycle and remediation closure.",
    ],
    kpis: [
      "Critical risks with active treatment plan.",
      "Control tests completed on schedule.",
      "Audit findings closed within SLA.",
    ],
    faqs: BASE_FAQS,
    related: [{ href: "/compare/soc2-vs-iso-27001", label: "SOC 2 vs ISO 27001" }],
  },
  {
    slug: "nis2-checklist-smb",
    title: "NIS2 checklist for SMB",
    description:
      "NIS2 readiness checklist for SMBs and suppliers: governance, incidents, supplier controls, and resilience evidence.",
    keywords: ["NIS2 checklist", "NIS2 readiness SMB"],
    intro:
      "This checklist helps teams operationalize NIS2-style resilience obligations through governance, supplier oversight, and incident discipline.",
    steps: [
      "Confirm legal and contractual scope impact.",
      "Assign governance accountability and escalation model.",
      "Implement incident classification, response, and reporting workflow.",
      "Tier suppliers by criticality and define assurance requirements.",
      "Run periodic resilience exercises with corrective actions.",
    ],
    evidenceRows: [
      ["Scope and applicability file", "Compliance owner", "Quarterly"],
      ["Incident drill records", "Security operations", "Quarterly"],
      ["Supplier risk assessments", "Procurement/security", "Monthly"],
      ["Board/governance updates", "Leadership", "Quarterly"],
    ],
    mistakes: [
      "Treating NIS2 as a one-time project instead of operating model.",
      "Ignoring supplier governance and dependency risk.",
      "No tested incident communication path.",
    ],
    planTitle: "45-day resilience rollout",
    plan: [
      "Days 1-10: scope, ownership, and risk baseline.",
      "Days 11-20: supplier tiering and incident process build.",
      "Days 21-35: exercise, evidence capture, and gap closure.",
      "Days 36-45: leadership reporting and operating cadence.",
    ],
    kpis: [
      "Critical suppliers with active assurance record.",
      "Incident response readiness drill pass rate.",
      "Open high-risk issues older than 30 days.",
    ],
    faqs: BASE_FAQS,
    related: [{ href: "/compare/dora-vs-nis2", label: "DORA vs NIS2" }],
  },
];

const EXTRA_CHECKLISTS: Array<{
  slug: string;
  title: string;
  description: string;
  planTitle: string;
}> = [
  { slug: "soc2-checklist-smb", title: "SOC 2 checklist for SMB", description: "Trust-services checklist for SaaS teams preparing SOC 2 readiness and evidence quality.", planTitle: "50-day SOC 2 readiness plan" },
  { slug: "dora-checklist-fintech", title: "DORA checklist for fintech", description: "Operational resilience checklist for fintech teams under DORA-style obligations.", planTitle: "60-day DORA rollout" },
  { slug: "hipaa-checklist-healthtech", title: "HIPAA checklist for healthtech", description: "Healthcare security and privacy checklist for protected health information workflows.", planTitle: "45-day HIPAA action plan" },
  { slug: "pci-dss-checklist-ecommerce", title: "PCI DSS checklist for ecommerce", description: "Payment security checklist for ecommerce teams handling cardholder data.", planTitle: "40-day PCI readiness plan" },
  { slug: "iso-22301-checklist-smb", title: "ISO 22301 checklist for SMB", description: "Business continuity checklist with recovery planning and operational resilience controls.", planTitle: "55-day continuity plan" },
  { slug: "incident-response-checklist", title: "Incident response checklist", description: "End-to-end incident readiness checklist for detection, escalation, communication, and recovery.", planTitle: "30-day incident readiness plan" },
  { slug: "vendor-risk-checklist", title: "Vendor risk checklist", description: "Supplier governance checklist for security, compliance, and contractual controls.", planTitle: "35-day vendor risk rollout" },
  { slug: "privacy-program-checklist", title: "Privacy program checklist", description: "Cross-functional privacy operating model checklist for modern data teams.", planTitle: "45-day privacy program launch" },
  { slug: "data-retention-checklist", title: "Data retention checklist", description: "Retention and deletion controls checklist to reduce legal and operational risk.", planTitle: "30-day retention cleanup plan" },
  { slug: "ai-governance-checklist", title: "AI governance checklist", description: "AI risk and governance checklist for model lifecycle, oversight, and transparency.", planTitle: "60-day AI governance rollout" },
  { slug: "isms-internal-audit-checklist", title: "ISMS internal audit checklist", description: "Internal audit checklist for control testing, traceability, and remediation tracking.", planTitle: "28-day audit cycle plan" },
  { slug: "gdpr-consent-checklist", title: "GDPR consent checklist", description: "Consent-management checklist for web and product teams collecting user permissions.", planTitle: "21-day consent hardening plan" },
  { slug: "dpia-checklist", title: "DPIA checklist", description: "Data protection impact assessment checklist with risk scoring and mitigation workflow.", planTitle: "20-day DPIA execution plan" },
  { slug: "security-awareness-checklist", title: "Security awareness checklist", description: "Security awareness program checklist for recurring training and behavior tracking.", planTitle: "30-day awareness launch" },
  { slug: "access-control-checklist", title: "Access control checklist", description: "Identity and access management checklist for least privilege and joiner/mover/leaver controls.", planTitle: "35-day IAM baseline plan" },
  { slug: "cloud-security-checklist", title: "Cloud security checklist", description: "Cloud hardening checklist for secure configuration, monitoring, and governance.", planTitle: "45-day cloud hardening plan" },
  { slug: "business-continuity-checklist", title: "Business continuity checklist", description: "Operational continuity checklist for crisis scenarios and recovery objectives.", planTitle: "50-day continuity activation" },
  { slug: "third-party-contract-checklist", title: "Third-party contract checklist", description: "Contract-review checklist for security clauses, liabilities, and compliance commitments.", planTitle: "25-day contract control plan" },
  { slug: "logging-monitoring-checklist", title: "Logging and monitoring checklist", description: "Observability checklist for security monitoring, alert quality, and response workflows.", planTitle: "30-day monitoring uplift" },
  { slug: "board-reporting-checklist", title: "Board reporting checklist", description: "Governance reporting checklist translating cyber and compliance status into executive decisions.", planTitle: "20-day board reporting setup" },
];

for (const item of EXTRA_CHECKLISTS) {
  CHECKLISTS.push({
    slug: item.slug,
    title: item.title,
    description: item.description,
    keywords: [item.title, `${item.slug.replaceAll("-", " ")} checklist`, "compliance checklist"],
    intro:
      "This checklist is built for execution, not theory. It combines controls, ownership, evidence, and KPI tracking for sustainable operations.",
    steps: [
      "Define scope and owner for each control domain.",
      "Document minimum viable process and required evidence.",
      "Implement control cadence with realistic review intervals.",
      "Track exceptions and remediation actions in one register.",
      "Report progress to leadership with measurable outcomes.",
    ],
    evidenceRows: [
      ["Scope and owner register", "Program lead", "Monthly"],
      ["Control operation log", "Control owner", "Bi-weekly"],
      ["Exception and remediation tracker", "Risk/compliance", "Weekly"],
      ["Leadership status report", "Program office", "Monthly"],
    ],
    mistakes: [
      "Trying to deploy all controls at once without prioritization.",
      "Tracking status without validating evidence quality.",
      "No governance forum for unresolved risks.",
    ],
    planTitle: item.planTitle,
    plan: [
      "Phase 1: scope and ownership baseline.",
      "Phase 2: control deployment and evidence setup.",
      "Phase 3: testing, metrics, and remediation.",
      "Phase 4: recurring governance and optimization.",
    ],
    kpis: [
      "Controls operating with current evidence.",
      "High-priority issues closed within SLA.",
      "Program milestones delivered on time.",
    ],
    faqs: BASE_FAQS,
    related: [
      { href: "/checklists", label: "All checklists" },
      { href: "/compare", label: "Compare frameworks" },
    ],
  });
}

export function getAllChecklistContent(): ChecklistContent[] {
  return CHECKLISTS;
}

export function getChecklistContentBySlug(slug: string): ChecklistContent | undefined {
  return CHECKLISTS.find((item) => item.slug === slug);
}
