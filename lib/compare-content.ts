export type CompareFaq = { question: string; answer: string };

export type CompareContent = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  intro: string;
  comparisonRows: Array<[string, string, string]>;
  leftLabel: string;
  rightLabel: string;
  differences: string[];
  implementation: string[];
  mistakes: string[];
  kpis: string[];
  faqs: CompareFaq[];
  related: Array<{ href: string; label: string }>;
};

const BASE_FAQS: CompareFaq[] = [
  {
    question: "Can these frameworks be combined?",
    answer:
      "Yes. Most teams combine frameworks by mapping one control baseline to multiple obligations and reusing evidence.",
  },
  {
    question: "What should be prioritized first?",
    answer:
      "Prioritize the requirement linked to immediate legal, contractual, or revenue pressure, then sequence adjacent frameworks.",
  },
];

const COMPARISONS: CompareContent[] = [
  {
    slug: "gdpr-vs-iso-27001",
    title: "GDPR vs ISO 27001",
    description:
      "Compare GDPR and ISO 27001 in practical terms: legal obligations, ISMS discipline, evidence, and implementation order.",
    keywords: ["GDPR vs ISO 27001", "privacy vs ISMS", "ISO 27001 GDPR"],
    intro:
      "GDPR and ISO 27001 overlap in controls but answer different questions: GDPR is legal compliance for personal data, while ISO 27001 is a management system for security risk.",
    leftLabel: "GDPR",
    rightLabel: "ISO 27001",
    comparisonRows: [
      ["Primary nature", "Legal regulation", "Certifiable management standard"],
      ["Main objective", "Data protection rights and lawful processing", "Risk-based security governance"],
      ["Core outputs", "RoPA, DPIA, rights workflow", "Risk register, SoA, internal audits"],
      ["Typical owner", "Legal/privacy + operations", "Security/IT + management"],
    ],
    differences: [
      "GDPR emphasizes legal basis, transparency, and rights handling.",
      "ISO 27001 emphasizes repeatable control governance and continual improvement.",
      "Both require evidence quality, not policy-only documentation.",
    ],
    implementation: [
      "Week 1-2: map personal data and critical assets.",
      "Week 3-5: define lawful basis and baseline security controls.",
      "Week 6-10: formalize ownership, reviews, and evidence workflow.",
    ],
    mistakes: [
      "Treating GDPR as paperwork and ISO as pure IT project.",
      "Maintaining separate evidence silos for privacy and security.",
      "Skipping periodic review cadence.",
    ],
    kpis: [
      "Coverage of data activities with lawful basis assigned.",
      "Critical systems with owner and control status.",
      "Time to close high-priority audit findings.",
    ],
    faqs: [
      {
        question: "Is GDPR enough without ISO 27001?",
        answer:
          "For some organizations yes, but ISO 27001 often becomes necessary when customers require formal security assurance.",
      },
      ...BASE_FAQS,
    ],
    related: [
      { href: "/checklists/gdpr-checklist-smb", label: "GDPR checklist" },
      { href: "/checklists/iso-27001-checklist-smb", label: "ISO 27001 checklist" },
    ],
  },
  {
    slug: "nis2-vs-iso-27001",
    title: "NIS2 vs ISO 27001",
    description:
      "Compare NIS2 and ISO 27001: legal resilience obligations versus certifiable ISMS practices.",
    keywords: ["NIS2 vs ISO 27001", "NIS2 compliance", "ISO 27001 NIS2"],
    intro:
      "NIS2 defines legal resilience expectations for in-scope entities; ISO 27001 offers a management structure to operationalize controls.",
    leftLabel: "NIS2",
    rightLabel: "ISO 27001",
    comparisonRows: [
      ["Primary nature", "EU legal directive obligations", "Certifiable standard"],
      ["Governance focus", "Regulatory accountability and reporting", "ISMS ownership and review cycle"],
      ["Supplier pressure", "Strong supply-chain emphasis", "Risk-treatment and control assurance"],
      ["Evidence style", "Regulatory readiness records", "Audit-ready control lifecycle"],
    ],
    differences: [
      "NIS2 includes explicit governance and incident obligations under law.",
      "ISO 27001 provides repeatable process discipline and formal certification path.",
      "Combined usage often reduces duplication and improves evidence consistency.",
    ],
    implementation: [
      "Validate scope and legal pressure.",
      "Set governance owners and reporting thresholds.",
      "Use ISO routines for control maintenance and evidence.",
    ],
    mistakes: [
      "Assuming ISO certification automatically equals legal NIS2 compliance.",
      "Ignoring supplier governance obligations.",
      "Not testing incident and escalation workflows.",
    ],
    kpis: [
      "Critical suppliers assessed by risk tier.",
      "Governance actions completed on schedule.",
      "Incident readiness exercises passed.",
    ],
    faqs: [
      {
        question: "Can ISO 27001 accelerate NIS2 readiness?",
        answer:
          "Yes. ISO 27001 structure helps execute and sustain controls required for NIS2 obligations.",
      },
      ...BASE_FAQS,
    ],
    related: [{ href: "/checklists/nis2-checklist-smb", label: "NIS2 checklist" }],
  },
  {
    slug: "gdpr-vs-nis2",
    title: "GDPR vs NIS2",
    description:
      "Understand GDPR vs NIS2: privacy law duties versus cyber-resilience governance requirements.",
    keywords: ["GDPR vs NIS2", "privacy vs resilience"],
    intro:
      "GDPR focuses on personal data protection and rights, while NIS2 focuses on resilience governance for critical services and ecosystems.",
    leftLabel: "GDPR",
    rightLabel: "NIS2",
    comparisonRows: [
      ["Core concern", "Lawful processing and rights", "Cyber resilience and continuity"],
      ["Incident angle", "Personal-data breaches", "Broader cyber incidents"],
      ["Main audience", "Controllers/processors", "In-scope essential/important entities"],
      ["Primary evidence", "RoPA, DPIA, rights logs", "Governance, supplier, incident records"],
    ],
    differences: [
      "GDPR legal basis and rights handling are central to privacy compliance.",
      "NIS2 expects governance, incident discipline, and supply-chain resilience.",
      "Organizations with both pressures need unified control ownership.",
    ],
    implementation: [
      "Map overlap between privacy and resilience controls.",
      "Define separate legal/accountability obligations clearly.",
      "Run a joint remediation roadmap with shared evidence register.",
    ],
    mistakes: [
      "Treating GDPR and NIS2 as interchangeable.",
      "Splitting privacy and security with no coordination.",
      "Failing to align incident workflows across teams.",
    ],
    kpis: [
      "Rights-request SLA compliance.",
      "Incident simulation closure rates.",
      "Supplier security review completion.",
    ],
    faqs: BASE_FAQS,
    related: [{ href: "/compare/dora-vs-nis2", label: "DORA vs NIS2" }],
  },
  {
    slug: "soc2-vs-iso-27001",
    title: "SOC 2 vs ISO 27001",
    description:
      "Compare SOC 2 and ISO 27001 for SaaS and B2B teams: assurance model, evidence, and buyer expectations.",
    keywords: ["SOC 2 vs ISO 27001", "SaaS security compliance"],
    intro:
      "SOC 2 and ISO 27001 both support trust in security posture, but their assurance models and procurement expectations differ.",
    leftLabel: "SOC 2",
    rightLabel: "ISO 27001",
    comparisonRows: [
      ["Primary output", "Attestation report", "Certification"],
      ["Typical market pull", "US enterprise trust workflows", "Global procurement assurance"],
      ["Control framing", "Trust services criteria", "ISMS risk/control model"],
      ["Audit rhythm", "Attestation cycles", "Certification/surveillance cycles"],
    ],
    differences: [
      "SOC 2 is often used to satisfy customer due diligence and trust-reporting needs.",
      "ISO 27001 is often used to standardize security management globally.",
      "A unified control library can support both efficiently.",
    ],
    implementation: [
      "Map customer requirements by region and segment.",
      "Define shared controls with reusable evidence.",
      "Plan assurance timeline based on pipeline pressure.",
    ],
    mistakes: [
      "Building two separate control programs.",
      "Ignoring sales/procurement requirement realities.",
      "Low-quality evidence that fails audits.",
    ],
    kpis: [
      "Evidence reuse across frameworks.",
      "Critical control exceptions unresolved >30 days.",
      "Time to respond to security questionnaires.",
    ],
    faqs: BASE_FAQS,
    related: [{ href: "/compare/gdpr-vs-iso-27001", label: "GDPR vs ISO 27001" }],
  },
  {
    slug: "dora-vs-nis2",
    title: "DORA vs NIS2",
    description:
      "Compare DORA and NIS2: financial ICT resilience versus broader critical-sector cyber obligations.",
    keywords: ["DORA vs NIS2", "EU cyber regulations"],
    intro:
      "DORA is finance-specific and operational-resilience driven; NIS2 spans broader critical sectors with resilience and governance requirements.",
    leftLabel: "DORA",
    rightLabel: "NIS2",
    comparisonRows: [
      ["Primary scope", "Financial entities + critical ICT providers", "Essential/important entities across sectors"],
      ["Core objective", "Financial operational resilience", "Critical-service cyber resilience"],
      ["Third-party risk", "Deep ICT provider oversight", "Supply-chain security obligations"],
      ["Evidence style", "Finance resilience records", "Sector resilience governance records"],
    ],
    differences: [
      "DORA focuses on financial ecosystem resilience and ICT dependency governance.",
      "NIS2 has broader cross-sector obligations and national transposition nuances.",
      "Suppliers may face combined pressure through contracts.",
    ],
    implementation: [
      "Classify obligations from legal scope and client contracts.",
      "Define governance model and incident reporting routes.",
      "Run resilience exercises and supplier assurance reviews.",
    ],
    mistakes: [
      "Using one framework as a proxy for the other without scope validation.",
      "Ignoring contractual flow-down requirements.",
      "No tested resilience response process.",
    ],
    kpis: [
      "Critical dependency review coverage.",
      "Resilience exercise completion and closure.",
      "Supplier risk remediation lead time.",
    ],
    faqs: BASE_FAQS,
    related: [{ href: "/checklists/nis2-checklist-smb", label: "NIS2 checklist" }],
  },
];

