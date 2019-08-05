import React, {Component} from 'react';
import displayLetter from './../../atoms/displayLetter';
import shuffleString from './../../utils/shuffleString';

import animateString from './nameDisplayAnimation';


class NameDisplay extends Component {
  constructor(props){
    super(props);

    //transform sting props into an array of React objetcs
    const text = this.props.text;

    let falseText = "";
    
    if(7 < text.length && 4 < text.length){
      //animation takes way longer if we truly randomize a large string
      //and animation is too short if we truly randomize a short string
      //so we just reverse the original string
      falseText = text.split("").reverse().join("");
    }
    else{
      //randomizes a string with a bias
      falseText = shuffleString(text);
    }

    let nameArray = [...falseText].map( (element) => displayLetter(element) );

    this.debouncer = 0;
    this.animationDebouncer = 0;

    this.selfRef = React.createRef();

    this.state = {
      letterWidth: 0,
      letterHeight: 0,

      isAnimating: true,

      currentText: falseText, // This is a string
      rightText: text, // This is a string

      animationCycleText: 0,

      currentTextRender: [...nameArray], // This is an array of react objects
    }
  }

  animate() {
    if(this.state.isAnimating){

      const {currentText, rightText, animationCycleText, letterWidth, letterHeight, isAnimating} = this.state;

      //returns false if animation stopped
      let returnedValue = animateString(
        currentText, rightText, this.selfRef.current, isAnimating, animationCycleText, letterWidth, letterHeight
      );

      if(false === returnedValue){
        this.setState({isAnimating: false});
      }
      else{
        const {animationCycle, currentText, currentTextRender} = returnedValue;
  
        if(currentText && currentTextRender){
          //returns new text when 1 animation round is completed
          this.setState({
            animationCycleText: animationCycle,
            currentText: currentText,
            currentTextRender: currentTextRender
          });
        }
        else{
          // go to the next anymation round
          this.animationDebouncer = setTimeout( () => {
            this.setState({animationCycleText: animationCycle});
          }, 150) //if the number is lower than the css transition time the animation looks cooler
        }
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.debouncer);
    clearTimeout(this.animationDebouncer);
  }

  componentDidUpdate() {
    // debounce animation
    this.debouncer = clearTimeout(this.debouncer);

    if(this.state.isAnimating){
      this.debouncer = setTimeout( () => {
        this.animate();
      }, 50);
    }
  }
  componentDidMount() {
    //assume all letters have equal height and width
    let letterWidth = this.selfRef.current.getElementsByClassName("letter")[0].offsetWidth;
    let letterHeight = this.selfRef.current.getElementsByClassName("letter")[0].offsetHeight;

    //make sure our object does not resize (prevents it from jumping when animated)
    this.selfRef.current.style.width = (letterWidth * this.state.currentText.length)  + "px";

    //reuse debouncer for update
    this.debouncer = setTimeout( () => {
      this.setState({
        letterWidth: letterWidth,
        letterHeight: letterHeight
      });
    }, (1000 + Math.random()*2500)); //randomozie start

    this.selfRef.current.classList.add('name-display--show');
  }

  render() {
    const {currentTextRender} = this.state;
    
    return(
      <div className="name-display" ref={this.selfRef}>
        {currentTextRender.map(elem => elem)}
      </div>
    )
  }

}

export default NameDisplay;