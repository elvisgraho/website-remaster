//represents one letter for our letter animation
import React from 'react';
import shortid from 'shortid';
/*
  This function returns out display letter class which is used for our animation
  This is exclusive to nameDisplayAnimation.js and is not ment to be reused
*/

const displayLetter = (letterText, modyfierClass = "", inlineStyle = {}) => {
  return (
    <p className={"letter " + modyfierClass} style={inlineStyle} key={shortid.generate()}>{letterText}</p>
  )
}

export default displayLetter;