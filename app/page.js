"use client";

import { useState } from "react";

export default function Page() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const analyze = async () => {

    const reader = new FileReader();

    reader.onloadend = async () => {

      const response = await fetch("https://bm-scanner-insecte.vercel.app/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: reader.result
        })
      });

      const data = await response.json();

      setResult(data.result);

    };

    reader.readAsDataURL(file);

  };

  return (
    <main style={{ padding: 40 }}>

      <h1>Scanner d’insecte — BM Extermination</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={analyze}>
        Identifier l'insecte
      </button>

      <p style={{ marginTop: 20 }}>
        {result}
      </p>

    </main>
  );

}
