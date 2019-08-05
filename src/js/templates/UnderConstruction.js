import React from 'react'; 
import Image from "../../images/png/underConstruction.png";
import {Link} from "react-router-dom";

class UnderConstruction extends React.Component {

  constructor(){
    super();

    this.selfRef = React.createRef();
    this.timeoutID = 0;
  }

  componentWillUnmount() {
    this.props.onRouteChange();
    clearTimeout(this.timeoutID);
  }

  componentDidMount () {
    if(this.selfRef.current){
      this.timeoutID = setTimeout( () => {this.selfRef.current.classList.add("under-construction__wrapper--show")} , 50);
    }
  }

  render () {
    const { route } = this.props;

    return (
      <div className="under-construction">
        <div className="under-construction__wrapper" ref={this.selfRef}>
          <img alt="under-construction" src={Image}></img>
          <h2 className="headline headline--primary">Attention! Attention!</h2>
          <p className="text text--primary">
            Unfortunatelly the page which you are currently viewing is  <b>under construction</b>!
            <br />
            <br />
            Please go back and consider other options!
            <br />
            <br />
          </p>
          <Link to={process.env.PUBLIC_URL + route}>
            <div className="button button--primary">
              GO BACK
            </div>
          </Link>
        </div>
      </div>
    )
  
  }

}

export default UnderConstruction;