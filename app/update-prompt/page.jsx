"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Form from "@components/Form";

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    if (promptId) {
      getPropmt(promptId);
    }
  }, [promptId]);

  const getPropmt = async (id) => {
    const response = await fetch(`/api/prompt/${id}`);
    const data = await response.json();
    setPost({
      prompt: data.prompt,
      tag: data.tag,
    });
  };

  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
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
      type="Edit"
      submitting={submitting}
      setPost={setPost}
      post={post}
      handleSubmit={editPrompt}
    />
  );
};

export default EditPrompt;
