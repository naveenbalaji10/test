"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleDelete, handleEdit }) => {
  const [copied, setCopied] = useState(false);
  const { data: session } = useSession();
  const pathName = usePathname();
  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex gap-3 justify-start items-center cursor-pointer">
          <Image
            height={40}
            width={40}
            src={post.creator.image}
            className="rounded-full object-contain"
            alt="user image"
          />
          <div className="flex flex-col">
            <h3 className="font-santoshi font-semibold text-gray-800">
              {post.creator.username}
            </h3>
            <p className="font-iter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            height={12}
            width={12}
            alt="icon"
          />
        </div>
      </div>
      <p className="text-santoshi text-gray-700 text-sm mt-5">{post.prompt}</p>
      <p
        className="text-inter blue_gradient text-sm cursor-pointer"
        onClick={() => {
          handleTagClick && handleTagClick(post.tag);
        }}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter  text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter  text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
