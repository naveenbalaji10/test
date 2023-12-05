import { connectToDB } from "@utils/Database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
  const { tag, prompt, userId } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      tag: tag,
      prompt: prompt,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response(`Failed : ${error}`, { status: 400 });
  }
};
