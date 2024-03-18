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
            {
                source: "/auth",
                destination: "/en/auth",
                permanent: false
            },
        ]
    },
};

export default nextConfig;
