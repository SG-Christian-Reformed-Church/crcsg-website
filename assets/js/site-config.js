/**
 * ============================================================================
 *  CRCSG WEBSITE SETTINGS — EASY VOLUNTEER EDITING FILE
 * ============================================================================
 *  This single file stores all key church details, contacts, bank/giving info,
 *  leadership names, and external links used across the website.
 *
 *  HOW TO UPDATE SOMETHING:
 *  1. Open this file in Notepad, TextEdit, or any simple text editor.
 *  2. Edit only the text inside the quotation marks "like this".
 *  3. Keep the commas, colons, and brackets where they are.
 *  4. Save the file and upload it to your website host.
 * ============================================================================
 */
window.CRCSG_CONFIG = {
  // Church Identity
  churchName: "South Gippsland Christian Reformed Church",
  shortName: "SGCRC",
  tagline: "...reaching the lost for Christ.",
  abn: "52 849 453 668",
  abnRaw: "52849453668",

  // Worship Services & Location
  serviceTime: "Sundays at 10:00 am",
  specialServices: "Also on Good Friday and Christmas Day",
  streetAddress: "Corner of Brown St & Peart St, Leongatha VIC 3953",
  streetAddressShort: "Cnr Brown & Peart Sts, Leongatha",
  postalAddress: "P.O. Box 198, Leongatha VIC 3953",
  coordinates: {
    lat: -38.473421,
    lng: 145.938105
  },
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Corner+of+Brown+St+%26+Peart+St,+Leongatha+VIC+3953,+Australia",
  appleMapsUrl:
    "https://maps.apple.com/?q=Christian+Reformed+Church+of+South+Gippsland&ll=-38.473421,145.938105",

  // Primary Pastoral Contact
  pastor: {
    name: "Rev. Chris Shannon",
    role: "Pastor",
    phoneDisplay: "0421 904 705",
    phoneHref: "+61421904705",
    email: "pastor@crcsg.org.au"
  },

  // Church Email Directory
  emails: {
    pastor: "pastor@crcsg.org.au",
    chairman: "chairman@crcsg.org.au",
    deacon: "deacon@crcsg.org.au",
    clerk: "clerk@crcsg.org.au",
    treasurer: "treasurer@crcsg.org.au",
    childProtection: "child.protection.officer@crcsg.org.au"
  },

  // Financial Contributions & Donations
  giving: {
    payIdEmail: "treasurer@crcsg.org.au",
    payIdAbnDisplay: "52 849 453 668",
    payIdAbnCopy: "52849453668",
    accountName: "Christian Reformed Church of South Gippsland",
    bsbDisplay: "013 705",
    bsbCopy: "013705",
    accountNumber: "280311523"
  },

  // YouTube Sermons Channel (automatically shows the newest upload!)
  youtube: {
    channelUrl: "https://www.youtube.com/@sgcrc-christianreformedchurch",
    videosUrl: "https://www.youtube.com/@sgcrc-christianreformedchurch/videos",
    playlistsUrl: "https://www.youtube.com/@sgcrc-christianreformedchurch/playlists",
    channelId: "UCELw7mEJ6HG2HaojBDUKlWg",
    uploadsPlaylistId: "UUELw7mEJ6HG2HaojBDUKlWg"
  },

  // Social Media & Denomination Links
  facebookUrl:
    "https://www.facebook.com/p/Christian-Reformed-Church-South-Gippsland-100090853963231/",
  crcaUrl: "https://crca.org.au",

  // Safeguarding Children Policy PDF (hosted on Google Drive)
  safeguardingPdf: {
    previewUrl:
      "https://drive.google.com/file/d/1Gxs3bvnXZBlcO_nna6Tz7iw1B4P7xpQR/preview",
    viewUrl:
      "https://drive.google.com/file/d/1Gxs3bvnXZBlcO_nna6Tz7iw1B4P7xpQR/view",
    downloadUrl:
      "https://drive.google.com/uc?export=download&id=1Gxs3bvnXZBlcO_nna6Tz7iw1B4P7xpQR"
  },

  // Church Council (Session) Leadership Directory
  leadership: {
    meetingSchedule: "4th Tuesday of each month",
    pastor: {
      name: "Rev. Chris Shannon",
      email: "pastor@crcsg.org.au",
      phone: "0421 904 705"
    },
    elders: [
      {
        name: "Chairman of Session",
        email: "chairman@crcsg.org.au",
        note: "General Session enquiries"
      },
      { name: "Paul Chalmers" },
      { name: "Tim Hibma" },
      { name: "Ian Daw" }
    ],
    deacon: {
      name: "Bertha Giliam",
      email: "deacon@crcsg.org.au"
    },
    clerk: {
      name: "Laura Ellen",
      email: "clerk@crcsg.org.au"
    }
  }
};
