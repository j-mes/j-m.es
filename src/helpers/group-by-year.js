/**
 * Groups entries by year, sorted descending.
 * @param {Array<{date: Date|string}>} entries - Array of entries with a date property
 * @returns {Array<{year: string, items: Array}>} Array of objects grouped by year
 */
export default function groupByYear(entries = []) {
  /** @type {Record<string, Array>} */
  const groupedEntries = {};

  entries.forEach((entryItem) => {
    if (!entryItem.date) return;

    const entryDate = entryItem.date instanceof Date ? entryItem.date : new Date(entryItem.date);
    const entryYear = entryDate.getFullYear().toString();

    if (!groupedEntries[entryYear]) groupedEntries[entryYear] = [];
    groupedEntries[entryYear].push(entryItem);
  });

  return Object.entries(groupedEntries)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
    .map(([year, items]) => ({ year, items }));

}
