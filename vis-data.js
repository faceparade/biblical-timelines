// --- Safe BCE/CE date constructor (UTC, supports negative years) ---
function dateY(year, month = 1, day = 1) {
  const d = new Date(Date.UTC(0, month - 1, day));
  d.setUTCFullYear(Number(year));
  d.setUTCMonth(month - 1);
  d.setUTCDate(day);
  return d;
}

// Groups = rows / lanes
const groups = new vis.DataSet([
  { id: 'patriarchs', content: 'Patriarch Lifespans' },
  { id: 'kings', content: 'Kings / Reigns' },
  { id: 'prophecy', content: 'Prophecy Periods (JW framework)' },
  { id: 'org', content: 'JW Reference Anchors' },
  { id: 'envelope', content: 'Demographic Envelopes (non-doctrinal)' }
]);

// Items = events or spans
const items = new vis.DataSet([
  { id: 1, group: 'patriarchs', content: 'Adam',  start: dateY(-4026), end: dateY(-3096) },
  { id: 2, group: 'patriarchs', content: 'Noah',  start: dateY(-2970), end: dateY(-2020) },
  { id: 3, group: 'prophecy',   content: 'Gentile Times', start: dateY(-607), end: dateY(1914) },
  { id: 4, group: 'org',        content: '1914',  start: dateY(1914) },
  { id: 5, group: 'envelope',   content: 'Reasonable overlap envelope', start: dateY(1914), end: dateY(2026) }
]);

const container = document.getElementById('timeline');

const options = {
  // IMPORTANT: stacking prevents overlaps in the same lane from covering each other
  stack: true,

  // scrolling / navigation
  horizontalScroll: true,
  verticalScroll: true,
  zoomKey: 'ctrlKey', // makes zoom happen only when Ctrl is held (prevents accidental zoom)

  // HARD CLAMPS: prevent “gridline explosion” when data gets big
  min: dateY(-5000),
  max: dateY(2500),

  // initial viewport
  start: dateY(-4500),
  end: dateY(2100),

  // zoom bounds (adjust later if you want)
  zoomMin: 1000 * 60 * 60 * 24 * 365 * 2,      // ~2 years
  zoomMax: 1000 * 60 * 60 * 24 * 365 * 12000,  // ~12,000 years

  // axis / labels readability
  orientation: { axis: 'top' }
};

new vis.Timeline(container, items, groups, options);
