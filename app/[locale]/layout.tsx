import "@/utils/styles/global.css";
import type { Metadata } from "next";
import { Providers } from "../../utils/redux/providers";
import Script from "next/script";
import Body from "@/components/layout/body";
import Modal from "@/components/layout/modal";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SnackbarWrapper from "../../components/layout/snackbar";
import { createClient } from "@/utils/supabase/server";
import { Locale, i18n } from "@/utils/locales/i18n.config";

export const metadata: Metadata = {
    title: "Monopoly Companion",
    description: "The online monopoly banking system.",
    icons: {
        icon: "/icons/dice.png",
    },
};

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ locale }));
}

async function getData() {
    const supabase = createClient();
    const userResponse = await supabase.auth.getUser();
    const sessionResponse = await supabase.auth.getSession();

    return {
        user: userResponse.data.user,
        session: sessionResponse.data.session,
    };
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: { locale: Locale };
}>) {
    const { user, session } = await getData();

    return (
        <html lang={params.locale}>
            <Providers>
                <Body user={user} session={session}>
                    <Modal />
                    <Header />
                    {children}
                    <Footer />
                    <SnackbarWrapper />
                </Body>
            </Providers>

            <Script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></Script>
        </html>
    );
}
