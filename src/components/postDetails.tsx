import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent } from "@mui/material";
import Header from "./Header";
import PostAPI from "../API/postAPI";

interface Post {
  _id?: number;
  title: string;
  content: string;
}

type RouteParams = {
  postId: string;
};

const PostDetails: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { postId } = useParams<RouteParams>();

  useEffect(() => {
    if (postId) {
      fetchPostData(parseInt(postId)); // convert postId to number using parseInt
    }
  }, [postId]);

  const fetchPostData = async (postId: number) => {
   
    try {
      const postData = await PostAPI.getPostById(postId);
    
      setPost(() => postData);
    } catch (error) {
    
    }
  };

  return (
    <div>
      <Header />
      {post ? (
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardContent
            sx={{
              width: "50rem",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ textAlign: "Left" }}
            >
               {post.title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "16px", fontWeight: "400", lineHeight: "1.5rem" }}
            >
              Description: {post.content}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  );
};

export default PostDetails;
