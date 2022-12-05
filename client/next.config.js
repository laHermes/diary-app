/** @type {import('next').NextConfig} */
const nextConfig = {
	// react strict mode must be false for react-spring-bottom-sheet to work
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: ['lh3.googleusercontent.com'],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-XSS-Protection',
						value: '1; mode=block',
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
