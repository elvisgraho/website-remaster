import React from 'react';
import displayLetter from './../../atoms/displayLetter';


const nameDisplayF = (text1 = "", text2= "") => {
  // display up to two names simultaniously

  const nameArray1 = [...text1].map( (element, index) => { return displayLetter(element); });

  let nameArray2 = false;
  if("" !== text2){
    nameArray2 = [...text2].map( (element, index) => { return displayLetter(element); });
  }

  return (
    <div className="name-display-wrapper">

      <div className="name-display">
        {nameArray1.map(elem => elem)}
      </div>

      {nameArray2 && (
        <div className="name-display">
          {nameArray2.map(elem => elem)}
        </div>
      )}

    </div>
  )

}

export default nameDisplayF;