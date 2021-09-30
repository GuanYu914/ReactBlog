import React, { useEffect, useState } from "react";
import { getPostByID } from "../../WebAPI";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const PostContainer = styled.div`
  margin-top: 40px;
  padding: 10px 20px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 50px;
`;

const PostTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const PostTime = styled.div`
  margin-left: 30px;
  font-size: 12px;
`;

const PostBody = styled.div`
  font-size: 18px;
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        <PostTime>{new Date(post.createdAt).toLocaleString()}</PostTime>
      </PostHeader>
      <PostBody>{post.body}</PostBody>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function ArticlePage() {
  let { slug } = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {
    getPostByID(slug).then((post) => {
      setPost(post);
    });
  }, []);

  return (
    <div>
      {post.map((post) => (
        <Post key={1} post={post} />
      ))}
    </div>
  );
}
