import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toketz | Tecnologia para novas experiências esportivas",
  description:
    "Toketz cria soluções digitais para conectar marcas, atletas, eventos e comunidades esportivas com dados, experiências e performance.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
