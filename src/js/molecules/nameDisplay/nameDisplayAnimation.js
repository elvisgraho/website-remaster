import displayLetter from './../../atoms/displayLetter';


const animateString = (currentText, rightText, parentDOM, isAnimating, animationCycle, letterWidth, letterHeight) => {
  /*
    This function is a helper funtion for NameDisplay.js
    It animates NameDisplay.js using jquery and css transition
    Anikmation Cycles might be skipped for cooler looking animations

    * must return an object
  */

  if(isAnimating && currentText !== rightText){
    //animates untill displayed text does not match our result

    const animationIndex = currentText.length - 1;

    let foundIndex = rightText.indexOf(currentText[animationIndex]);
    let indexDifference = Math.abs(animationIndex - foundIndex);
    

    if(0 === animationCycle){
      parentDOM.getElementsByClassName("letter")[animationIndex].style.marginTop = -letterHeight + "px";
      return {animationCycle: 1};
    }
    else if(1 === animationCycle){
      parentDOM.getElementsByClassName("letter")[currentText.length - indexDifference - 1].style.marginLeft = letterWidth + "px";
      parentDOM.getElementsByClassName("letter")[animationIndex].style.marginLeft = -letterWidth * (indexDifference + 1)  + "px";

      return {animationCycle: 2};
    }
    else if(2 === animationCycle){
      parentDOM.getElementsByClassName("letter")[animationIndex].style.marginTop = 0 + "px";

      return {animationCycle: 3};
    }
    else if(3 === animationCycle){
      
      let newText = currentText.slice(0 , foundIndex) + 
        rightText[foundIndex] + 
        currentText.slice(foundIndex , currentText.length - 1);

      let newArray = [...newText].map( (element) => displayLetter(element) );

      return{
        animationCycle: 0, 
        currentText: newText,
        currentTextRender: [...newArray]
      }
    }
    
  }
  else{
    // animation stopped
    return false;
  }

}

export default animateString;