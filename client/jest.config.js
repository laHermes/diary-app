const nextJest = require('next/jest');

// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
const createJestConfig = nextJest({
	dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
	// Add more setup options before each test is run
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	// if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
	clearMocks: true,
	moduleDirectories: ['node_modules', '<rootDir>/'],
	testEnvironment: 'jest-environment-jsdom',
	moduleNameMapper: {
		'@components/(.*)': '<rootDir>/components/$1',
		'@public/(.*)': '<rootDir>/public/$1',
		'@icons/(.*)': '<rootDir>/assets/icons/$1',
		'@styles/(.*)': '<rootDir>/styles/$1',
		'@store/(.*)': '<rootDir>/store/$1',
		'@shared/(.*)': '<rootDir>/shared/$1',
		'@features/(.*)': '<rootDir>/features/$1',
		'@hooks/(.*)': '<rootDir>/hooks/$1',
		'@providers/(.*)': '<rootDir>/providers/$1',
		'@types/(.*)': '<rootDir>/types/$1',
		'@lib/(.*)': '<rootDir>/lib/$1',
		'@config/(.*)': '<rootDir>/config/$1',
	},
};

// "@src/*": ["/*"],
//
// 			"@features/*": ["features/*"],
// 			"@hooks/*": ["hooks/*"],
// 			"@providers/*": ["providers/*"],
// 			"@types/*": ["types/*"],
// 			"@config/*": ["lib/*"],
// 			"@config/*": ["config/*"]

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
