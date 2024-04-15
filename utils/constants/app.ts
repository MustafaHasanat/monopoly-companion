export const FRONTEND_URL = process.env.FRONTEND_URL;

export const SOCIAL_ICONS = [
    {
        src: "/icons/linkedin-logo.png",
        url: "https://www.linkedin.com/in/mustafa-alhasanat",
    },
    {
        src: "/icons/github-logo.png",
        url: "https://github.com/MustafaHasanat",
    },
    {
        src: "/icons/npm-logo.png",
        url: "https://www.npmjs.com/~mustafa-alhasanat",
    },
    {
        src: "/icons/udemy-logo.png",
        url: "https://www.udemy.com/user/mustfa-alhasana",
    },
    {
        src: "/icons/calendly-logo.png",
        url: "https://calendly.com/mustafa-hasanat/interview",
    },
];

export const INTERCEPTED_PATHS = [];

export const getNavItems = ({
    header,
    isLoggedIn,
}: {
    header: { [key: string]: string };
    isLoggedIn: boolean;
}): {
    text: string;
    name: string;
    category: "logged" | "unLogged" | "both";
}[] =>
    isLoggedIn
        ? [
              {
                  text: header.play,
                  name: "lobby",
                  category: "logged",
              },
              {
                  text: header.account,
                  name: "account",
                  category: "logged",
              },
              {
                  text: header.logout,
                  name: "logout",
                  category: "logged",
              },
          ]
        : [
              {
                  text: header.login,
                  name: "auth?active=login",
                  category: "unLogged",
              },
              {
                  text: header.register,
                  name: "auth?active=register",
                  category: "unLogged",
              },
          ];
