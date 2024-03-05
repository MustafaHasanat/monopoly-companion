import "@/libs/styles/global.css";
import type { Metadata } from "next";
import { Providers } from "../../libs/context/providers";
import { Locale, i18n } from "@/libs/configs/i18n.config";
import Script from "next/script";
import Body from "@/components/layout/body";
import Modal from "@/components/layout/modal";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Aside from "@/components/layout/aside";

export const metadata: Metadata = {
    title: "Website Title",
    description: "Website Description",
    icons: {
        icon: "/icons/favicon.ico",
    },
};

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ locale }));
}

export default function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: { locale: Locale };
}>) {
    return (
        <html lang={params.locale}>
            <Providers>
                <Body>
                    <Modal />
                    <Header />
                    {children}
                    <Aside />
                    <Footer />
                </Body>
            </Providers>

            <Script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></Script>
        </html>
    );
}
