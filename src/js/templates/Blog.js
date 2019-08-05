import React from 'react';
import uuidv1 from 'uuid/v1';

import NameDisplayGlobal from '../molecules/nameDisplay/NameDisplayGlobal';
import BlogContainer from '../organisms/BlogContainer';


class Blog extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    this.props.onRouteChange();
  }


  render () {


    return (
      <div className="blog">
        <NameDisplayGlobal arrayOfTexts={["BLOG"]} />

        <div className="blog__wrapper">
          <BlogContainer />
        </div>
      </div>
    )
  }
}


export default Blog;