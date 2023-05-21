import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import Home from "./screens/Home";
import PostList from "./components/PostList";
import PostDetails from "./components/postDetails";
function App() {
  return (
    <>
      <Router>
        <Routes>
          
          <Route
            path="/"
            element={
               <Home />
            }
          />
          <Route
            path="/posts"
            element={
              <PostList />
            }
          />
          <Route
            path="/post/:postId"
            element={
               <PostDetails />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
