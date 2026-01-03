// vis-data.js — FULL CSV EMITTER (authoritative)
// Loads TimelineJS_Master_Unified.csv and converts ALL rows into vis-timeline items.

function dateY(year, month = 1, day = 1) {
  const d = new Date(Date.UTC(0, month - 1, day));
  d.setUTCFullYear(Number(year));
  d.setUTCMonth(month - 1);
  d.setUTCDate(day);
  return d;
}

// --- Groups (lanes) ---
const groups = new vis.DataSet([
  { id: "Human Moral History (Adamic)", content: "Human Moral History (Adamic)" },
  { id: "Patriarch Lifespans", content: "Patriarch Lifespans" },
  { id: "Anointed Lifespans", content: "Anointed Lifespans" },
  { id: "Genesis 10 Nations", content: "Genesis 10 Nations" },
  { id: "Cultural Megaprojects", content: "Cultural Megaprojects" },
  { id: "King of North/South", content: "King of North/South" },
  { id: "JW Prophecy", content: "JW Prophecy" },
  { id: "Prophecy Meta", content: "Authorship + Fulfillment Windows" },
  { id: "Demographic Envelope", content: "Demographic Envelope (Non-Doctrinal)" }
]);

const items = new vis.DataSet();

// --- CSV Loader ---
fetch("./TimelineJS_Master_Unified.csv")
  .then(res => res.text())
  .then(text => {
    const lines = text.split(/\r?\n/);
    const headers = lines.shift().split(",");

    lines.forEach((line, i) => {
      if (!line.trim()) return;

      const cols = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
                       .map(c => c.replace(/^"|"$/g, ""));

      const row = Object.fromEntries(headers.map((h, i) => [h, cols[i]]));

      const startYear = Number(row.start_year);
      const endYear = row.end_year ? Number(row.end_year) : null;

      const item = {
        id: `csv_${i}`,
        group: row.group,
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

    // --- Timeline ---
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
