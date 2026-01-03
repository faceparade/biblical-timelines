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
  {
    id: 1,
    group: 'patriarchs',
    content: 'Adam',
    start: '-4026',
    end: '-3096'
  },
  {
    id: 2,
    group: 'patriarchs',
    content: 'Noah',
    start: '-2970',
    end: '-2020'
  },
  {
    id: 3,
    group: 'prophecy',
    content: 'Gentile Times',
    start: '-607',
    end: '1914'
  },
  {
    id: 4,
    group: 'org',
    content: '1914',
    start: '1914'
  },
  {
    id: 5,
    group: 'envelope',
    content: 'Reasonable overlap envelope',
    start: '1914',
    end: '2026'
  }
]);

const container = document.getElementById('timeline');

const options = {
  stack: false,
  zoomMin: 1000 * 60 * 60 * 24 * 365 * 10,     // ~10 years
  zoomMax: 1000 * 60 * 60 * 24 * 365 * 10000,  // ~10,000 years
  horizontalScroll: true,
  verticalScroll: true
};

new vis.Timeline(container, items, groups, options);
