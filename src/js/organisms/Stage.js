import React, { Component } from 'react';
import NameDisplayGlobal from '../molecules/nameDisplay/NameDisplayGlobal';
import button from '../atoms/button';


class Stage extends Component {

  constructor() {
    super();

    this.selfRef = React.createRef();

  };

  scrollNext () {
    window.scroll({
      top: this.selfRef.current.offsetTop + this.selfRef.current.offsetHeight,
      behavior: 'smooth'
    });
  }

  render() {
    return (
      <div className="stage" ref={this.selfRef}>
        <div className="name-display-wrapper name-display--small">
          <NameDisplayGlobal arrayOfTexts={["ELVIS", "GRAHOLSKIS"]} />
        </div>

        <div className="stage__wrapper">
          {button("Discover more", 'se', this.scrollNext.bind(this))}
        </div>
      </div>
    );
  }
}

export default Stage;
