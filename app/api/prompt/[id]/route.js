import { connectToDB } from "@utils/Database";
import Prompt from "@models/prompt";
//Get
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id);
    if (!prompt) {
      return new Response(`Prompt Not Found`, { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 201 });
  } catch (error) {
    return new Response(`Failed : ${error}`, { status: 400 });
  }
};

//Patch

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const promptExist = await Prompt.findById(params.id);
    if (!promptExist) {
      return new Response(`Prompt Not Found`, { status: 404 });
    }
    promptExist.prompt = prompt;
    promptExist.tag = tag;
    await promptExist.save();
    return new Response(JSON.stringify(promptExist), { status: 200 });
  } catch (error) {
    return new Response(`Failed : ${error}`, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt Deleted Successfully", { status: 200 });
  } catch (error) {
    return new Response(`Failed : ${error.response.data}`, { status: 500 });
  }
};
