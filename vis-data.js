// vis-data.js — unified CSV schema loader with validation; points render as DOTS via class "anchor"

function dateY(year, month = 1, day = 1) {
  const d = new Date(Date.UTC(0, month - 1, day));
  d.setUTCFullYear(Number(year));
  return d;
}

const CSV_FILES = [
  "./patriarch_lifespans_full.csv",
  "./adamic_anchor_events.csv",
  "./adamic_era_ranges.csv",
  "./adamic_detail_events.csv",
  "./gen10_nations_spans.csv",
  "./jw_prophetic_overlays.csv",
  "./demographic_envelope.csv",
  "./prophecy_meta_ranges.csv"
];

const groups = new vis.DataSet([
  { id: "adamic_anchors", content: "Human Moral History — Anchors (Adamic)" },
  { id: "adamic_details", content: "Human Moral History — Details (Adamic)" },
  { id: "patriarchs", content: "Patriarch Lifespans" },
  { id: "nations", content: "Genesis 10 Nations (Table of Nations)" },
  { id: "jw_prophecy", content: "JW Prophetic Overlays (Interpretive)" },
  { id: "prophecy_meta", content: "Authorship + Fulfillment Windows" },
  { id: "demographic", content: "Demographic Envelope (Non-Doctrinal)" }
]);

const GROUP_MAP = {
  "Human Moral History (Adamic)": "adamic_anchors",
  "Human Moral History — Anchors (Adamic)": "adamic_anchors",
  "Human Moral History — Details (Adamic)": "adamic_details",
  "Patriarch Lifespans": "patriarchs",
  "Genesis 10 Nations (Table of Nations)": "nations",
  "Table of Nations": "nations",
  "JW Prophetic Overlays (Interpretive)": "jw_prophecy",
  "JW Prophetic Overlays": "jw_prophecy",
  "JW Prophecy": "jw_prophecy",
  "Authorship + Fulfillment Windows": "prophecy_meta",
  "Prophecy Meta": "prophecy_meta",
  "Demographic Envelope (Non-Doctrinal)": "demographic",
  "Demographic Envelope": "demographic"
};

const items = new vis.DataSet();

const REQUIRED_FIELDS = ["id", "group", "type", "start_year", "label", "title"];
const ALLOWED_TYPES = new Set(["point", "range"]);
const seenIds = new Set();

// Quote-aware CSV splitter (handles commas inside quotes and doubled quotes)
function splitCSVLine(line) {
  return line
    .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
    .map(c => c.replace(/^"|"$/g, ""))
    .map(c => c.replace(/""/g, '"'));
}

function parseIntField(value) {
  if (value === undefined || value === null || value === "") return NaN;
  const num = Number(value);
  return Number.isFinite(num) ? num : NaN;
}

function parseLabelThreshold(value) {
  if (value === undefined || value === null) return undefined;
  const trimmed = String(value).trim();
  if (!trimmed) return undefined;
  const num = Number(trimmed);
  return Number.isFinite(num) ? num : undefined;
}

function validateMonthDay(num, min, max) {
  if (Number.isNaN(num)) return undefined;
  if (!Number.isInteger(num) || num < min || num > max) return null;
  return num;
}

function buildItemFromRow(row, fileName, lineNumber) {
  const missing = REQUIRED_FIELDS.filter(f => !String(row[f] || "").trim());
  if (missing.length) {
    console.error(`${fileName} [line ${lineNumber}]: missing required field(s): ${missing.join(", ")}`);
    return null;
  }

  const id = String(row.id).trim();
  if (seenIds.has(id)) {
    console.error(`${fileName} [line ${lineNumber}]: duplicate id "${id}" — skipping`);
    return null;
  }

  const groupId = GROUP_MAP[row.group];
  if (!groupId) {
    console.error(`${fileName} [line ${lineNumber}]: unknown group "${row.group}"`);
    return null;
  }

  const type = String(row.type || "").toLowerCase();
  if (!ALLOWED_TYPES.has(type)) {
    console.error(`${fileName} [line ${lineNumber}]: invalid type "${row.type}" (expected "point" or "range")`);
    return null;
  }

  const startYear = parseIntField(row.start_year);
  if (Number.isNaN(startYear)) {
    console.error(`${fileName} [line ${lineNumber}]: invalid start_year "${row.start_year}"`);
    return null;
  }

  const startMonth = validateMonthDay(parseIntField(row.start_month), 1, 12);
  const startDay = validateMonthDay(parseIntField(row.start_day), 1, 31);
  if (startMonth === null) {
    console.error(`${fileName} [line ${lineNumber}]: start_month out of range`);
    return null;
  }
  if (startDay === null) {
    console.error(`${fileName} [line ${lineNumber}]: start_day out of range`);
    return null;
  }

  let endYear = parseIntField(row.end_year);
  const endMonth = validateMonthDay(parseIntField(row.end_month), 1, 12);
  const endDay = validateMonthDay(parseIntField(row.end_day), 1, 31);
  if (endMonth === null) {
    console.error(`${fileName} [line ${lineNumber}]: end_month out of range`);
    return null;
  }
  if (endDay === null) {
    console.error(`${fileName} [line ${lineNumber}]: end_day out of range`);
    return null;
  }

  if (type === "range" && Number.isNaN(endYear)) {
    console.error(`${fileName} [line ${lineNumber}]: range item requires end_year`);
    return null;
  }
  if (type === "point") {
    endYear = NaN;
  }

  const label = String(row.label || "").trim();
  const titleBase = String(row.title || label).trim();
  const classParts = [];
  if (row.className && String(row.className).trim()) {
    classParts.push(String(row.className).trim());
  }
  if (type === "point") {
    classParts.push("anchor");
  }

  const item = {
    id,
    group: groupId,
    type,
    start: dateY(startYear, startMonth || 1, startDay || 1),
    content: label,
    title: titleBase
  };

  if (!Number.isNaN(endYear)) {
    item.end = dateY(endYear, endMonth || 1, endDay || 1);
    item.title = `${titleBase} (${startYear} → ${endYear})`;
  }

  if (classParts.length) {
    item.className = classParts.join(" ");
  }

  if (row.subgroup && String(row.subgroup).trim()) {
    item.subgroup = String(row.subgroup).trim();
  }

  const labelThreshold = parseLabelThreshold(row.label_min_years);
  if (labelThreshold !== undefined) {
    item.labelMinYears = labelThreshold;
  }

  seenIds.add(id);
  return item;
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

        const item = buildItemFromRow(row, CSV_FILES[fileIdx], i + 2);
        if (item) {
          items.add(item);
          added++;
        }
      });
    });

    console.log(`Loaded ${added} timeline items`);

    const container = document.getElementById("timeline");
    const options = {
      orientation: { axis: "top" },
      stack: true,
      maxHeight: "100%",
      tooltip: { followMouse: true, overflowMethod: "cap" },
      zoomKey: "ctrlKey",
      horizontalScroll: true,
      verticalScroll: true,
      min: dateY(-4500),
      max: dateY(2300)
    };

    const timeline = new vis.Timeline(container, items, groups, options);

    timeline.setOptions({
      template: function (item) {
        // Hide noisy inline labels when zoomed far out; rely on hover tooltips (title)
        const w = timeline.getWindow();
        const years = (w.end - w.start) / (1000 * 60 * 60 * 24 * 365.25);

        const defaultThreshold = item.type === "point" ? 2500 : 1200;
        const threshold = item.labelMinYears ?? defaultThreshold;

        if (years > threshold) return "";
        return item.content || "";
      }
    });

    timeline.fit();
  })
  .catch(err => {
    console.error(err);
    alert(err.message);
  });
