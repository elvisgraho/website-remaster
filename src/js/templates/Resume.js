import React from 'react';
import NameDisplayGlobal from '../molecules/nameDisplay/NameDisplayGlobal';
import aTag from '../atoms/aTag';

import Image from "../../images/png/me.png";



class Resume extends React.Component {

  
  constructor() {
    super();

    this.animationIDTop = 0;
    this.animationIDLeft = 0;
    this.animationIDRight1 = 0;
    this.animationIDRight2 = 0;
    this.animationIDRight3 = 0;
    this.animationIDRight4 = 0;

    this._isMounter = false;


    this.refTop = React.createRef();
    this.refLeft = React.createRef();
    this.refRight1 = React.createRef();
    this.refRight2 = React.createRef();
    this.refRight3 = React.createRef();
    this.refRight4 = React.createRef();
  };


  componentDidMount() {
    window.scrollTo(0, 0);

    this.animationIDTop = setTimeout(()=> this.refTop.current.classList.add("active") , 900);
    this.animationIDLeft = setTimeout(()=> this.refLeft.current.classList.add("active") , 1600);
    this.animationIDRight1 = setTimeout(()=> this.refRight1.current.classList.add("active") , 2000);
    this.animationIDRight2 = setTimeout(()=> this.refRight2.current.classList.add("active") , 2500);
    this.animationIDRight3 = setTimeout(()=> this.refRight3.current.classList.add("active") , 3100);
    this.animationIDRight4 = setTimeout(()=> this.refRight4.current.classList.add("active") , 3800);
  }

  componentWillUnmount() {
    clearTimeout(this.animationIDTop);
    clearTimeout(this.animationIDLeft);
    clearTimeout(this.animationIDRight1);
    clearTimeout(this.animationIDRight2);
    clearTimeout(this.animationIDRight3);
    clearTimeout(this.animationIDRight4);

    this.props.onRouteChange();
  }



  render () {

    return(
      <div className="resume">
        <div className="resume__wrapper">
          <NameDisplayGlobal arrayOfTexts={["RESUME"]} />

          <div className="resume__head " ref={this.refTop}>
            <div>
              <img alt="portrait" src={Image} />
            </div>
            <div> 
              <p className="headline headline--primary">Elvis Graholskis</p>
            </div>
          </div>

          <div className="resume__info">

            <div className="resume__info__left " ref={this.refLeft}>
              <div className="resume__info__left__contact">
                <h2 className="headline headline--secondary red">Contact</h2>
                <p className="text text--secondary resume__info__left__contact-email">Placeholder</p>
                <p className="text text--secondary resume__info__left__contact-phone">Placeholder</p>
                <div className="text text--secondary resume__info__left__contact-address">
                  <div>Margaretenstrasse 18</div>
                  <div>60489 Frankfurt am Main</div>
                </div>
              </div>
              <div className="resume__info__left__degree">
                <h2 className="headline headline--secondary red">Degree</h2>
                <p className="text text--secondary">BACHELOR OF SCIENCE:<br />COMPUTER SCIENCE</p>
                <p className="text text--tertiary">Oct 2015 - Oct 2018</p>
                <p className="text text--tertiary">Goethe University,<br />Fankfurt am Main</p>
              </div>
              <div className="resume__info__left__languages">
                <h2 className="headline headline--secondary red">Languages</h2>
                <p className="text text--secondary">English</p>
                <p className="text text--secondary">German</p>
                <p className="text text--secondary">Russian</p>
                <p className="text text--secondary">Latvian</p>
              </div>
              <div className="resume__info__left__hobbies">
                <h2 className="headline headline--secondary red">Hobbies</h2>
                <p className="text text--secondary">Sports</p>
                <p className="text text--secondary">Music</p>
              </div>
            </div>
            <div className="resume__info__right">
              <div className="resume__info__right__skills" ref={this.refRight1}>
                <h2 className="headline headline--secondary red">Skills (confident)</h2>
                <div className="resume__info__right__skills__confident">
                  <div>
                    <p className="text text--secondary">HTML / HTML5 / Canvas</p>
                    <p className="text text--secondary">CSS / CSS3 / Sass / BEM</p>
                    <p className="text text--secondary">JS / jQuery / Typescript</p>
                  </div>
                  <div>
                    <p className="text text--secondary">Mustache / Handlebars</p>
                    <p className="text text--secondary">React</p>
                    <p className="text text--secondary">React-Native</p>
                  </div>
                  <div>
                    <p className="text text--secondary">NodeJS / Webpack / Gulp</p>
                    <p className="text text--secondary">Linux / Git / TortoiseSVN</p>
                    <p className="text text--secondary">C++ / Python</p>
                  </div>
                </div>
              </div>
              <div className="resume__info__right__skills " ref={this.refRight2}>
                <h2 className="headline headline--secondary red">Skills (learning)</h2>
                <div className="resume__info__right__skills__exploring">
                  <div>
                    <p className="text text--secondary">NodeJS / Express</p>
                    <p className="text text--secondary">Docker</p>
                    <p className="text text--secondary">Redis / GraphQL</p>
                  </div>
                  <div>
                  </div>
                  <div>
                    <p className="text text--secondary">REST API</p>
                    <p className="text text--secondary">WebGL</p>
                    <p className="text text--secondary">Redux</p>
                  </div>
                </div>
              </div>
              <div className="resume__info__right__projects " ref={this.refRight3}>
                <h2 className="headline headline--secondary red">Projects</h2>
                <div>
                  <p className="text text--secondary">React-Native App 
                    Google-Play: {aTag("https://bit.ly/2OUsWM6", "Link ")}
                    Web-Demo: {aTag("https://bit.ly/2Iz6TXI", "Link ")}
                  </p> 
                </div>
                <div>
                  <p className="text text--secondary">
                    {aTag("https://www.clausthaler.de/geschmack/", "clausthaler.de ")}
                    (uses scrollify plugin - {aTag("https://github.com/lukehaas/Scrollify/pull/367", "pull request")})
                  </p> 
                </div>
                <div>
                  <p className="text text--secondary">
                    {aTag("https://www.berliner-pilsner.de/", "berliner-pilsner.de")}
                  </p> 
                </div>
              </div>
              <div className="resume__info__right__history " ref={this.refRight4}>
                <h2 className="headline headline--secondary red">History</h2>
                <div>
                  <p className="text text--secondary">Dec 2018 - Today: Arithnea GmbH / Web Developer</p>
                </div>
                <div>
                  <p className="text text--secondary">Dec 2017 - Sep 2018: TES Electronic Solutions / Software Developer (C++)</p>
                </div>
                <div>
                  <p className="text text--secondary">Oct 2015 - Oct 2018: Goethe Univeristy / Computer Science</p>
                </div>
              </div>
            </div>

          </div>
          
          <a type="submit" className="button button--primary" href={"www.google.com"}  rel="noopener noreferrer" target="_blank" download="">Download PDF!</a>
        </div>
      </div>
    )
  }

}


export default Resume;