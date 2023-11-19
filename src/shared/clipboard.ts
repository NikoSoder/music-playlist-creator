export function copyToClipboard(artist: string, song: string) {
  navigator.clipboard.writeText(`${artist} ${song}`);
}
