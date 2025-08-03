import dotenv from 'dotenv';
dotenv.config();

import { google } from 'googleapis';

console.log("Loaded SPREADSHEET_ID:", process.env.SPREADSHEET_ID);

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

if (!SPREADSHEET_ID) {
  throw new Error('SPREADSHEET_ID is not defined in the .env file');
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: privateKey,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

/**
 * Get all features from the spreadsheet
 */
export async function getFeatures() {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A2:C', // ID, Title, Upvotes
    });

    const rows = res.data.values || [];

    return rows.map(([id, title, upvotes]) => ({
      id: id?.trim(), // prevent whitespace mismatch
      title,
      upvotes: parseInt(upvotes || '0', 10),
    }));
  } catch (err) {
    console.error('Failed to fetch features:', err.message);
    throw err;
  }
}

/**
 * Update vote count (upvote or downvote) for a feature
 */
export async function updateVote(id) {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A2:C', // ID, Title, Upvotes
    });

    const rows = res.data.values || [];
    const rowIndex = rows.findIndex(row => row[0] === id);

    if (rowIndex === -1) throw new Error('Feature not found in spreadsheet');

    let upvotes = parseInt(rows[rowIndex][2] || '0', 10);
    upvotes += 1;

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `Sheet1!C${rowIndex + 2}`, // Update only the upvotes column
      valueInputOption: 'RAW',
      requestBody: {
        values: [[upvotes.toString()]],
      },
    });

    return { id, upvotes };
  } catch (err) {
    console.error('Failed to update upvote:', err.message);
    throw err;
  }
}

export { sheets }; // optional export if needed elsewhere
