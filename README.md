# Christian Reformed Church of South Gippsland (CRCSG) Website

A modern, fast, **100% static website** with **zero backend servers, zero databases, zero API keys, and zero software updates** required.

---

## Folder Structure

- `index.html` — Home page
- `what-to-expect.html` — Sunday services, Kids Church, and Care Commitment
- `what-we-believe.html` — Ecumenical Creeds, Reformed Confessions, and the Five Solas
- `sermons.html` — Auto-updating YouTube sermon player & series links
- `leadership.html` — Church Council (Session): Pastor, Elders, Deacon, Clerk
- `contact.html` — Pastor contact details, Leongatha map, and PayID / Bank Transfer giving details
- `safeguarding.html` — Safeguarding Children policy statement, `000` notice, contacts, and PDF viewer
- `assets/js/site-config.js` — **Single easy-to-edit settings file** for volunteers
- `assets/js/main.js` — Navigation menu, Copy buttons, and YouTube embed wiring
- `assets/css/styles.css` — Visual styling ("Warm South Gippsland" theme)
- `assets/images/` — Photos and browser favicon

---

## How Volunteers Can Make Common Updates

### 1. Updating Names, Phone Numbers, Emails, Leadership, or Bank Details
Open **`assets/js/site-config.js`** in Notepad (Windows) or TextEdit (Mac):
- Every section has plain-English comments explaining what each line controls.
- Edit only the text inside `"quotation marks"`.
- Leave commas, colons, and brackets as they are.
- Save the file and re-upload the folder to your web host.

For example:
- **New Elder or Deacon?** Update the `leadership` section in `assets/js/site-config.js` and the **Leadership** page updates automatically.
- **New Sermon Uploaded to YouTube?** Nothing to update! As soon as a new video is uploaded to your `@sgcrc-christianreformedchurch` YouTube channel, the embedded player on the Home and Sermons pages updates automatically.
- **Updated Safeguarding PDF on Google Drive?** Replace the file ID in `safeguardingPdf` inside `assets/js/site-config.js`.

### 2. Swapping Photos with Your Own Church Photos
Look inside `assets/images/`:
- `hero-gippsland.*` — Main homepage banner landscape photo
- `church-building.*` — Photo of the church exterior on the homepage
- `morning-tea.*` — Fellowship / morning tea photo on *What to Expect*
- `open-bible.*` — Open Bible photo on *What We Believe*

To use your own photo, either:
1. Give your photo the exact same filename and replace the file in `assets/images/`, **or**
2. Place your new photo in `assets/images/` and update the matching `<img src="assets/images/...">` (or CSS `background-image`) filename.

### 3. Previewing Locally
Because this site uses pure static HTML/CSS/JS, you can double-click `index.html` to preview it directly in your browser—or drag the entire folder into a free static host below.

---

## Free, Zero-Maintenance Hosting Options (No Server Updates Ever)

Because there is no WordPress, PHP, or database, there are no security patches or plugins to update:

1. **Cloudflare Pages** (Free — great if your domain DNS is on Cloudflare)
   - Log into Cloudflare -> **Workers & Pages** -> **Create** -> **Upload assets**.
   - Drag and drop this entire folder and connect `www.crcsg.org.au` / `crcsg.org.au`.
2. **Netlify Drop** (Free — 30-second drag-and-drop)
   - Sign in to Netlify, drag this entire folder onto **Sites**, then connect your custom domain `crcsg.org.au` under **Domain Management**.
3. **GitHub Pages** (Free)
   - Upload the files to a GitHub repository, turn on **Pages** in repository settings, and add `crcsg.org.au` as the custom domain.
