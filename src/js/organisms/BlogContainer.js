import React from 'react';
import uuidv1 from 'uuid/v1';

import BlogArticle from '../molecules/BlogArticle';
import blogJson from '../../json/blogs.json';

class BlogContainer extends React.Component {

  render () {
    return (
      <div className="blog-container">
        {blogJson.blogs.map(blog => {
          return <BlogArticle blog={blog}  key={uuidv1()}/>
        })}
      </div>
    )
  }
}


export default BlogContainer;