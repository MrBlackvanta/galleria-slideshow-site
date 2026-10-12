export function installImageDecode() {
  HTMLImageElement.prototype.decode = function decode() {
    return Promise.resolve();
  };
}
