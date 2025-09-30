import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "FastEdit",
  description: "Remova fundos de imagens com IA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Navbar ocupa 100% da tela */}
        <Navbar />

        {/* Conteúdo centralizado */}
        <main className="min-h-screen container mx-auto px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
