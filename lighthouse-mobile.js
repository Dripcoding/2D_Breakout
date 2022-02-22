const { EnvironmentPlugin } = require("webpack");

module.exports = {
  ci: {
    healthcheck: {
      fatal: true,
      checks: ["githubToken"]
    },
    collect: {
      staticDistDir: "./dist",
      startServerCommand: "node server.js",
      numberOfRuns: 5
    },
    upload: {
      target: "lhci",
      serverBaseUrl: "https://frozen-citadel-11584.herokuapp.com",
      token: "68dd7f42-2b5a-41e8-8160-0fd14b022e47",
      ignoreDuplicateBuildFailure: true
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.7 }],
        "categories:accessibility": ["error", { minScore: 0.7 }],
        "categories:best-practices": ["error", { minScore: 0.7 }],
        "categories:seo": ["error", { minScore: 0.9 }]
      }
    }
  }
};
