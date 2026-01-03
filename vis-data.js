// vis-data.js (v2)
// Readability + right-side breathing room for future windows.
// BCE-safe Date handling (negative years) via dateY().

function dateY(year, month = 1, day = 1) {
  const d = new Date(Date.UTC(0, month - 1, day));
  d.setUTCFullYear(Number(year));
  d.setUTCMonth(month - 1);
  d.setUTCDate(day);
  return d;
}

// Groups (lanes)
const groups = new vis.DataSet([
  { id: "L1_adamic_human_history", content: "Human Moral History (Adamic)" },
  { id: "L2_jw_prophetic_framework", content: "JW Prophetic Overlays" },
  { id: "L3_authorship_fulfillment_meta", content: "Authorship + Date Written + Fulfillment Windows" },
  { id: "L4_demographic_stress_test", content: "Demographic Envelope (Non-Doctrinal)" }
]);

const items = new vis.DataSet([
  // --- L1 Adamic anchors ---
  {
    id: "adam",
    group: "L1_adamic_human_history",
    content: "Adam — Beginning of Man",
    start: dateY(-4026),
    type: "point",
    title:
      "Adam_created=4026_BCE\nHuman_history_starts=Adam\nMoral_accountability_begins=Adam\n\n" +
      "Verses:\nGenesis 1:26-27; Genesis 2:7; Genesis 2:15-17; Genesis 3:6-7; Genesis 3:15; Romans 5:12"
  },
  { id: "flood", group: "L1_adamic_human_history", content: "Flood", start: dateY(-2370), type: "point", title: "Flood=2370_BCE\nVerses: Genesis 6–9" },
  { id: "abraham", group: "L1_adamic_human_history", content: "Abraham born", start: dateY(-2018), type: "point", title: "Abraham_born=2018_BCE\nVerses: Genesis 12:1–4" },
  { id: "exodus", group: "L1_adamic_human_history", content: "Exodus", start: dateY(-1513), type: "point", title: "Exodus=1513_BCE\nVerses: Exodus 12; Exodus 14" },
  {
    id: "jerusalem_607",
    group: "L1_adamic_human_history",
    content: "Jerusalem destroyed (607 BCE — JW anchor)",
    start: dateY(-607),
    type: "point",
    title: "Jerusalem_destroyed=607_BCE\nVerses: 2 Kings 25"
  },
  { id: "jesus_baptized", group: "L1_adamic_human_history", content: "Jesus baptized", start: dateY(29), type: "point", title: "Jesus_baptized=29_CE\nVerses: Luke 3:21–23" },
  { id: "jesus_dies", group: "L1_adamic_human_history", content: "Jesus dies", start: dateY(33), type: "point", title: "Jesus_dies=33_CE\nVerses: Matthew 27" },

  // --- L2 JW prophetic overlay ---
  {
    id: "gentile_times",
    group: "L2_jw_prophetic_framework",
    content: "Gentile Times (607 BCE → 1914 CE)",
    start: dateY(-607),
    end: dateY(1914),
    type: "range",
    className: "prophecy-band",
    title: "Gentile_Times_start=607_BCE\nGentile_Times_end=1914_CE\nDuration_years=2520\nVerses: Daniel 4; Luke 21:24"
  },

  // --- L4 demographic envelope (non-doctrinal) ---
  {
    id: "overlap_anchor_1992",
    group: "L4_demographic_stress_test",
    content: "Overlap anchor (1992)",
    start: dateY(1992),
    type: "point",
    title:
      "First_gen_last_overlap=1992\nSecond_gen_birth_latest=1992\n" +
      "Used as NON-DOCTRINAL overlap anchor for envelope math."
  },
  {
    id: "env_min",
    group: "L4_demographic_stress_test",
    content: "Envelope (minimum) → ~2026",
    start: dateY(1914),
    end: dateY(2026),
    type: "range",
    className: "demographic-band",
    title:
      "Demographic (NON-DOCTRINAL)\nMinimum_end≈2026\nMinimum_anointing_age≈20\nContext ref: Matthew 24:34"
  },
  {
    id: "env_reasonable",
    group: "L4_demographic_stress_test",
    content: "Envelope (reasonable) → ~2095",
    start: dateY(1914),
    end: dateY(2095),
    type: "range",
    className: "demographic-band",
    title: "Demographic (NON-DOCTRINAL)\nReasonable_end≈2080–2095 (displayed to 2095)"
  },
  {
    id: "env_extreme",
    group: "L4_demographic_stress_test",
    content: "Envelope (extreme) → ~2160",
    start: dateY(1914),
    end: dateY(2160),
    type: "range",
    className: "demographic-band",
    title: "Demographic (NON-DOCTRINAL)\nExtreme_end≈2150–2160 (displayed to 2160)"
  }
]);

