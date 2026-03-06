"use client";

import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!file) {
      setResult("Veuillez sélectionner une image.");
      return;
    }

    setLoading(true);
    setResult("Analyse en cours...");

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const response = await fetch("https://bm-scanner-insecte.vercel.app/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: reader.result,
          }),
        });

        const data = await response.json();
        setResult(data.result || "Aucun résultat.");
      } catch (error) {
        setResult("Erreur lors de l’analyse.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Scanner d'insecte — BM Extermination</h1>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] ?? null;
          setFile(selectedFile);
          setResult(selectedFile ? `Image choisie : ${selectedFile.name}` : "");
        }}
      />

      <br />
      <br />

      <button onClick={analyze} disabled={loading}>
        {loading ? "Analyse..." : "Identifier l'insecte"}
      </button>

      <p style={{ marginTop: 20 }}>
        {result}
      </p>
    </main>
  );
}
