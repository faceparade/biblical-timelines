// vis-data.js — multi-CSV loader; robust CSV parsing; anchor points as DOTS

function dateY(year, month = 1, day = 1) {
  const d = new Date(Date.UTC(0, month - 1, day));
  d.setUTCFullYear(Number(year));
  return d;
}

const CSV_FILES = [
  "./patriarch_lifespans_full.csv",
  "./adamic_anchor_events.csv"
];

const groups = new vis.DataSet([
  { id: "adamic", content: "Human Moral History (Adamic)" },
  { id: "patriarchs", content: "Patriarch Lifespans" },
  { id: "jw_prophecy", content: "JW Prophetic Overlays" },
  { id: "prophecy_meta", content: "Authorship + Fulfillment Windows" },
  { id: "demographic", content: "Demographic Envelope (Non-Doctrinal)" }
]);

const GROUP_MAP = {
  "Human Moral History (Adamic)": "adamic",
  "Patriarch Lifespans": "patriarchs",
  "JW Prophetic Overlays": "jw_prophecy",
  "JW Prophecy": "jw_prophecy",
  "Authorship + Fulfillment Windows": "prophecy_meta",
  "Prophecy Meta": "prophecy_meta",
  "Demographic Envelope (Non-Doctrinal)": "demographic",
  "Demographic Envelope": "demographic"
};

const items = new vis.DataSet();

// Create a short label for point items to reduce overlap while keeping full text in tooltip
function shortPointLabel(fullTitle) {
  const safe = (fullTitle || "").trim();
  if (!safe) return "(point)";

  const noParen = safe.split("(")[0];
  const noDash = noParen.split(/[—-]/)[0];
  const trimmed = (noDash || safe).trim();
  const firstWord = trimmed.split(/\s+/)[0];

  return firstWord || trimmed || "(point)";
}

function splitCSVLine(line) {
  return line
    .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
    .map(c => c.replace(/^"|"$/g, ""))
    .map(c => c.replace(/""/g, '"'));
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
      if (!raw) return;

      const lines = raw.split(/\r?\n/);
      let headers = splitCSVLine(lines.shift() || "").map(h => h.trim());

      // strip BOM if present
      if (headers[0] && headers[0].startsWith("\uFEFF")) {
        headers[0] = headers[0].replace("\uFEFF", "");
      }

      lines.forEach((line, i) => {
        if (!line.trim()) return;

        const cols = splitCSVLine(line).map(c => c.trim());
        const row = Object.fromEntries(headers.map((h, j) => [h, cols[j] ?? ""]));

        const groupId = GROUP_MAP[row.group];
        if (!groupId) return;

        const start = Number(row.start_year);
        if (Number.isNaN(start)) return;

        const endStr = (row.end_year || "").trim();
        const endNum = endStr ? Number(endStr) : NaN;
        const isPoint = !endStr || Number.isNaN(endNum);

        const fullTitle = row.title || "(untitled)";
        const tooltip = row.description || fullTitle;

        const item = {
          id: `csv_${fileIdx}_${i}`,
          group: groupId,
          content: fullTitle,
          start: dateY(start),
          title: tooltip
        };

        if (isPoint) {
          item.content = shortPointLabel(fullTitle);
          item.type = "point";
          item.className = [row.class, "anchor"].filter(Boolean).join(" ");
        } else {
          item.end = dateY(endNum);
          item.type = "range";
          item.className = row.class || "";
        }

        items.add(item);
        added++;
      });
    });

    console.log(`Loaded ${added} timeline items`);

    const container = document.getElementById("timeline");
    const timeline = new vis.Timeline(container, items, groups, {
      orientation: { axis: "top" },
      stack: false,
      maxHeight: "100%",
      tooltip: { followMouse: true, overflowMethod: "cap" },
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
