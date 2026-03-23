import { expect, test } from "@playwright/test";

const publicRoutes = [
  ["/", "SecureBiz AI"],
  ["/about", "About"],
  ["/resources", "Compliance resources"],
  ["/compare", "Compliance comparisons"],
  ["/checklists", "Compliance checklists"],
  ["/sectors", "Sector"],
  ["/regulations", "Regulation"],
  ["/legal/privacy", "Privacy Policy"],
  ["/legal/cookies", "Cookie Policy"],
  ["/legal/disclaimer", "Legal Disclaimer"],
] as const;

test.describe("public pages", () => {
  for (const [path, titleSnippet] of publicRoutes) {
    test(`${path} returns 200 and English UI`, async ({ page }) => {
      const res = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(res?.ok(), `${path} should be OK`).toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page).toHaveTitle(new RegExp(titleSnippet, "i"));
    });
  }
});

test.describe("crawler assets", () => {
  test("sitemap.xml is application/xml and lists URLs", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.ok()).toBeTruthy();
    const type = res.headers()["content-type"] ?? "";
    expect(type).toMatch(/xml/i);
    const body = await res.text();
    expect(body).toContain("<urlset");
    expect(body).toMatch(/<loc>https?:\/\//);
  });

  test("robots.txt allows crawling and points to sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toMatch(/User-agent/i);
    expect(body).toContain("sitemap.xml");
  });

  test("ads.txt is present for AdSense", async ({ request }) => {
    const res = await request.get("/ads.txt");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toMatch(/google\.com,\s*pub-/i);
  });
});

test("404 page renders", async ({ page }) => {
  const res = await page.goto("/this-route-should-not-exist-xyz", {
    waitUntil: "domcontentloaded",
  });
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: /couldn't find that url/i })).toBeVisible();
});
