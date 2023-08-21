import localFont from "next/font/local";

import ThemeProvider from "components/layouts/theme-provider";


const customFont = localFont({
  src: "./235b71a9b409e684e865eb4a996e925e.woff2",
  display: "swap",
});

export const metadata = {
  openGraph: {
    images: [
      {
        width: 800,
        height: 600,
      },
    ],
    type: "website",
    locale: "en_IE",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      "ahrefs-site-verification": [process.env.AHREFS_SITE_VERIFICATION],
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={customFont.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
