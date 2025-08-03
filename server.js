// server.js
import express from 'express';
import cors from 'cors';
import votesHandler from './api/votes.js';
import voteHandler from './api/vote.js';
import voteByIdHandler from './api/votes/[id].js';

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/votes', (req, res) => votesHandler(req, res));
app.post('/api/vote', (req, res) => voteHandler(req, res));
app.get('/api/votes/:id', voteByIdHandler);

// Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`✅ API is running at http://localhost:${PORT}`);
});
