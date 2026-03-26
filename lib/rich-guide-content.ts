import type { GuideFaq } from "@/lib/types";

function getRegulationSpecificBlock(regulationName: string): string {
  const r = regulationName.toLowerCase();

  const isGdpr = r.includes("gdpr") || r.includes("gdpr");

  if (isGdpr) {
    return `## Tailored for GDPR: what we prioritize
- Roles and responsibilities (controller vs. processor): clearly document who does what.
- Legal bases and purposes: validate your “why” across forms, website, and vendors.
- Data subject rights: define how you will respond to access, rectification, and deletion requests.
- Breach notification (when applicable): assign an owner and severity criteria.
- Privacy by design: minimization, transparency, and strong control of sensitive data.`;
  }

  if (r.includes("27001")) {
    return `## Tailored for ISO 27001: how to “make it real”
- Build an ISMS: scope, security policy, and clear ownership.
- Risk management: review risks periodically (not a “one-and-done” document).
- Controls and evidence: document what you do and how you prove it (logs, meeting minutes, checklists).
- Internal audits and management review: a continuous improvement cycle.
- Vendors: treat subcontractors as part of your security system.`;
  }

  if (r.includes("27002")) {
    return `## Tailored for ISO 27002: the control catalog in practice
- Pick a control set: start with high-impact objectives that match your sector risks.
- Map objectives to controls: document “why this control applies” (not only the control name).
- Operationalize controls: assign owners, due dates, and evidence sources.
- Manage change: when processes/tools change, update control implementation and evidence.`;
  }

  if (r.includes("27005")) {
    return `## Tailored for ISO 27005: risk assessment you can execute
- Define the risk approach: likelihood, impact, and risk acceptance criteria.
- Perform targeted assessments: start with the top 5 processes/systems with highest exposure.
- Plan risk treatment: prevention, detection, mitigation, and recovery options.
- Monitor risks continuously: track changes after incidents, vendor updates, or major releases.`;
  }

  if (r.includes("cookie")) {
    return `## Tailored for cookies: consent you can prove
- Map your trackers (analytics, marketing, embeds): create categories and document impact.
- Consent management: accept/reject flows and how rules apply to scripts.
- Consent records: store evidence (date, category, decision) when possible.
- Withdrawal of consent: a procedure to update preferences and stop tracking.
- Messages and transparency: clear text on purposes and retention periods when applicable.`;
  }

  if (r.includes("eprivacy")) {
    return `## Tailored for the ePrivacy Directive
- Confidentiality of communications: define how you protect message and contact data.
- Electronic marketing controls: consent and opt-out flows for newsletters and campaigns.
- Tracking/terminal privacy: document what is stored/accessed and why.
- Vendor alignment: ensure your marketing/analytics providers follow the same privacy posture.`;
  }

  if (r.includes("dsa")) {
    return `## Tailored for the Digital Services Act (DSA)
- Risk assessment and mitigation: map platform/service risks and apply controls.
- Notice-and-action: define intake, moderation, and escalation procedures.
- Transparency obligations: maintain clear public-facing policies and reporting.
- Internal compliance governance: assign owners and evidence collection.`;
  }

  if (r.includes("nist") && r.includes("csf")) {
    return `## Tailored for NIST CSF: outcomes with a common language
- Identify: build an inventory of assets, data, systems, and key business processes.
- Protect: apply appropriate safeguards (access control, encryption, secure configuration).
- Detect: improve logging, monitoring, and alerting for suspicious behavior.
- Respond: define triage, containment steps, and communication responsibilities.
- Recover: practice restoration and ensure continuity targets are met.`;
  }

  if (r.includes("cis") && r.includes("controls")) {
    return `## Tailored for CIS Controls: prioritized, measurable implementation
- Start with the first 5 controls that reduce the most common real-world risks.
- Validate implementation: collect evidence that the control is actually working.
- Automate what you can: scanning, patching workflows, and access review reminders.
- Keep a remediation loop: measure gaps, fix them, and re-check effectiveness.`;
  }

  if (r.includes("soc 3") || r.includes("soc3")) {
    return `## Tailored for SOC 3: publishable trust information
- Use Trust Services Criteria to summarize security, availability, and confidentiality controls.
- Keep evidence lightweight but consistent: policies, records, and sample implementations.
- Manage changes: approvals, impact verification, and documented control updates.
- Align with contracts: ensure your SOC 3 messaging matches what you actually do.`;
  }

  if (r.includes("hipaa")) {
    return `## Tailored for HIPAA: practical PHI protection
- Administrative safeguards: risk analysis, workforce training, and policies for access.
- Physical safeguards: control facilities access and protect devices that store PHI.
- Technical safeguards: unique user IDs, access controls, audit logs, and encryption.
- Incident & documentation readiness: ensure procedures exist for breaches and reviews.`;
  }

  if (r.includes("dma")) {
    return `## Tailored for the Digital Markets Act (DMA)
- Gatekeeper compliance obligations: identify whether you fall under DMA triggers.
- Contestability and interoperability: plan measurable actions where required.
- Transparency: publish clear documentation and monitor compliance outcomes.
- Evidence and governance: document decisions and ensure consistent execution.`;
  }

  if (r.includes("nis2")) {
    return `## Tailored for NIS2: resilience and incident response
- Security risk management: assign controls, owners, and periodic reviews.
- Vendor/supply-chain governance: consistent security beyond your company.
- Practical training: permissions, email hygiene, and safe workflows.
- Incident notification: an internal procedure with clear criteria and timelines.`;
  }

  if (r.includes("dora")) {
    return `## Tailored for DORA: digital operational resilience
- ICT governance: roles, policies, and a formal risk-management framework.
- Incidents and reporting: escalation flow and evidence collection.
- ICT providers: third-party risk and contract/SLAs review.
- Testing and exercises: plan simulations and recovery drills.`;
  }

  if (r.includes("22301") || r.includes("continu")) {
    return `## Tailored for ISO 22301: business continuity
- BIA: define what is critical and the impact of downtime.
- RTO/RPO: translate theory into operational targets.
- Plans and procedures: who does what, how you activate, and how you communicate.
- Exercises: periodic testing so the plan works in reality.`;
  }

  if (r.includes("27017")) {
    return `## Tailored for ISO 27017: cloud controls
- Shared responsibility model: document what the cloud provider handles vs. what you handle.
- Secure configuration: access, segmentation, and encryption.
- Data handling and retention: where it is stored, how it is protected, and when it is deleted.
- Monitoring: logs and alerts to detect deviations quickly.`;
  }

  if (r.includes("27701")) {
    return `## Tailored for ISO 27701: privacy for PIMS
- Expand your ISMS into a PIMS: document privacy-specific policies and scope.
- Vendor and processor governance: align contractual and operational privacy requirements.
- Records and evidence: collect privacy accountability evidence in a consistent way.
- Continuous improvement: integrate privacy risk reviews into your management cycle.`;
  }

  if (r.includes("27018")) {
    return `## Tailored for ISO 27018: protecting PII in the cloud
- Shared responsibility mapping: clarify cloud provider vs. customer responsibilities.
- Data handling controls: access, encryption, retention, and deletion practices.
- Incident and privacy response readiness: define who does what and how evidence is stored.`;
  }

  if (r.includes("62443")) {
    return `## Tailored for IEC 62443: industrial security mindset
- Identify assets and zones/conduits: structure your industrial environment.
- Implement least-privilege and segmentation: reduce lateral movement paths.
- Secure lifecycle: change management, patching and verification.
- Operational monitoring and incident response in OT contexts.`;
  }

  if (r.includes("mdr")) {
    return `## Tailored for Medical Device Regulation (MDR)
- Device/quality governance: define how quality and cybersecurity expectations are met.
- Data handling and traceability: ensure documentation supports decisions and evidence.
- Risk management lifecycle: plan evidence collection for updates and changes.
- Vendor and supply-chain controls: ensure consistent security and compliance posture.`;
  }

  if (r.includes("soc 2")) {
    return `## Tailored for SOC 2: evidence of controls
- Define security/availability/confidentiality criteria for the scope.
- Collect operational evidence: policies, records, and real control samples.
- Change management: how changes are approved and how impact is verified.
- Measurement and corrective actions when deviations occur.`;
  }

  if (r.includes("pci")) {
    return `## Tailored for PCI DSS: payment data security
- Network segmentation and least-privilege access in PCI environments.
- Vulnerability management: scheduled reviews and remediation.
- Logging/monitoring: traceability and detection of attacks or errors.
- Incident response: what to do when you suspect compromise.`;
  }

  if (r.includes("lopdgdd") || r.includes("spanish-lopdgdd")) {
    return `## Tailored for LOPDGDD: Spain’s GDPR complement
- Digital rights and guarantees: internal procedures so they are actually actionable.
- Transparency: keep consistent rules between website and documentation.
- Use-case scenarios: review permissions and examples when relevant.
- Evidence: maintain records and decisions to demonstrate compliance.`;
  }

  return `## Tailored for ${regulationName}: practical priorities
- Decide what is truly “critical” for your sector and translate it into concrete controls.
- Document decisions and evidence (not just documents): the goal is to prove execution.
- Reduce risk from credentials, vendors, and human errors with a 30-day plan.`;
}

