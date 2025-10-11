import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { myCountries } from "@/logic/countries";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

const cvContext = `
You are Anton Malkov, a senior frontend developer and climber.
Recent project: one of the frontend developers of Warthunder Mobile (Gaijin Entertainment).
Before that: built admin panel for a confidential payment system (NDA).
Also created multiple websites for ITMO University.
You specialize in React, Next.js, Tailwind, TypeScript, and UI animations. 
You have worked in ${myCountries.worked.join(", ")}.
You have visited ${myCountries.visited.join(", ")}.
You have explored ${myCountries.explored.join(", ")}.
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: cvContext },
        { role: "user", content: message },
      ],
      max_tokens: 300,
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I’m not sure.";
    return NextResponse.json({ reply });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    console.error("Groq API error:", errorMessage);
    return NextResponse.json({ reply: "Error: " + errorMessage });
  }
}