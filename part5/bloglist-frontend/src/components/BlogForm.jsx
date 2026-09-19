const BlogForm = ({ handleBlogChange, newBlog, addBlog }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        <label>
          title
          <input
            id="title"
            type="text"
            value={newBlog.title}
            onChange={handleBlogChange}
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            id="author"
            type="text"
            value={newBlog.author}
            onChange={handleBlogChange}
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            id="url"
            type="text"
            value={newBlog.url}
            onChange={handleBlogChange}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  );
};
export default BlogForm;
