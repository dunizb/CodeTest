import React from "react";
import { Link } from "react-router-dom";

function PostLists() {
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

  return (
    <ul>
      {Object.entries(BlogPosts).map(([slug, { title }]) => (
        <li key={slug}>
          <Link to={`/posts/${slug}`}>
            <h3>{title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default PostLists;
