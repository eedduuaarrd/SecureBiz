/**
 * Coordinates AdSense unit `push()` calls with `adsbygoogle.js` load.
 * Without this, pushes can run before the library is ready (blank slots).
 */

let scriptReady = false;
const pending: Array<() => void> = [];
let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

export function markAdsenseScriptReady(): void {
  if (scriptReady) return;
  scriptReady = true;
  if (fallbackTimer !== null) {
    clearTimeout(fallbackTimer);
    fallbackTimer = null;
  }
  while (pending.length > 0) {
    const fn = pending.shift();
    fn?.();
  }
}

export function whenAdsenseScriptReady(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (scriptReady) return Promise.resolve();
  return new Promise<void>((resolve) => {
    pending.push(resolve);
    if (fallbackTimer === null) {
      fallbackTimer = setTimeout(() => {
        fallbackTimer = null;
        markAdsenseScriptReady();
      }, 12_000);
    }
  });
}
