# PALOZZI
## Editing colour palettes

Palette colours are stored in `src/data/palettes.json` so they can be edited without changing the TypeScript season definitions.

1. Open `src/data/palettes.json`.
2. Find the required season key, for example `bright-winter` or `true-autumn`.
3. Add, remove, reorder or edit colour objects inside that season array.
4. Required fields:
   - `name`
   - `hex`
   - `category`
5. Optional fields:
   - `pantone`
   - `pantoneStatus`
6. Valid `category` values are:
   - `Neutrals`
   - `Reds and pinks`
   - `Blues`
   - `Greens`
   - `Yellows and oranges`
   - `Purples`
   - `Accent colours`
7. Valid `pantoneStatus` values are:
   - `verified`
   - `approximate`
   - `null`
8. Keep JSON commas and quotation marks valid. Every object property must use double quotes, and every item needs a comma except the final item in an array.
9. RGB and HSL values are calculated automatically from `hex`; do not add RGB or HSL values to the JSON file.
10. A new GitHub commit automatically triggers a Netlify deployment.

Copy-and-paste example:

```json
{
  "name": "Royal Blue",
  "hex": "#2454C6",
  "pantone": "2728 C",
  "pantoneStatus": "approximate",
  "category": "Blues"
}
```
