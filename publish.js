const ghpages = require('gh-pages');

ghpages.publish("build", {
    branch: "deploy",
    repo: "git@github.com:MaximKudryavtsev/admin-panel-frontend.git"
}, (msg) => console.log(msg));
