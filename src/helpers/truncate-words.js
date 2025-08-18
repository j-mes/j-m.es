/**
 * Truncate a string to a maximum number of words and append an ellipsis if truncated.
 *
 * @param {string|any} input - Value to truncate; coerced to string.
 * @param {number} maxWords - Maximum number of words to keep (default: 30).
 * @returns {string} The truncated string with an ellipsis if truncation occurred, otherwise the original trimmed string.
 */
export default function truncateWords(input = '', maxWords = 30) {
  // Normalize input to a trimmed string.
  const normalizedText = String(input || '').trim();

  // Return empty string early for falsy/empty inputs.
  if (!normalizedText) {
    return '';
  }

  // Split on one-or-more whitespace characters to get words.
  const wordsArray = normalizedText.split(/\s+/g);
  const wordCount = wordsArray.length;

  // If the text already fits within the limit, return it unchanged.
  if (wordCount <= maxWords) {
    return normalizedText;
  }

  // Otherwise return the first `maxWords` words plus an ellipsis.
  const truncated = wordsArray.slice(0, maxWords).join(' ') + '\u2026';
  return truncated;
}
