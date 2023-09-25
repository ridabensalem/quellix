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
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt
        }
      }
    );
    await incrementApiLimit();
    if (response ){
      return  NextResponse.json(response);
    }else {
      return new NextResponse("Something went wrofng ", { status: 500 });
    }
  
  } catch (error) {
    console.log('[VIDEO_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};