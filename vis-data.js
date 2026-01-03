// vis-data.js — FULL CSV EMITTER (FIXED GROUP NORMALIZATION)

function dateY(year, month = 1, day = 1) {
  const d = new Date(Date.UTC(0, month - 1, day));
  d.setUTCFullYear(Number(year));
  d.setUTCMonth(month - 1);
  d.setUTCDate(day);
  return d;
}

// ------------------------------------------------------------
// Canonical group definitions (lanes)
// ------------------------------------------------------------
const groups = new vis.DataSet([
  { id: "adamic_history", content: "Human Moral History (Adamic)" },
  { id: "patriarch_lifespans", content: "Patriarch Lifespans" },
  { id: "anointed_lifespans", content: "Anointed Lifespans" },
  { id: "genesis_10_nations", content: "Genesis 10 Nations" },
  { id: "cultural_megaprojects", content: "Cultural Megaprojects" },
  { id: "king_of_north_south", content: "King of North/South" },
  { id: "jw_prophecy", content: "JW Prophetic Overlays" },
  { id: "prophecy_meta", content: "Authorship + Fulfillment Windows" },
  { id: "demographic", content: "Demographic Envelope (Non-Doctrinal)" }
]);

// ------------------------------------------------------------
// CSV → group ID normalization map
// THIS IS THE MISSING PIECE
// ------------------------------------------------------------
const GROUP_MAP = {
  // Adamic / history
  "Human Moral History (Adamic)": "adamic_history",
  "Adamic / Bible-history anchors": "adamic_history",

  // Lifespans
  "Patriarch Lifespans": "patriarch_lifespans",
  "patriarch_lifespans": "patriarch_lifespans",
  "Anointed Lifespans": "anointed_lifespans",

  // Nations / culture
  "Genesis 10 Nations": "genesis_10_nations",
  "Cultural Megaprojects": "cultural_megaprojects",

  // Prophecy
  "JW Prophecy": "jw_prophecy",
  "Prophecy Meta": "prophecy_meta",
  "Authorship + Fulfillment": "prophecy_meta",

  // Demographic
  "Demographic Envelope": "demographic",
  "Demographic Envelope (Non-Doctrinal)": "demographic"
};

const items = new vis.DataSet();

// ------------------------------------------------------------
// Load FULL CSV (authoritative)
// ------------------------------------------------------------
fetch("./TimelineJS_Master_Unified.csv")
  .then(res => res.text())
  .then(text => {
    const lines = text.split(/\r?\n/);
    const headers = lines.shift().split(",");

    lines.forEach((line, i) => {
      if (!line.trim()) return;

      const cols = line
        .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
        .map(c => c.replace(/^"|"$/g, ""));

      const row = Object.fromEntries(
        headers.map((h, i) => [h.trim(), cols[i]])
      );

      const rawGroup = row.group;
      const groupId = GROUP_MAP[rawGroup];

      // If group is unknown, DO NOT silently drop — log it
      if (!groupId) {
        console.warn("Unmapped CSV group:", rawGroup, row.title);
        return;
      }

      const startYear = Number(row.start_year);
      const endYear = row.end_year ? Number(row.end_year) : null;

      const item = {
        id: `csv_${i}`,
        group: groupId,
        content: row.title,
        start: dateY(startYear),
        title: row.description || row.title
      };

      if (endYear) {
        item.end = dateY(endYear);
        item.type = "range";
      } else {
        item.type = "point";
      }

      if (row.class) item.className = row.class;

      items.add(item);
    });

    // ------------------------------------------------------------
    // Render timeline
    // ------------------------------------------------------------
    const container = document.getElementById("timeline");

    const options = {
      stack: true,
      horizontalScroll: true,
      verticalScroll: true,
      zoomKey: "ctrlKey",
      orientation: { axis: "top" },

      min: dateY(-4500),
      max: dateY(2300),

      zoomMin: 1000 * 60 * 60 * 24 * 365,
      zoomMax: 1000 * 60 * 60 * 24 * 365 * 14000,

      margin: { item: 8, axis: 12 }
    };

    const timeline = new vis.Timeline(container, items, groups, options);
    timeline.fit();
  })
  .catch(err => {
    console.error("CSV load failed:", err);
  });
