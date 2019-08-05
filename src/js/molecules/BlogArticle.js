import React from 'react';


class BlogArticle extends React.Component {

  constructor() {
    super();

    this.openBlog = this.openBlog.bind(this);
    this.closeBlog = this.closeBlog.bind(this);
    this.closeBlogDebounced = this.closeBlogDebounced.bind(this);

    this.debouncerID = 0;

    this.selfRef = React.createRef();

    this.state = {
      isBlogOpen: false
    }

  }

  openBlog () {
    if(!this.state.isBlogOpen){
      let allBlogs = document.getElementsByClassName("blog-article");

      for (let i = 0; i < allBlogs.length; ++i) {
        if(allBlogs[i] !== this.selfRef.current){
          allBlogs[i].classList.add("blog-article--hidden");
        }  
      }

      this.setState({isBlogOpen: true});
    }
  }

  closeBlog () {
    if(this.state.isBlogOpen){
      let allBlogs = document.getElementsByClassName("blog-article");

      for (let i = 0; i < allBlogs.length; ++i) {
        allBlogs[i].classList.remove("blog-article--hidden");
      }
      this.setState({isBlogOpen: false});
      window.scrollTo(0, 0);
    }
  }

  closeBlogDebounced ( event ) {
    clearTimeout(this.debouncerID);

    if(this.state.isBlogOpen  && "blog" === event.target.classList[0]){
      this.debouncerID = setTimeout( () => this.closeBlog(event) , 50);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.debouncerID);
  }

  componentDidMount () {
    document.getElementsByClassName("blog")[0].addEventListener("click", this.closeBlogDebounced);
  }

  componentDidUpdate () {
    if(this.state.isBlogOpen && this.selfRef){
      window.scroll({
        top: this.selfRef.current.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  }


  render () {

    const { blog } = this.props;

    return (
      <div className="blog-article" ref={this.selfRef}>

        {!this.state.isBlogOpen ? (
          <div className="blog-article blog-article-closed">
            <img src={blog.previewImgSrc} alt={blog.previewImgAlt}></img>
            <div className="blog-article-closed__wrapper">
              <h2 className="headline headline--secondary">{blog.previewHeadline}</h2>
              <p className="text tex--secondary">{blog.previewText}</p>
              <div className="button button--primary button--small" onClick={this.openBlog}>{blog.previewBtnText}</div>
            </div>
          </div>
        ) 
        : (
          <div className="blog-article blog-article-open">
            <h2 className="headline headline--primary">{blog.blogContent.blogHeadline}</h2>

            {blog.blogContent.blogTextContent.map( (textContent, index) => {
              // json must specify what type of contect it is
              if(textContent.type === "text" && textContent.content){
                return <p key={index} className="text text--secondary" dangerouslySetInnerHTML={{ __html: textContent.content}}></p>
              }
              else if(textContent.type === "img" && textContent.src && textContent.alt){
                return <img key={index} src={textContent.src} alt={textContent.alt}></img>
              }
              else if(textContent.type === "headline" && textContent.headline){
                return <h3 key={index} className="headline headline--secondary">{textContent.headline}</h3>
              }
              else {
                console.log("Wrong Blog Article Configuration! Check your blogs.json!");
                return null;
              }
            })}

            <div className="button button--primary button--small" onClick={this.closeBlog}>Close Article</div>
          </div>
        )}

      </div>
    )
  }
}


export default BlogArticle;