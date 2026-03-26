/**
 * Internal links from a regulation hub page to high-intent comparison URLs.
 */
export function getCompareLinksForRegulationSlug(regulationSlug: string): Array<{
  href: string;
  label: string;
}> {
  const map: Record<string, Array<{ href: string; label: string }>> = {
    gdpr: [
      { href: "/compare/gdpr-vs-iso-27001", label: "GDPR vs ISO 27001" },
      { href: "/compare/gdpr-vs-nis2", label: "GDPR vs NIS2" },
      { href: "/compare/gdpr-vs-soc2", label: "GDPR vs SOC 2" },
    ],
    "iso-27001": [
      { href: "/compare/gdpr-vs-iso-27001", label: "GDPR vs ISO 27001" },
      { href: "/compare/nis2-vs-iso-27001", label: "NIS2 vs ISO 27001" },
      { href: "/compare/soc2-vs-iso-27001", label: "SOC 2 vs ISO 27001" },
    ],
    nis2: [
      { href: "/compare/nis2-vs-iso-27001", label: "NIS2 vs ISO 27001" },
      { href: "/compare/gdpr-vs-nis2", label: "GDPR vs NIS2" },
      { href: "/compare/dora-vs-nis2", label: "DORA vs NIS2" },
    ],
    dora: [
      { href: "/compare/dora-vs-nis2", label: "DORA vs NIS2" },
      { href: "/compare/dora-vs-soc2", label: "DORA vs SOC 2" },
      { href: "/compare/iso-27001-vs-dora", label: "ISO 27001 vs DORA" },
    ],
    "soc-2": [
      { href: "/compare/soc2-vs-iso-27001", label: "SOC 2 vs ISO 27001" },
      { href: "/compare/soc2-vs-nis2", label: "SOC 2 vs NIS2" },
      { href: "/compare/gdpr-vs-soc2", label: "GDPR vs SOC 2" },
    ],
    "cookie-law": [
      { href: "/compare/cookie-law-vs-gdpr", label: "Cookie law vs GDPR" },
      { href: "/compare/cookie-law-vs-iso-27001", label: "Cookie law vs ISO 27001" },
      { href: "/compare/gdpr-vs-iso-27001", label: "GDPR vs ISO 27001" },
    ],
  };

  return (
    map[regulationSlug] ?? [
      { href: "/compare", label: "All comparisons" },
      { href: "/checklists", label: "Checklists" },
    ]
  );
}
