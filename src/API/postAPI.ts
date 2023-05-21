import axios from "axios";
import { Post } from "../types/posts";
interface SavePostResponse {
  success: boolean;
  post: Post;
  error?: string;
}

const PostAPI = {
  getAllPosts: async () => {
    try {
      const response = await axios.get("https://6469237a183682d6143aa779.mockapi.io/Posts");
      return { success: true, posts: response.data as Post[] };
      
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error fetching posts";
      return { success: false, error: errorMessage };
    }
  },
  getPostById: async (id: number) => {
    const response = await axios.get(`https://6469237a183682d6143aa779.mockapi.io/Posts/${id}`);
   
    return response.data as Post;
  },

  addNewPost: async (post: Post): Promise<SavePostResponse> => {
    const response = await axios.post("https://6469237a183682d6143aa779.mockapi.io/Posts", post);
    console.log(response.data)
    return response.data as SavePostResponse;
  },

  deletePost: async (id: number) => {
    const response = await axios.delete(`https://6469237a183682d6143aa779.mockapi.io/Posts/${id}`);
    
    return response;
  },
};

export default PostAPI;
