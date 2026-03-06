"use client";

import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState(null);

  return (
    <main style={{ padding: 40 }}>
      <h1>Scanner d’insecte — BM Extermination</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && (
        <p style={{ marginTop: 20 }}>
          Image prête à analyser.
        </p>
      )}
    </main>
  );
}
