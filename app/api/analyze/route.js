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

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Identifie cet insecte. Donne son nom probable, le niveau de risque dans une maison au Québec, et dis si un exterminateur est recommandé. Réponse courte, claire, en français.",
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    return Response.json({
      result: response.choices?.[0]?.message?.content || "Aucun résultat.",
    });
  } catch (error) {
    return Response.json(
      {
        result: "Erreur lors de l’analyse de l’image.",
        details: error?.message || "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
