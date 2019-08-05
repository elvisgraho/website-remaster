import React from 'react';
import NameDisplay from './NameDisplay';


class NameDisplayGlobal extends React.Component {

  /*
    Hanldes screen resize events for NameDisplay
  */
  constructor () {
    super();

    this.onScreenResizeID = 0;
    this._isMounter = false;

    this._windowWidth = window.innerWidth;
  }

  handleResize () {
    if(this._isMounter && window.innerWidth !== this._windowWidth){
      //make sure the witdth really changes (prevents safari bugs)
      clearTimeout(this.onScreenResizeID);
      this.onScreenResizeID = setTimeout( () => this.forceUpdate(), 400);

      this._windowWidth = window.innerWidth;
    }
  }

  componentWillMount() {
    this._isMounter = true;
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  componentWillUnmount() {
    this._isMounter = false;
    clearTimeout(this.onScreenResizeID);
  }


  render () {
    return (
      <React.Fragment>
        {this.props.arrayOfTexts.map( (text, index) => {
          return <NameDisplay text = {text} key={index}/>
        })}
      </React.Fragment>
    )
  }

}

export default NameDisplayGlobal;