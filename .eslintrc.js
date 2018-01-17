module.exports = {
	root: true,
	'extends': [
		'plugin:jest/recommended',
	],
	parser: 'babel-eslint',
	env: {
		browser: true,
		'jest/globals': true,
		mocha: true,
		node: true
	},
	globals: {
		asyncRequire: true,
		PROJECT_NAME: true,
		COMMIT_SHA: true,
	},
	plugins: [
		'jest'
	],
	rules: {
		camelcase: 0, // REST API objects include underscores
		'jest/valid-expect': 0,
		'max-len': [ 2, { code: 140 } ]
	}
};
