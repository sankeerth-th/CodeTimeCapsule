const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');

const findGitRepos = async () => {
    const homeDir = require('os').homedir();
    let repos = [];

    function scanDirectory(dir) {
        try {
            const files = fs.readdirSync(dir);
            if (files.includes('.git')) {
                repos.push(dir);
            }
            files.forEach(file => {
                const fullPath = path.join(dir, file);
                if (fs.lstatSync(fullPath).isDirectory()) {
                    scanDirectory(fullPath);
                }
            });
        } catch (err) {}
    }

    scanDirectory(homeDir);
    return repos.length ? repos : ["/Users/your-username/Desktop/sample-repo"];
};

const getCommitHistory = async () => {
    const repos = await findGitRepos();
    let commitData = [];

    for (let repo of repos) {
        const git = simpleGit(repo);
        const log = await git.log().catch(err => {
            console.error(`Error fetching commits from ${repo}:`, err);
            return { all: [] };
        });

        commitData.push({
            repo,
            commits: log.all.length
                ? log.all.map(commit => ({
                      date: commit.date,
                      message: commit.message,
                      hash: commit.hash
                  }))
                : [{ date: new Date().toISOString(), message: "No commits found", hash: "0000" }]
        });
    }
    return commitData;
};

module.exports = { findGitRepos, getCommitHistory };
