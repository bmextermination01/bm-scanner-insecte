import OpenAI from "openai";

export async function POST(req) {

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const { image } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Identifie cet insecte. Donne son nom, s'il est dangereux dans une maison au Québec et si un exterminateur est recommandé."
          },
          {
            type: "image_url",
            image_url: {
              url: image
            }
          }
        ]
      }
    ]
  });

  return Response.json({
    result: response.choices[0].message.content
  });

}

