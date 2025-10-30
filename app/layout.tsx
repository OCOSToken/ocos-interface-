import "./globals.css";

export const metadata = {
  title: "OCOS BEP-20 Exchange",
  description: "Buy & Sell OCOS Token — Stable 47 USD on 21 Blockchains",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
