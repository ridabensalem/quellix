import { auth } from "@clerk/nextjs";
import {Configuration} from "openai";
import {OpenAIApi}  from "openai";
import { NextResponse } from "next/server";
import { checkApiLimit, incrementApiLimit } from "@/lib/apiLimit";



const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const freeTrail = checkApiLimit();


export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount='1', resolution='512x512'  } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!amount) {
      return new NextResponse("Amount is required.", { status: 500 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }
    if (!freeTrail) {
      return new NextResponse("You have reached your free limit", { status: 403 });
    }

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount,10),
      size: resolution
     
    });
  await incrementApiLimit();

  // Check if the response structure is as expected
  if (response.data && response.data.data) {
    return NextResponse.json(response.data.data);
  } else {
    return new NextResponse("Huh this is the bug ", { status: 500 });
  }
} catch (error) {
  console.log('[IMAGE_ERROR]', error);
  return new NextResponse("Internal Error", { status: 500 });
}
};