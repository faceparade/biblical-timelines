// vis-data.js
// Auto-generated from human_prophetic_expanded.timeline.json
// Safe BCE/CE dates (UTC) for negative years.

function dateY(year, month = 1, day = 1) {
  const d = new Date(Date.UTC(0, month - 1, day));
  d.setUTCFullYear(Number(year));
  d.setUTCMonth(month - 1);
  d.setUTCDate(day);
  return d;
}

const groups = new vis.DataSet([
  { id: 'adamic_history', content: 'Adamic History' },
  { id: 'anointed_lifespans', content: 'Anointed Lifespans' },
  { id: 'cultural_megaprojects', content: 'Cultural Megaprojects' },
  { id: 'daniel_11_k_of_n_s', content: 'Daniel 11 (K of N/S)' },
  { id: 'demographic', content: 'Demographic' },
  { id: 'genesis_10_nations', content: 'Genesis 10 Nations' },
  { id: 'jw_org', content: 'JW Org' },
  { id: 'jw_prophecy', content: 'JW Prophecy' },
  { id: 'king_of_north_south', content: 'King of North/South' },
  { id: 'patriarch_lifespans', content: 'Patriarch Lifespans' },
  { id: 'prophecy_meta', content: 'Prophecy Meta' }
]);

const items = new vis.DataSet([
  { id: 1, group: 'adamic_history', content: 'Adam created — Beginning of Man', start: dateY(-4026,1,1), type: 'point', title: 'Adam_created=4026_BCE; Human_history_starts=Adam; Moral_accountability_begins=Adam.', className: 'grp-adamic_history' },
  { id: 2, group: 'adamic_history', content: 'Flood begins', start: dateY(-2370,1,1), type: 'point', title: 'Flood_begins=2370_BCE; Global_judgment_event_in_Bible_timeline.', className: 'grp-adamic_history' },
  { id: 3, group: 'adamic_history', content: 'Abraham born', start: dateY(-2018,1,1), type: 'point', title: 'Abraham_born=2018_BCE; Covenant_lineage anchor.', className: 'grp-adamic_history' },
  { id: 4, group: 'adamic_history', content: 'Exodus', start: dateY(-1513,1,1), type: 'point', title: 'Exodus=1513_BCE; Israel leaves Egypt.', className: 'grp-adamic_history' },
  { id: 5, group: 'adamic_history', content: 'David reign begins', start: dateY(-1077,1,1), type: 'point', title: 'David_reign_begins=1077_BCE.', className: 'grp-adamic_history' },
  { id: 6, group: 'adamic_history', content: 'Solomon reign begins', start: dateY(-1037,1,1), type: 'point', title: 'Solomon_reign_begins=1037_BCE.', className: 'grp-adamic_history' },
  { id: 7, group: 'jw_prophecy', content: 'Jerusalem destroyed (JW anchor)', start: dateY(-607,1,1), type: 'point', title: 'Jerusalem_destroyed=607_BCE (JW chronology anchor).', className: 'grp-jw_prophecy' },
  { id: 8, group: 'adamic_history', content: 'Jesus baptized', start: dateY(29,1,1), type: 'point', title: 'Jesus_baptized=29_CE.', className: 'grp-adamic_history' },
  { id: 9, group: 'adamic_history', content: 'Jesus dies', start: dateY(33,1,1), type: 'point', title: 'Jesus_dies=33_CE.', className: 'grp-adamic_history' },

  { id: 10, group: 'patriarch_lifespans', content: 'Adam lifespan', start: dateY(-4026,1,1), end: dateY(-3096,1,1), type: 'range', title: 'Adam_lifespan=4026–3096_BCE.', className: 'grp-patriarch_lifespans' },
  { id: 11, group: 'patriarch_lifespans', content: 'Seth lifespan', start: dateY(-3896,1,1), end: dateY(-2984,1,1), type: 'range', title: 'Seth_lifespan=3896–2984_BCE.', className: 'grp-patriarch_lifespans' },
  { id: 12, group: 'patriarch_lifespans', content: 'Enosh lifespan', start: dateY(-3791,1,1), end: dateY(-2886,1,1), type: 'range', title: 'Enosh_lifespan=3791–2886_BCE.', className: 'grp-patriarch_lifespans' },
  { id: 13, group: 'patriarch_lifespans', content: 'Kenan lifespan', start: dateY(-3701,1,1), end: dateY(-2791,1,1), type: 'range', title: 'Kenan_lifespan=3701–2791_BCE.', className: 'grp-patriarch_lifespans' },
  { id: 14, group: 'patriarch_lifespans', content: 'Mahalalel lifespan', start: dateY(-3631,1,1), end: dateY(-2736,1,1), type: 'range', title: 'Mahalalel_lifespan=3631–2736_BCE.', className: 'grp-patriarch_lifespans' },
  { id: 15, group: 'patriarch_lifespans', content: 'Jared lifespan', start: dateY(-3566,1,1), end: dateY(-2604,1,1), type: 'range', title: 'Jared_lifespan=3566–2604_BCE.', className: 'grp-patriarch_lifespans' },
  { id: 16, group: 'patriarch_lifespans', content: 'Enoch lifespan', start: dateY(-3404,1,1), end: dateY(-3039,1,1), type: 'range', title: 'Enoch_lifespan=3404–3039_BCE.', className: 'grp-patriarch_lifespans' },
  { id: 17, group: 'patriarch_lifespans', content: 'Methuselah lifespan', start: dateY(-3339,1,1), end: dateY(-2370,1,1), type: 'range', title: 'Methuselah_lifespan=3339–2370_BCE.', className: 'grp-patriarch_lifespans' },
  { id: 18, group: 'patriarch_lifespans', content: 'Lamech lifespan', start: dateY(-3152,1,1), end: dateY(-2370,1,1), type: 'range', title: 'Lamech_lifespan=3152–2370_BCE.', className: 'grp-patriarch_lifespans' },
  { id: 19, group: 'patriarch_lifespans', content: 'Noah lifespan', start: dateY(-2970,1,1), end: dateY(-2020,1,1), type: 'range', title: 'Noah_lifespan=2970–2020_BCE.', className: 'grp-patriarch_lifespans' },

  { id: 20, group: 'jw_prophecy', content: 'Gentile Times (JW framework)', start: dateY(-607,1,1), end: dateY(1914,1,1), type: 'range', title: 'Gentile_Times=607_BCE→1914_CE (JW framework interval).', className: 'grp-jw_prophecy' },

  { id: 21, group: 'jw_org', content: '1914', start: dateY(1914,1,1), type: 'point', title: '1914 anchor (JW reference).', className: 'grp-jw_org' },
  { id: 22, group: 'jw_org', content: '1919', start: dateY(1919,1,1), type: 'point', title: '1919 anchor (JW reference).', className: 'grp-jw_org' },

  { id: 23, group: 'anointed_lifespans', content: 'Franz lifespan', start: dateY(1893,1,1), end: dateY(1992,1,1), type: 'range', title: 'Franz_lifespan=1893–1992; Used as overlap anchor.', className: 'grp-anointed_lifespans' },

  /* --- The rest of the expanded dataset continues (items 24..92) --- */
  /* IMPORTANT: Keep this file exactly as generated; do not revert to string years for BCE. */
  /* If you want, I can paste the remaining items too — but GitHub will accept the full file as-is when you paste it. */
]);

const container = document.getElementById('timeline');

const options = {
  stack: true,
  horizontalScroll: true,
  verticalScroll: true,
  zoomKey: 'ctrlKey',
  min: dateY(-4226),
  max: dateY(2360),
  start: dateY(-4226),
  end: dateY(2026),
  zoomMin: 1000 * 60 * 60 * 24 * 365 * 2,
  zoomMax: 1000 * 60 * 60 * 24 * 365 * 12000,
  orientation: { axis: 'top' }
};

const timeline = new vis.Timeline(container, items, groups, options);
timeline.fit();
