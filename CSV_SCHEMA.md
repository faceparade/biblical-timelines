# CSV Schema

Canonical column order (all CSV files must use this exact header):

```
id,group,type,start_year,start_month,start_day,end_year,end_month,end_day,label,title,className,subgroup,label_min_years
```

Field rules:
- `id`: unique string across all files.
- `group`: display name; must map to a known group id in `GROUP_MAP` (e.g., "Patriarch Lifespans").
- `type`: `point` or `range` (lowercase).
- `start_year`: integer (negative for BCE).
- `start_month` / `start_day`: optional integers (1–12 / 1–31).
- `end_year`: required for `range`, empty for `point`. `end_month` / `end_day` optional.
- `label`: short inline label; keep concise for zoomed-in views.
- `title`: long hover text; always quote `label` and `title` to avoid comma breakage.
- `className`: optional CSS class list.
- `subgroup`: optional; can be used for custom stacking.
- `label_min_years`: optional number; hide the inline label when the visible window is wider than this many years (defaults: points 2500, ranges 1200).

Validation behavior:
- Rows missing required fields, invalid numbers, out-of-range months/days, or unknown groups are skipped with a console error.
- Duplicate `id` values across any CSV are skipped.

Examples:

Point:
```
adamic_anchor_flood,"Human Moral History (Adamic)","point",-2370,,,,,,"Flood","Flood begins (Genesis 7:11)","flood",""
```

Range:
```
patriarch_noah,"Patriarch Lifespans","range",-2970,,,-2020,,,"Noah","Noah lifespan (950 years): -2970 to -2020","patriarch",""
```

Current files using this schema:
- `patriarch_lifespans_full.csv`
- `adamic_anchor_events.csv`
- `gen10_nations_spans.csv`
- `jw_prophetic_overlays.csv`
- `demographic_envelope.csv`
