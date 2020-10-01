const { EnvironmentPlugin } = require('webpack')

module.exports = {
	ci: {
		healthcheck: {
			fatal: true,
			checks: ['githubToken'],
		},
		collect: {
			staticDistDir: './dist',
			startServerCommand: 'node server.js',
			numberOfRuns: 5,
			settings: {
				emulatedFormFactor: 'none',
				throttlingMethod: 'provided',
			},
		},
		upload: {
			target: 'lhci',
			serverBaseUrl: '',
			token: '',
			ignoreDuplicateBuildFailure: true,
		},
		assert: {
			assertions: {
				'categories:performance': ['error', { minScore: 0.7 }],
				'categories:accessibility': ['error', { minScore: 0.7 }],
				'categories:best-practices': ['error', { minScore: 0.7 }],
				'categories:seo': ['error', { minScore: 0.9 }],
			},
		},
	},
}
