import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "**/*"
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
				port: "",
				pathname: "**/*"
			},
			{
				protocol: "https",
				hostname: "cdn.pixabay.com",
				port: "",
				pathname: "**/*"
			},
			{
				protocol: "https",
				hostname: "img.freepik.com",
				port: "",
				pathname: "**/*"
			}
		]
	}
};

export default nextConfig;
