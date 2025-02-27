const processCommitData = (commitData) => {
    return commitData.map(repo => ({
        repo: repo.repo,
        commitCount: repo.commits.length,
        latestCommit: repo.commits[0]?.date || "No commits",
    }));
};

module.exports = { processCommitData };