const EXTRA_COMPARISONS: Array<{
  slug: string;
  title: string;
  description: string;
  leftLabel: string;
  rightLabel: string;
}> = [
  { slug: "gdpr-vs-soc2", title: "GDPR vs SOC 2", description: "Data-protection legal duties versus trust-report assurance for customer security expectations.", leftLabel: "GDPR", rightLabel: "SOC 2" },
  { slug: "gdpr-vs-dora", title: "GDPR vs DORA", description: "Privacy compliance versus financial ICT resilience obligations in regulated environments.", leftLabel: "GDPR", rightLabel: "DORA" },
  { slug: "iso-27001-vs-dora", title: "ISO 27001 vs DORA", description: "ISMS certification discipline versus finance-specific operational resilience requirements.", leftLabel: "ISO 27001", rightLabel: "DORA" },
  { slug: "iso-27001-vs-hipaa", title: "ISO 27001 vs HIPAA", description: "Global ISMS standard versus US healthcare privacy/security rule obligations.", leftLabel: "ISO 27001", rightLabel: "HIPAA" },
  { slug: "gdpr-vs-hipaa", title: "GDPR vs HIPAA", description: "EU personal data obligations versus US healthcare data regulation requirements.", leftLabel: "GDPR", rightLabel: "HIPAA" },
  { slug: "soc2-vs-nis2", title: "SOC 2 vs NIS2", description: "Customer assurance reporting versus legal resilience obligations for critical sectors.", leftLabel: "SOC 2", rightLabel: "NIS2" },
  { slug: "soc2-vs-dora", title: "SOC 2 vs DORA", description: "Attestation-led trust reporting versus finance-sector resilience governance.", leftLabel: "SOC 2", rightLabel: "DORA" },
  { slug: "cookie-law-vs-gdpr", title: "Cookie Law vs GDPR", description: "Website tracker consent obligations versus broader personal-data compliance duties.", leftLabel: "Cookie law", rightLabel: "GDPR" },
  { slug: "cookie-law-vs-nis2", title: "Cookie Law vs NIS2", description: "Web consent and tracking obligations versus cyber-resilience governance.", leftLabel: "Cookie law", rightLabel: "NIS2" },
  { slug: "cookie-law-vs-iso-27001", title: "Cookie Law vs ISO 27001", description: "Website compliance requirements versus information-security management systems.", leftLabel: "Cookie law", rightLabel: "ISO 27001" },
  { slug: "dora-vs-iso-22301", title: "DORA vs ISO 22301", description: "Finance operational resilience rules versus business continuity management standards.", leftLabel: "DORA", rightLabel: "ISO 22301" },
  { slug: "nis2-vs-iso-22301", title: "NIS2 vs ISO 22301", description: "Cyber resilience obligations versus business continuity management structure.", leftLabel: "NIS2", rightLabel: "ISO 22301" },
  { slug: "gdpr-vs-iso-27701", title: "GDPR vs ISO 27701", description: "Legal privacy obligations versus privacy information management extension standard.", leftLabel: "GDPR", rightLabel: "ISO 27701" },
  { slug: "iso-27001-vs-iso-27701", title: "ISO 27001 vs ISO 27701", description: "Security management baseline versus privacy management extension comparison.", leftLabel: "ISO 27001", rightLabel: "ISO 27701" },
  { slug: "soc2-vs-hipaa", title: "SOC 2 vs HIPAA", description: "Assurance reporting framework versus healthcare legal compliance obligations.", leftLabel: "SOC 2", rightLabel: "HIPAA" },
  { slug: "soc2-vs-pci-dss", title: "SOC 2 vs PCI DSS", description: "Trust-services attestation versus payment-card security standard requirements.", leftLabel: "SOC 2", rightLabel: "PCI DSS" },
  { slug: "iso-27001-vs-pci-dss", title: "ISO 27001 vs PCI DSS", description: "ISMS governance standard versus payment-card data security controls.", leftLabel: "ISO 27001", rightLabel: "PCI DSS" },
  { slug: "gdpr-vs-pci-dss", title: "GDPR vs PCI DSS", description: "Personal data legal obligations versus payment-card security standard scope.", leftLabel: "GDPR", rightLabel: "PCI DSS" },
  { slug: "nis2-vs-pci-dss", title: "NIS2 vs PCI DSS", description: "National cyber-resilience obligations versus payment-card ecosystem requirements.", leftLabel: "NIS2", rightLabel: "PCI DSS" },
  { slug: "dora-vs-soc2", title: "DORA vs SOC 2", description: "Financial regulatory resilience versus customer assurance report model.", leftLabel: "DORA", rightLabel: "SOC 2" },
];

