"use client";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user?.id}/posts`);
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchPosts();
    }
  }, []);

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure want to delete this post");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filtered = posts.filter((p) => p._id !== post._id);
        setPosts(filtered);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = async (post) => {
    router.push(`update-prompt?id=${post._id}`);
  };
  return (
    <Profile
      name={"My"}
      desc={"Welcome to you personalized profile page"}
      data={posts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default MyProfile;
