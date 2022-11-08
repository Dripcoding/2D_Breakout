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
      target: "filesystem",
      outputDir: "/tmp/lighthouseci",
      reportFileNamePattern: "lighthouse-desktop-report"
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