/**
 * Long and stable rich content for guide pages when Mongo/Gemini are unavailable.
 * Reused by the generator fallback and the guide page itself.
 */
export function buildFallbackGuideMarkdown(
  sectorName: string,
  regulationName: string,
): string {
  return `## Executive summary for ${sectorName}

This guide is designed for teams that need to **prioritize risk**, **demonstrate compliance**, and **reduce operational friction** in the **${sectorName}** environment, applying **${regulationName}** without getting stuck in unnecessary theory.

The starting point is simple: **inventory → controls → evidence → continuous improvement**. If you run this cycle, you move from a reactive posture (“when something happens”) to a **provable** approach in front of customers, vendors, and regulators.

## Sector context: why it matters now

Businesses in this segment typically combine **personal data**, **digital tools**, and **human processes**. That usually amplifies three recurring risk vectors:

- **Exposure**: a larger attack surface (email, CRM, tablets, social channels, client portals).
- **Complexity**: more integrations and more vendors with access to data/systems.
- **Expectation**: clients and partners demand transparency, controls, and traceability.

${regulationName} is not “just paperwork”: it is a framework to **organize decisions**, **assign responsibilities**, and **document what you actually do**.

## Digital risk map (practical prioritization)

### Risk 1: credentials and access

Credential-based attacks (phishing, password reuse, shared accounts) are one of the most common and avoidable causes of incidents.

**Quick actions**

- Enforce MFA for accounts with access to data or administrative capabilities.
- Review roles: “who can do what” and at what privilege level.
- Session/device policy (especially for remote work or personal devices).

### Risk 2: data leaks and human error

Email copies, uncontrolled spreadsheets, and “workarounds” are typical sources of data leaks.

**Quick actions**

- Create a minimal inventory of data types and locations (where they are and why).
- Classification rules: sensitive vs. ordinary data.
- Short recurring training (10–15 minutes) with real examples from your sector.

### Risk 3: vendors and subcontracting

External services (hosting, email marketing, ERP, support tools) often become the weakest link unless contracts, reviews, and controls exist.

**Quick actions**

- Maintain a list of critical vendors and review data-protection clauses.
- Vendor onboarding/offboarding procedure with a checklist.
- Access/change logging (even if basic at the beginning).

## Compliance checklist (30-day plan)

${getRegulationSpecificBlock(regulationName)}

### Week 1 — Diagnosis and governance

- Assign an internal owner (even if partial).
- Do a **quick inventory** of systems and data (a spreadsheet is valid at the start).
- Identify 5 processes where you have more personal data or higher exposure.

### Week 2 — Minimal foundations and documentation

- Define legal bases and purposes (even as internal notes if needed).
- Review consents and messaging (website, forms, cookies if applicable).
- Create a simple records of processing (v1.0).

### Week 3 — Technical and operational controls

- MFA, backups, and restore-test plans (even if the test is small).
- Access control and review of inactive accounts.
- Incident plan: who detects, who decides, who communicates.

### Week 4 — Evidence and improvement

- Gather evidence (screenshots, logs, meeting minutes, training records).
- Run an internal review: “what we improved” and “what remains”.
- Plan the next cycle (quarterly is a great starting cadence).

## Operational security, without “IT talk”

In the **${sectorName}** context, effective security usually depends more on **habits** than on big investments:

- **Segregation of duties**: avoid a single person holding all powers.
- **Backups and recovery**: better a small test than a perfect plan never proven.
- **Change management**: every tool/process change needs an owner and a date.

## Incident response (a mental template)

When something happens, the hardest part is **ordering the chaos**. Use this sequence:

1. **Containment**: stop the damage escalation (cut access, isolate account, revoke token).
2. **Analysis**: what was affected, which data, and relevant legal deadlines.
3. **Internal communication**: who must know and how to share without panic.
4. **External communication** (if applicable): based on obligations and transparency criteria.
5. **Postmortem**: lessons learned and actions to prevent repeat incidents.

## Vendors, contracts, and evidence

For ${regulationName}, the key is being able to say **what processing they perform**, **under which legal basis**, and **what security level they provide**. You don’t need everything on day one, but you do need a clear path:

- Contract/DPA where appropriate
- Periodic review (semi-annual or annual)
- Vendor changes with safe migration

## Simple KPIs to measure progress

- % of accounts with MFA on critical roles
- average response time to data-rights requests (if applicable)
- number of incidents closed with corrective action
- % of critical vendors reviewed up-to-date

## Quick glossary

- **Legal basis**: the foundation that allows data processing under the rule.
- **Data minimization**: process only what is necessary.
- **Pseudonymization/encryption**: risk-reduction techniques tailored to context.
- **Records of processing**: a map of what you do with data and why.

## Final note

This text is an **operational baseline** for ${sectorName} under ${regulationName}. For specific cases (contracts, sanctions, disputes, or legal interpretation), always consult a **qualified professional**.
`;
}

