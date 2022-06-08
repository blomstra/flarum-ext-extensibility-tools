/**
 * Copies the provided text to the user's clipboard.
 *
 * @param text text to copy
 */
export default function copyTextToClipboard(text: string): void {
  const elem = document.createElement('textarea');
  elem.value = text;
  document.body.appendChild(elem);
  elem.select();
  document.execCommand('copy');
  document.body.removeChild(elem);
}
