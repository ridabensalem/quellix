import { auth } from "@clerk/nextjs";
import {ChatCompletionRequestMessage, Configuration} from "openai";
import  {OpenAIApi}  from "openai";
import { NextResponse } from "next/server";
import { checkApiLimit, incrementApiLimit } from "@/lib/apiLimit";



const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
 const instructionMessage:ChatCompletionRequestMessage={
  role:"system",
  content:"You are a code generator. you should only answer in markdown code blocks use code comments to explain your code."
 } 


export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages  } = body;
    const freeTrail = await checkApiLimit();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    if (!freeTrail) {
      return new NextResponse("You have reached your free limit", { status: 403 });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages:[instructionMessage,...messages]
    });
  await incrementApiLimit();
    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log('[CODE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};