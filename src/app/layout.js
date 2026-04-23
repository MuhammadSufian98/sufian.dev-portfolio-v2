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
