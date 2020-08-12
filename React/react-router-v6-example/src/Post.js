import React from "react";
import { useParams } from "react-router-dom";

function Post() {
  const BlogPosts = {
    "1": {
      title: "第一篇博客文章",
      description: "第一篇博客文章，是关于Vue3.0的",
    },
    "2": {
      title: "第二篇博客文章",
      description: "Hello React Router v6",
    },
  };

  const { slug } = useParams();
  const post = BlogPosts[slug];
  const { title, description } = post;
  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Post;
