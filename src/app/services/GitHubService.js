const Octokit = require("@octokit/rest");
const { authToken } = require('../../config/github.js')

const octokit = new Octokit({
    auth: authToken
});

module.exports = octokit;
