/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				// matching all API routes
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{ key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
					{
						key: "Access-Control-Allow-Methods",
						value: "GET,DELETE,PATCH,POST,PUT",
					},
					
				],
			},
			{
				// matching api.ts 
				source: "/src/helpers/axiosFunc.ts",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{ key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
					{
						key: "Access-Control-Allow-Methods",
						value: "GET,DELETE,PATCH,POST,PUT",
					},
					
				],
			},
		];
	},
};

export default nextConfig;
