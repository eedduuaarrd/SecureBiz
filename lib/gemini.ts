import { GoogleGenAI } from "@google/genai";
import {
  buildFallbackGuideMarkdown,
  getDefaultGuideFaqs,
} from "@/lib/rich-guide-content";

function getGenAI() {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    throw new Error("Missing GEMINI_API_KEY environment variable.");
  }
  return new GoogleGenAI({ apiKey: geminiApiKey });
}

export type GeneratedGuide = {
  title: string;
  metaDescription: string;
  keywords: string[];
  markdown: string;
  faqs: Array<{ question: string; answer: string }>;
};

const candidateModels = [
  process.env.GEMINI_MODEL,
  "gemini-2.0-flash",
  "gemini-2.0-flash-001",
  "gemini-1.5-flash-latest",
  "gemini-1.5-flash",
].filter(Boolean) as string[];

function buildFallbackGuide(sectorName: string, regulationName: string): GeneratedGuide {
  return {
    title: `${regulationName} for ${sectorName}: practical compliance guide`,
    metaDescription: `Operational guide for ${regulationName} in the ${sectorName} context, with risks, a checklist, and security controls.`,
    keywords: [
      `${regulationName} ${sectorName}`,
      `compliance ${regulationName}`,
      "sector cybersecurity",
    ],
    markdown: buildFallbackGuideMarkdown(sectorName, regulationName),
    faqs: getDefaultGuideFaqs(sectorName, regulationName),
  };
}

export async function generateGuideWithGemini(
  sectorName: string,
  regulationName: string,
): Promise<GeneratedGuide> {
  const prompt = `
You are a senior consultant for legal compliance and cybersecurity.

Generate a professional guide in ENGLISH for the sector "${sectorName}" under the regulation "${regulationName}".
Write for practical decision-makers: clear, specific, and actionable.
Requirements:
- ~1200 words (approximately)
- Structure with clear H2 and H3 headings in Markdown
- Include mandatory sections:
  1) Digital Risks Map
  2) 30-Day Compliance Checklist
  3) Operational Security Tips
  4) Tailored to the regulation: 5-7 specific, non-generic priorities for "${regulationName}"
- Enterprise-level tone, but genuinely actionable
- Avoid filler, avoid generic advice, and avoid repeating the same bullets
Return ONLY valid JSON with this exact shape:
{
  "title": "string",
  "metaDescription": "string (max 155 characters)",
  "keywords": ["string"],
  "markdown": "string (Markdown)",
  "faqs": [{"question":"string","answer":"string"}]
}
`;

  const genAI = getGenAI();

  for (const model of candidateModels) {
    try {
      const response = await genAI.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: 0.4,
          topP: 0.9,
          maxOutputTokens: 4096,
          responseMimeType: "application/json",
        },
      });

      const raw = response.text ?? "{}";
      const parsed = JSON.parse(raw) as GeneratedGuide;

      if (parsed.title && parsed.markdown) {
        return {
          title: parsed.title,
          metaDescription: parsed.metaDescription,
          keywords: parsed.keywords ?? [],
          markdown: parsed.markdown,
          faqs: parsed.faqs ?? [],
        };
      }
    } catch {
      continue;
    }
  }

  return buildFallbackGuide(sectorName, regulationName);
}
