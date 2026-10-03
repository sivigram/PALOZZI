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

## Emailing PDF reports with Gmail

The **Send PDF by email** button sends the generated four-page report through a Netlify Function, Nodemailer and Gmail. Gmail credentials are never exposed to the browser.

1. Enable two-step verification on the Google account that will send the reports.
2. In the Google account security settings, create an App Password for the application.
3. In Netlify, open **Site configuration → Environment variables**.
4. Add `GMAIL_USER` with the full Gmail or Google Workspace email address.
5. Add `GMAIL_APP_PASSWORD` with the 16-character App Password. Do not use the normal Google account password.
6. Optionally add `GMAIL_FROM_NAME`; it defaults to `THE COLOR RITUAL`.
7. Redeploy the site so the function receives the new variables.

Gmail may enforce daily sending limits. For higher-volume transactional delivery, use a dedicated SMTP or transactional email provider.

The default email copy is defined in `netlify/functions/send-pdf.mjs`. It currently sends this message:

> Dear [Client name],
>
> Thank you for taking part in your personalised colour consultation.
>
> Your result is **[Season name]**. Your attached report includes your seasonal profile, complete colour palette, personalised styling guidance and technical colour references.
>
> Use it as a practical wardrobe companion when choosing clothing, accessories, metals and colour combinations.
>
> Warm regards,
>
> [Consultant name]
