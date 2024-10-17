import Header from "./components/Header";
import { Routes, Route } from 'react-router-dom'
import Blog from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Blog />}></Route>
        <Route path="/blogs" element={<Blog />}></Route>
        <Route path="/my-blogs" element={<UserBlogs />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/create-blog" element={<CreateBlog />}></Route>
        <Route path="/blog-details/:id" element={<BlogDetails />}></Route>

      </Routes>
    </>
  );
}

export default App;
