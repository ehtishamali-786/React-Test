import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import AddPostDialog from "./AddPost";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { deletePost, fetchAllPosts, removePost } from "../redux/postsSlice";

import { AppDispatch } from "../redux/store";
interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date
}

interface PostListProps {
  posts?: Post[];
}

const PostList: React.FC<PostListProps> = () => {
  //   const allPosts = useSelector((state: RootState) => state.posts.posts);
  const posts = useSelector((state: RootState) => state.posts.posts);
  const status = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllPosts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "idle" || status === "deleted") {
      dispatch(fetchAllPosts());
    }
  }, [status, dispatch]);
  const handleDelete = async (postId: number) => {

    await dispatch(deletePost(postId));
    dispatch(removePost(postId));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Error:{error}</div>;
  } else {
    return (
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ marginY: "2rem" }}
      >
        <Box
          sx={{
            width: "50rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <AddPostDialog />
        </Box>
        {posts?.map((post: any, index) => {

          return (
            <Grid
              item
              xs={12}
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <Card sx={{ width: "50rem", elevation: 5, position: "relative" }}>
                <IconButton
                  edge="end"
                  color="inherit"
                  sx={{ position: "absolute", top: 5, right: 20 }}
                  onClick={() => handleDelete(post.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" >
                   CreatedAt: {new Date(post.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).replace(/^0/, '')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   Description: {post.content}...
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/post/${post.id}`}
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  }
};

export default PostList;
