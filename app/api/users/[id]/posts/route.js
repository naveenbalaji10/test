import { connectToDB } from "@utils/Database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 201 });
  } catch (error) {
    return new Response(`Failed : ${error}`, { status: 400 });
  }
};
