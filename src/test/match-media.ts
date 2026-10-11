const listeners = new Map<string, Set<() => void>>();
const matches = new Map<string, boolean>();

export function installMatchMedia() {
  listeners.clear();
  matches.clear();
  window.matchMedia = ((media: string) => ({
    media,
    get matches() {
      return matches.get(media) ?? false;
    },
    addEventListener: (_type: "change", listener: () => void) => {
      const existing = listeners.get(media) ?? new Set();
      existing.add(listener);
      listeners.set(media, existing);
    },
    removeEventListener: (_type: "change", listener: () => void) => {
      listeners.get(media)?.delete(listener);
    },
  })) as typeof window.matchMedia;
}

export function setMediaMatches(media: string, value: boolean) {
  matches.set(media, value);
  listeners.get(media)?.forEach((listener) => listener());
}

export function mediaListenerCount(media: string) {
  return listeners.get(media)?.size ?? 0;
}
