import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HIKARI | Premium Japanese Sushi Restaurant",
  description: "Experience the art of Japanese cuisine at HIKARI. Michelin-star quality sushi, master chefs, and an unforgettable dining experience in the heart of the city.",
  keywords: ["sushi", "japanese restaurant", "premium dining", "omakase", "sashimi", "nigiri"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
