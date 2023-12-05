"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchText = (e) => {
    e.preventDefault();
  };
  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 prompt_layout">
        {data.map((item) => (
          <PromptCard
            key={item._id}
            post={item}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    );
  };

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="realtive w-full flex-center">
        <input
          value={searchText}
          onChange={handleSearchText}
          type="text"
          placeholder="Serach for a tag or username"
          required={true}
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