// --- L3 Prophecy meta overlays ---
// IMPORTANT: To avoid right-edge label pileups, keep the on-bar label SHORT.
// Put the detailed text in `title` (hover tooltip).

const prophecyMeta = [
  // Daniel
  { id: "pm_daniel_written", content: "Daniel written (~605–535 BCE)", start: -605, end: -535,
    title: "Author=Daniel\nWriting_Date≈605–535_BCE\nLocation=Babylon/Persia" },

  { id: "pm_daniel_fulfill", content: "Daniel: fulfillment window", start: -600, end: 2300,
    title: "Fulfillment_Window≈600_BCE–future\nStatus=Ongoing/Future\n(Visual end padded to 2300 for readability)" },

  // Isaiah
  { id: "pm_isaiah_written", content: "Isaiah written (~740–680 BCE)", start: -740, end: -680,
    title: "Author=Isaiah son of Amoz\nWriting_Date≈740–680_BCE\nLocation=Judah" },

  { id: "pm_isaiah_fulfill", content: "Isaiah: fulfillment window", start: -539, end: 2300,
    title: "Fulfillment_Start≈539_BCE\nStatus=Progressive/Future\n(Visual end padded to 2300 for readability)" },

  // Ezekiel
  { id: "pm_ezekiel_written", content: "Ezekiel written (~613–591 BCE)", start: -613, end: -591,
    title: "Author=Ezekiel\nWriting_Date≈613–591_BCE\nLocation=Babylonian exile" },

  { id: "pm_ezekiel_fulfill", content: "Ezekiel 38–39 (future)", start: 1914, end: 2300,
    title: "Gog of Magog\nStatus=Future (per your meta layer)\n(Visual end padded to 2300)" },

  // Zechariah
  { id: "pm_zech_written", content: "Zechariah written (~520–518 BCE)", start: -520, end: -518,
    title: "Author=Zechariah\nWriting_Date≈520–518_BCE\nLocation=Post-exilic Jerusalem" },

  { id: "pm_zech_fulfill", content: "Zechariah (future)", start: 1914, end: 2300,
    title: "Nations against Jerusalem\nStatus=Future (per your meta layer)\n(Visual end padded to 2300)" },

  // Joel
  { id: "pm_joel_written", content: "Joel written (~800–700 BCE)", start: -800, end: -700,
    title: "Author=Joel\nWriting_Date≈800–700_BCE (range)\nLocation=Judah" },

  { id: "pm_joel_fulfill", content: "Joel: last days → future", start: 1914, end: 2300,
    title: "Day of Jehovah\nStatus=Ongoing/Future (per your meta layer)\n(Visual end padded to 2300)" },

  // Olivet Prophecy
  { id: "pm_olivet_delivered", content: "Olivet delivered (~33 CE)", start: 33, end: 33,
    title: "Speaker=Jesus\nDelivered≈33_CE\nRecorded≈41–98_CE (composite range)" },

  { id: "pm_olivet_fulfill", content: "Olivet: fulfillment window", start: 1914, end: 2300,
    title: "Fulfillment_Start=1914_CE\nFulfillment_End=Great_Tribulation (future)\n(Visual end padded to 2300)" },

  // Revelation
  { id: "pm_rev_written", content: "Revelation written (~96 CE)", start: 96, end: 96,
    title: "Author=John\nWriting_Date≈96_CE\nLocation=Patmos" },

  { id: "pm_rev_fulfill", content: "Revelation: fulfillment window", start: 1914, end: 2300,
    title: "Fulfillment≈1914_CE–future\nStatus=Ongoing/Future\n(Visual end padded to 2300)" }
];

for (const p of prophecyMeta) {
  const isPoint = (p.start === p.end);
  items.add({
    id: p.id,
    group: "L3_authorship_fulfillment_meta",
    content: p.content,
    start: dateY(p.start),
    ...(isPoint ? { type: "point" } : { end: dateY(p.end), type: "range", className: "meta-band" }),
    title: p.title
  });
}

// Timeline options
const container = document.getElementById("timeline");

const options = {
  stack: true,
  horizontalScroll: true,
  verticalScroll: true,
  zoomKey: "ctrlKey",
  orientation: { axis: "top" },

  // Give right-side breathing room so labels don’t pile up at the edge
  min: dateY(-4500),
  max: dateY(2300),

  // Start roughly where your spine lives; fit() will then zoom to the data
  start: dateY(-4500),
  end: dateY(2300),

  zoomMin: 1000 * 60 * 60 * 24 * 365 * 1,
  zoomMax: 1000 * 60 * 60 * 24 * 365 * 14000,

  // Small margin helps unclutter stacks
  margin: { item: 8, axis: 12 }
};

const timeline = new vis.Timeline(container, items, groups, options);
timeline.fit();
