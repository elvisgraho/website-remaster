import React from 'react';
import {Link} from "react-router-dom";


class Header extends React.Component {

  constructor() {
    super();

    this.selfRef = React.createRef();
    this.timeoutId = 0;
  }

  componentDidUpdate() {
    if(this.selfRef){

      this.selfRef.current.classList.remove('header--show');

      this.timeoutId = setTimeout( () => {
        this.selfRef.current.classList.add('header--show');
      }, 0)
    }
  }

  componentDidMount() {
    if(this.selfRef && this.selfRef){
      this.selfRef.current.classList.remove('header--show');

      this.timeoutId = setTimeout( () => {
        this.selfRef.current.classList.add('header--show');
      }, 0)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    const {route, onRouteChange} = this.props;

    return(
      <div className="header" ref={this.selfRef}>
        {route !== "/" && (
          <Link to={process.env.PUBLIC_URL + "/"} onClick={onRouteChange}>
            <div className="header-button">
              Home
            </div>
          </Link>
        )}
        {route !== "/blog" && (
          <Link to={process.env.PUBLIC_URL + "/blog"} onClick={onRouteChange}>
            <div className="header-button">
              Blog
            </div>
          </Link>
        )}
      </div>
    )
  }
}

export default Header;