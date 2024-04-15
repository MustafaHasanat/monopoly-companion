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
                destination: "/en/lobby?active=start",
                permanent: false,
            },
            {
                source: "/game",
                destination: "/en/game",
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
