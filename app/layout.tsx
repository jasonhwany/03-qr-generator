import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "QR코드 생성기 — MoneyStom7",
  description: "URL이나 텍스트를 QR코드로 즉시 변환. PNG 다운로드 가능. 무료 온라인 QR 생성기.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body>{children}</body></html>;
}
