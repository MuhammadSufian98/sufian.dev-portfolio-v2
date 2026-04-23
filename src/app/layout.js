import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import CustomLayout from "@/components/CustomLayout";
import { ThemeProvider } from "@/context/ThemeProvider";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const mono = Space_Mono({
  variable: "--font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Muhammad Sufian | MERN & Next.js Specialist",
  description:
    "High-end portfolio landing page for Muhammad Sufian, software engineer and full stack developer.",

  // ADD THIS FOR THE BROWSER TAB
  icons: {
    icon: "/logo/portfolio-logo.png", // Path to your favicon
    shortcut: "/logo/portfolio-logo.png",
    apple: "/logo/portfolio-logo.png",
  },

  openGraph: {
    title: "Muhammad Sufian | Software Engineer",
    description:
      "Full-Stack Architect specializing in high-performance digital ecosystems.",
    url: "https://sufian-dev-portfolio-v2.vercel.app/",
    siteName: "Sufian Portfolio",
    images: [
      {
        url: "/logo/portfolio-logo.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Sufian | Software Engineer Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Sufian | Software Engineer",
    description: "High-end portfolio landing page for Muhammad Sufian.",
    images: ["/logo/portfolio-logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <ThemeProvider>
          <CustomLayout>{children}</CustomLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
