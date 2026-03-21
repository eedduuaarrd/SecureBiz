type MarkdownArticleProps = {
  markdown: string;
};

export function MarkdownArticle({ markdown }: MarkdownArticleProps) {
  const lines = markdown.split("\n").filter((line) => line.trim().length > 0);

  return (
    <article className="prose prose-slate max-w-none">
      {lines.map((line, index) => {
        if (line.startsWith("### ")) {
          return (
            <h3 key={index} className="mt-6 text-xl font-semibold text-slate-900">
              {line.replace("### ", "")}
            </h3>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={index} className="mt-8 text-2xl font-semibold text-slate-900">
              {line.replace("## ", "")}
            </h2>
          );
        }
        if (line.startsWith("# ")) {
          return (
            <h1 key={index} className="mt-10 text-3xl font-bold text-slate-900">
              {line.replace("# ", "")}
            </h1>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <li key={index} className="ml-5 list-disc text-slate-700">
              {line.replace("- ", "")}
            </li>
          );
        }
        return (
          <p key={index} className="mt-4 leading-7 text-slate-700">
            {line}
          </p>
        );
      })}
    </article>
  );
}
