import { useState } from 'react';

const Blog = ({ blog, fromUser, onLike, onRemove }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div>
          <div>
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
          </div>
          <div>
            likes {blog.likes} <button onClick={onLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {fromUser && <button onClick={onRemove}>remove</button>}
        </div>
      )}
    </div>
  );
};

export default Blog;
