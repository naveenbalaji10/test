"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Form from "@components/Form";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  const { data: session } = useSession();

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response?.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      submitting={submitting}
      setPost={setPost}
      post={post}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
