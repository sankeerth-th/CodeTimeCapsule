require('dotenv').config();
const express = require('express');
const cors = require('cors');
const gitScanner = require('./gitScanner');
const dataProcessor = require('./dataProcessor');
const aiNarrative = require('./aiNarrative');

const app = express();
app.use(cors());
app.use(express.json());

// API to scan local repositories
app.get('/scan', async (req, res) => {
    try {
        const repos = await gitScanner.findGitRepos();
        res.json(repos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API to get commit history
app.get('/commits', async (req, res) => {
    try {
        const commits = await gitScanner.getCommitHistory();
        res.json(commits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API to generate AI-powered narrative
app.post('/narrative', async (req, res) => {
    try {
        const narrative = await aiNarrative.generateNarrative(req.body);
        res.json({ narrative });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
