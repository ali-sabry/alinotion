import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvextClientProvider } from "@/components/providers/convex-providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ali Notion",
  description: "This a fully Notion app clone with the all basics features.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon-dark.svg",
        href: "/favicon-dark.svg",
      },
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon.svg",
        href: "/favicon.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body className={inter.className}>
        <ConvextClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            storageKey="alitheme"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ConvextClientProvider>
      </body>
    </html>
  );
}
