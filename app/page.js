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
          setResult(data.details || data.result || "Erreur lors de l’analyse.");
          setLoading(false);
          return;
        }

        setResult(data.result || "Aucun résultat.");
      } catch (error) {
        setResult("Erreur lors de l’analyse.");
      }

      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1621799754526-a0d52c49fad5')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          maxWidth: "700px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          fontFamily: "Arial",
        }}
      >
        <h1>Scanner d'insecte – BM Extermination</h1>

        <p style={{ marginBottom: "25px" }}>
          Prenez une photo de l’insecte trouvé dans votre maison et notre
          système identifiera l’espèce et le niveau de risque.
        </p>

        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => setFile(e.target.files[0] || null)}
        />

        <br />
        <br />

        <button
          onClick={analyze}
          disabled={loading}
          style={{
            padding: "12px 25px",
            fontSize: "16px",
            background: "#1f7a1f",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Analyse..." : "Identifier l'insecte"}
        </button>

        <div style={{ marginTop: "30px", fontSize: "18px" }}>{result}</div>

        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            background: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <h3>Besoin d'une intervention rapide ?</h3>

          <p>
            BM Extermination offre des services professionnels pour éliminer
            les insectes et nuisibles dans votre maison.
          </p>

          <a
            href="tel:15144972667"
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "12px 20px",
              background: "#cc0000",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "bold",
            }}
          >
            📞 Appeler BM Extermination
          </a>
        </div>
      </div>
    </main>
  );
}
