export const metadata = {
  title: "Scanner d'insecte - BM Extermination",
  description: "Identifiez rapidement un insecte avec une photo."
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
