import { Grid } from "@mui/material";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <Grid container>{children}</Grid>;
}
