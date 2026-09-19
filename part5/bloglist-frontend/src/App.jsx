import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs.service";
import LoginForm from "./components/Login";
import loginService from "./services/login.service";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (e) => {
    e.preventDefault();
    try {
      const blogObject = {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      };
      blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setNewBlog({ title: "", author: "", url: "" });
        setNotification({
          message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
          type: "success",
        });
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch {
      setNotification({
        message: "Failed to create blog",
        type: "error",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleBlogChange = (e) => {
    const { id, value } = e.target;
    setNewBlog({ ...newBlog, [id]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUserName("");
      setPassword("");
    } catch {
      setNotification({ message: "Wrong username or password", type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
    setNotification(null);
  };

  const loginProps = {
    username,
    password,
    setUserName,
    setPassword,
    handleLogin,
  };
  const blogProps = {
    newBlog,
    addBlog,
    handleBlogChange,
  };
  return (
    <>
      <div style={{ margin: "10px" }}>
        <Notification notification={notification} />
        {user === null && <LoginForm {...loginProps} />}
        {user !== null && (
          <div>
            <h2>blogs</h2>
            <p style={{ padding: "5px 0px", margin: 0 }}>
              {user.username} logged in
            </p>
            <button onClick={handleLogout}>logout</button>
            <h2>create new</h2>
            <BlogForm {...blogProps} />
            <div style={{ padding: "5px 0px", margin: 0 }}>
              {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} {...blogProps} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
