import React from 'react';
import { Link } from 'react-router-dom';
import aTag from '../atoms/aTag';

class TextMedia extends React.Component {

  constructor() {
    super();
    this.selfRef = React.createRef();

    this.timeoutId = 0;

    this._isMounted = false;

    this.state = {
      image: ""
    }
  }

  componentDidMount () {
    this._isMounted = true;

    this.selfRef.current.classList.add("text-media-show");

    this.mountComponent();
  }

  componentDidUpdate () {
    if(this._isMounted){
      this.selfRef.current.classList.remove("text-media-show");

      this.timeoutId = setTimeout( () => {
        this.selfRef.current.classList.add("text-media-show");
      }, 0);
  
      if(this.props.src){
        let image = require(`../../images/${this.props.src}`);
  
        if(this.state.image !== image){
          this.setState({image: image});
        }
      }
    }
  }

  mountComponent () {
    if(this.props.src){
      this.setState({image: require(`../../images/${this.props.src}`)});
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timeoutId);
    this._isMounted = false;
  }

  render() {
    const {headline, text, src, btnText, route, btnClass, url} = this.props;
    
    return (

      <div className="text-media" ref={this.selfRef}>
        <h2 className="headline headline--primary">{headline}</h2>
        <p className="text text--primary" dangerouslySetInnerHTML={{ __html: text}}></p>
  
        {src && (
          <img src={this.state.image} alt={"text-media"}></img>
        )}
  
        {route && (
          <Link to={process.env.PUBLIC_URL + route}>
            <div className={`button button--${btnClass}`}>{btnText}</div>
          </Link>
        )}

        {url && (
          <React.Fragment>
            {aTag(url, btnText, `button button--${btnClass}`)}
          </React.Fragment>
        )}
  
      </div>
    )
  }


}

export default TextMedia;
