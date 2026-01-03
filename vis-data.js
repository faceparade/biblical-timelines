// vis-data.js — HARD FAIL + DEEP TIME WINDOW

function dateY(year, month = 1, day = 1) {
  const d = new Date(Date.UTC(0, month - 1, day));
  d.setUTCFullYear(Number(year));
  return d;
}

// ===============================
// CONFIG — CHANGE ONLY THIS LINE
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
  "Demographic Envelope": "demographic"
};

const items = new vis.DataSet();

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

  texts.forEach(text => {
    const lines = text.trim().split(/\r?\n/);
    const headers = lines.shift().split(",");

    lines.forEach((line, i) => {
      if (!line.trim()) return;

      const cols = line.split(",");
      const row = Object.fromEntries(
        headers.map((h, i) => [h.trim(), cols[i]])
      );

      const groupId = GROUP_MAP[row.group];
      if (!groupId) return;

      const start = Number(row.start_year);
      if (Number.isNaN(start)) return;

      const item = {
        id: `${row.title}_${added}`,
        group: groupId,
        content: row.title,
        start: dateY(start),
        title: row.description || row.title
      };

      if (row.end_year) {
        item.end = dateY(Number(row.end_year));
        item.type = "range";
      }

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
});
