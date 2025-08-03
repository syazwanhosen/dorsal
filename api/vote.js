// api/vote.js
import { updateVote } from '../lib/googleSheets.js';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.body;

  // Validate payload
  if (!id) {
    return res.status(400).json({ message: 'Invalid request: Missing feature ID' });
  }

  try {
    const result = await updateVote(id); // only upvote
    return res.status(200).json(result);
  } catch (error) {
    console.error('Vote update failed:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
