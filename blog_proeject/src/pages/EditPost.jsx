import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container } from "../components/container/Container";
import { PostCard } from "../components/PostCard";
import { PostForm } from "../components/post-form/PostForm";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [posts, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    }
  }, [slug, navigate]);

  // eslint-disable-next-line no-undef
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
