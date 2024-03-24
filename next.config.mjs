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
                permanent: false,
            },
            {
                source: "/auth",
                destination: "/en/auth?active=login",
                permanent: false,
            },
            {
                source: "/account",
                destination: "/en/account",
                permanent: false,
            },
            {
                source: "/lobby",
                destination: "/en/lobby",
                permanent: false,
            },
            {
                source: "/game",
                destination: "/en/game",
                permanent: false,
            },
            {
                source: "/game/send",
                destination: "/en/game/send",
                permanent: false,
            },
            {
                source: "/game/request",
                destination: "/en/game/request",
                permanent: false,
            },
            {
                source: "/game/requests",
                destination: "/en/game/requests",
                permanent: false,
            },
            {
                source: "/game/history",
                destination: "/en/game/history",
                permanent: false,
            },
            {
                source: "/game/manage",
                destination: "/en/game/manage",
                permanent: false,
            },
            {
                source: "/error",
                destination: "/en/error",
                permanent: false,
            },
        ]
    },
};

export default nextConfig;
