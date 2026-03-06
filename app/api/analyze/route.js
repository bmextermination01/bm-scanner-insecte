import OpenAI from "openai";

export async function POST(req) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const body = await req.json();
    const image = body?.image;

    if (!image) {
      return Response.json(
        { result: "Aucune image reçue." },
        { status: 400 }
      );
    }

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

if (!response.ok) {
  setResult(data.details || data.result || "Erreur lors de l’analyse.");
  return;
}

setResult(data.result || "Aucun résultat.");
