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
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: reader.result,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setResult(data.details || data.result || "Erreur lors de l’analyse de l’image.");
          setLoading(false);
          return;
        }

        setResult(data.result || "Aucun résultat.");
      } catch (error) {
        setResult(error.message || "Erreur lors de l’analyse de l’image.");
      }

      setLoading(false);
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
        onChange={(e) => setFile(e.target.files[0] || null)}
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
