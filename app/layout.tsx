import type { Metadata } from "next";
import { Lato } from "next/font/google";
import localFont from "next/font/local";
import ScrollReveal from "./components/ScrollReveal";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const madeMirage = localFont({
  variable: "--font-made-mirage",
  src: [
    { path: "./fonts/MADEMirage-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/MADEMirage-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/MADEMirage-Bold.otf", weight: "700", style: "normal" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DMS Consulting",
  description: "DMS Consulting",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${madeMirage.variable} h-full antialiased`}
      // The inline script below adds `reveal-ready` before hydration.
      suppressHydrationWarning
    >
      <head>
        {/* Set the hidden "before reveal" state before first paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('reveal-ready')",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
