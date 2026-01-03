// vis-data.js — HARD FAIL + DEEP TIME WINDOW (multi-CSV, robust)

function dateY(year, month = 1, day = 1) {
  const d = new Date(Date.UTC(0, month - 1, day));
  d.setUTCFullYear(Number(year));
  return d;
}

// ===============================
// CONFIG — CSV files to load
// ===============================
const CSV_FILES = [
  "./patriarch_lifespans_full.csv",
  "./adamic_anchor_events.csv"
];

// -------------------------------
// Groups (lanes)
// -------------------------------
const groups = new vis.DataSet([
  { id: "adamic", content: "Human Moral History (Adamic)" },
  { id: "patriarchs", content: "Patriarch Lifespans" },
  { id: "jw_prophecy", content: "JW Prophetic Overlays" },
  { id: "prophecy_meta", content: "Authorship + Fulfillment Windows" },
  { id: "demographic", content: "Demographic Envelope (Non-Doctrinal)" }
]);

// CSV → group normalization
const GROUP_MAP = {
  "Human Moral History (Adamic)": "adamic",
  "Patriarch Lifespans": "patriarchs",
  "JW Prophecy": "jw_prophecy",
  "Prophecy Meta": "prophecy_meta",
  "Demographic Envelope": "demographic",
  "Demographic Envelope (Non-Doctrinal)": "demographic"
};

const items = new vis.DataSet();

// Quote-aware CSV line splitter (handles commas inside quotes)
function splitCSVLine(line) {
  return line
    .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
    .map(c => c.replace(/^\uFEFF?"/, '"')) // strips BOM if it sticks to first quote
    .map(c => c.replace(/^"|"$/g, ""));    // unquote
}

Promise.all(
  CSV_FILES.map(file =>
    fetch(file).then(res => {
      if (!res.ok) throw new Error(`CSV not found: ${file}`);
      return res.text();
    })
  )
)
  .then(texts => {
    let added = 0;

    texts.forEach((text, fileIdx) => {
      const raw = text.trim();
      if (!raw) {
        console.warn("Empty CSV:", CSV_FILES[fileIdx]);
        return;
      }

      const lines = raw.split(/\r?\n/);
      let headers = splitCSVLine(lines.shift()).map(h => h.trim());

      // Clean BOM if present (Excel/Sheets sometimes add it)
      if (headers[0] && headers[0].startsWith("\uFEFF")) {
        headers[0] = headers[0].replace("\uFEFF", "");
      }

      lines.forEach((line, i) => {
        if (!line.trim()) return;

        const cols = splitCSVLine(line);
        const row = Object.fromEntries(headers.map((h, j) => [h, (cols[j] ?? "").trim()]));

        const groupId = GROUP_MAP[row.group];
        if (!groupId) {
          console.warn("Unknown group:", row.group, "title:", row.title);
          return;
        }

        const start = Number(row.start_year);
        if (Number.isNaN(start)) {
          console.warn("Bad start_year:", row.start_year, "title:", row.title);
          return;
        }

        const item = {
          id: `csv_${fileIdx}_${i}`,          // stable unique ID
          group: groupId,
          content: row.title || "(untitled)",
          start: dateY(start),
          title: row.description || row.title || ""
        };

        const endStr = (row.end_year || "").trim();
        if (endStr) {
          const end = Number(endStr);
          if (!Number.isNaN(end)) {
            item.end = dateY(end);
            item.type = "range";
          }
        }

        if (row.class) item.className = row.class;

        items.add(item);
        added++;
      });
    });

    console.log(`Loaded ${added} timeline items`);

    const container = document.getElementById("timeline");
    const timeline = new vis.Timeline(container, items, groups, {
      orientation: { axis: "top" },
      stack: true,
      zoomKey: "ctrlKey",
      horizontalScroll: true,
      verticalScroll: true,
      min: dateY(-4500),
      max: dateY(2300)
    });

    timeline.fit();
  })
  .catch(err => {
    console.error(err);
    alert(err.message);
  });
