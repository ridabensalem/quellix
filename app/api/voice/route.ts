import { auth } from "@clerk/nextjs";
import Replicate from "replicate";
import { NextResponse } from "next/server";
import { checkApiLimit, incrementApiLimit } from "@/lib/apiLimit";

const replicate = new Replicate({
  auth:process.env.REPLICATE_AI_TOKEN!
});


export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt  } = body;
    const freeTrail = await checkApiLimit();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt  is  required", { status: 400 });
    }
    if (!freeTrail) {
      return new NextResponse("You have reached your free limit", { status: 403 });
    }
    const response = await replicate.run(
      "afiaka87/tortoise-tts:e9658de4b325863c4fcdc12d94bb7c9b54cbfe351b7ca1b36860008172b91c71",
      {
        input: {
          text: prompt
        }
      }
    );
    if (response ){
      return  NextResponse.json(response);
    }else {
      return new NextResponse("The voice is having an error  ", { status: 500 });
    }
  await incrementApiLimit();
  } catch (error) {
    console.log('[VOICE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};