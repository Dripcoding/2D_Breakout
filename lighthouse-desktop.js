module.exports = {
  ci: {
    healthcheck: {
      fatal: true,
      checks: ["githubToken"]
    },
    collect: {
      staticDistDir: "./dist",
      numberOfRuns: 5,
      startServerCommand: "node server.js",
      settings: {
        emulatedFormFactor: "desktop"
      }
    },
    upload: {
      target: "lhci",
      serverBaseUrl: "https://aqueous-caverns-79659.herokuapp.com/",
      token: "4021253d-9a78-45b0-968f-8f3b51b6f07e",
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