/** FAQs per defecte (mateix conjunt que el fallback de Gemini) per AEO i UI. */
export function getDefaultGuideFaqs(
  sectorName: string,
  regulationName: string,
): GuideFaq[] {
  return [
    {
      question: `How do I start compliance with ${regulationName}?`,
      answer:
        "Start with a short diagnostic: inventory data and systems, roles, vendors, and prioritize risks by impact. Then apply the guide’s 30-day plan.",
    },
    {
      question: "How often should the security/compliance plan be reviewed?",
      answer:
        "At least every quarter and whenever tools, staff, data flows, or critical vendors change.",
    },
    {
      question: `What is the most urgent for ${sectorName}?`,
      answer:
        "Access control (MFA), data inventory, and an incident-response procedure. These are the three levers with the best risk/time return.",
    },
    {
      question: "How do I prove compliance if someone asks for evidence?",
      answer:
        "With records: inventory, training, vendor reviews, access logs when possible, and decision notes (even if simple).",
    },
    {
      question: "Can I outsource everything?",
      answer:
        "You can outsource execution, but governance responsibility stays with you: you must be able to demonstrate control and supervision.",
    },
    {
      question: "Does this guide replace a lawyer or an auditor?",
      answer:
        "No. It is guidance material. For specific legal interpretations or certifications, consult qualified professionals.",
    },
  ];
}
