import localFont from "next/font/local";
const font = localFont({ src: "./fonts/test.woff2", preload: true });
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={font.className}><body>{children}</body></html>);
}