for (const item of EXTRA_COMPARISONS) {
  COMPARISONS.push({
    slug: item.slug,
    title: item.title,
    description: item.description,
    keywords: [item.title, `${item.leftLabel} vs ${item.rightLabel}`, "compliance comparison"],
    intro: `${item.leftLabel} and ${item.rightLabel} solve different compliance problems. This page compares scope, operational impact, and evidence strategy so teams can prioritize correctly.`,
    leftLabel: item.leftLabel,
    rightLabel: item.rightLabel,
    comparisonRows: [
      ["Primary nature", `${item.leftLabel} obligations and expectations`, `${item.rightLabel} obligations and expectations`],
      ["Main objective", `${item.leftLabel} risk and compliance outcomes`, `${item.rightLabel} risk and compliance outcomes`],
      ["Evidence baseline", `${item.leftLabel} records and governance proof`, `${item.rightLabel} records and governance proof`],
      ["When prioritized", "Immediate legal, customer, or audit pressure", "Strategic assurance and control maturity needs"],
    ],
    differences: [
      `${item.leftLabel} and ${item.rightLabel} usually differ in legal status, scope, and assurance model.`,
      "The best roadmap maps overlap first, then closes framework-specific gaps.",
      "One shared control library can reduce audit duplication significantly.",
    ],
    implementation: [
      "Define scope and trigger pressure (legal, customer, market).",
      "Map shared controls and identify framework-specific obligations.",
      "Run a phased rollout with owner, deadline, and evidence location.",
    ],
    mistakes: [
      "Starting with policy writing before scope and ownership are clear.",
      "Duplicating controls in separate teams without a unified evidence model.",
      "Ignoring contractual obligations hidden in partner agreements.",
    ],
    kpis: [
      "Coverage of required controls with named owner and status.",
      "Audit findings closed within agreed SLA.",
      "Evidence completeness rate for high-risk obligations.",
    ],
    faqs: BASE_FAQS,
    related: [
      { href: "/compare", label: "All comparisons" },
      { href: "/checklists", label: "Execution checklists" },
    ],
  });
}

export function getAllCompareContent(): CompareContent[] {
  return COMPARISONS;
}

export function getCompareContentBySlug(slug: string): CompareContent | undefined {
  return COMPARISONS.find((item) => item.slug === slug);
}
