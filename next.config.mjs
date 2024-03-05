/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    typescript: {
        tsconfigPath: "./tsconfig.json",
        ignoreBuildErrors: true,
    },

    async redirects() {
        return [
            {
                source: "/",
                destination: "/en",
                permanent: false
            },
        ]
    },
};

export default nextConfig;
