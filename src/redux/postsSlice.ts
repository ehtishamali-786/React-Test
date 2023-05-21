import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../types/posts";
import PostAPI from "../API/postAPI";
export interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed" | "deleted";
  error: string | null;
}
interface OptionalIdPost {
  id?: number;
  title: string;
  content: string;
}

const initialState: PostsState = {
  posts: [],
  status: "idle", // Add this property
  error: null, // Add this property
};

// Async thunks
export const fetchAllPosts = createAsyncThunk("posts/fetchAll", async () => {
  const response = await PostAPI.getAllPosts();
 
  return response;
});

export const savePost = createAsyncThunk(
  "posts/addNew",
  async (post: Post) => {
    const response = await PostAPI.addNewPost(post);
    console.log(response)
    if (response.success && response.post) {
      return response;
    
    }
  }
);

// Modify this part of the deletePost thunk
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: number, thunkAPI) => {
    const response = await PostAPI.deletePost(postId);
    if (response) {
      return postId; // Change this line to return only the postId
    } else {
      return thunkAPI.rejectWithValue(response || "Error deleting post");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    removePost: (state, action: PayloadAction<number>) => {
    
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (action.payload.success && action.payload.posts) {
        state.posts = action.payload.posts.map((post: OptionalIdPost) => {
          if (post.id === undefined) {
            return { ...post, id: Date.now() };
          }
          return post as Post;
        });
      } else {
        state.error = action.payload.error || "Error fetching posts";
      }
    });
    builder.addCase(fetchAllPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Error fetching posts";
    });
    // Add this to the extraReducers in postsSlice.ts
    builder.addCase(savePost.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(savePost.fulfilled, (state, action) => {
      state.status = "succeeded";
      // This will add the newly created post to the state
      // state.posts.unshift(action.payload as Post);
    });

    builder.addCase(savePost.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Error adding post";
    });
    builder.addCase(deletePost.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.status = "deleted"; // Change this line to set the status to 'deleted'
      // Remove the deleted post from the state
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    });

    builder.addCase(deletePost.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Error deleting post";
    });
  },
});

export const { addPost, setPosts, removePost } = postsSlice.actions;

export default postsSlice.reducer;
