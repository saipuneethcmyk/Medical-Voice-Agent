import { NextRequest, NextResponse } from "next/server";
import { AIDoctorAgents } from "@/public/shared/list";
import { openai } from "@/config/openAiModel";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const notes = body.notes;

    const completion = await openai.chat.completions.create({
      model: "google/gemini-pro-1.5",
      max_tokens: 400,
      messages: [
        {
          role: 'system',
          content: JSON.stringify(AIDoctorAgents)
        },
        {
          role: "user",
          content: `User Notes/Symptoms: ${notes}. Based on these, suggest a list of doctors. Return object in JSON only.`
        }
      ],
    });

    const rawResp = completion.choices[0].message;
    //@ts-ignore
    const Resp= rawResp.content.trim().replace('```json','').replace('```','');
    const JSONResp = JSON.parse(Resp);
    return NextResponse.json(JSONResp);

  } catch (e) {
    return NextResponse.json(e);
  }
}
