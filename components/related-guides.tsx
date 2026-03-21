import Link from "next/link";

type RelatedGuide = {
  _id: unknown;
  title: string;
  sector_slug: string;
  regulation_slug: string;
};

type RelatedGuidesProps = {
  guides: RelatedGuide[];
};

export function RelatedGuides({ guides }: RelatedGuidesProps) {
  if (!guides.length) {
    return null;
  }

  return (
    <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="text-2xl font-semibold text-slate-900">Related guides</h2>
      <p className="mt-1 text-sm text-slate-600">
        Keep the SEO flow. Choose a related guide and request an audit again.
      </p>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {guides.map((guide) => (
          <li key={String(guide._id)} className="rounded-md border border-slate-200 p-3">
            <Link
              href={`/guia/${guide.sector_slug}/${guide.regulation_slug}`}
              className="font-medium text-blue-700 hover:text-blue-800"
            >
              {guide.title}
            </Link>
            <p className="mt-2 text-xs text-slate-600">Complete guide + CTA</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
