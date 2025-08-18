/**
 * Simple date formatting filter for Eleventy/Nunjucks templates.
 * Supports the format string 'yyyy-MM-dd'. Falls back to ISO date string.
 * @param {Date|string|number} dateInput
 * @param {string} format
 */
export default function formatDate(dateInput, format = 'yyyy-MM-dd') {
  const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (isNaN(d)) return '';

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');

  if (format === 'yyyy-MM-dd') {
    return `${yyyy}-${mm}-${dd}`;
  }

  // fallback to full ISO
  return d.toISOString();
}
