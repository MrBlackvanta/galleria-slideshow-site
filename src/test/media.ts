export function installMatchMedia(matching: readonly string[] = []) {
  window.matchMedia = (query: string) =>
    ({
      matches: matching.includes(query),
      media: query,
      onchange: null,
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}
