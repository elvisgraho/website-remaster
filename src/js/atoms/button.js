import React from 'react';


const button = (text, modifier, func) => {

  let modifierClass = "button--";
  
  if(modifier){
    switch(modifier) {
      case 'pr':
        modifierClass = modifierClass + 'primary';
        break;
      case 'se':
        modifierClass = modifierClass + 'secondary';
        break;
      case 'ter':
        modifierClass = modifierClass + 'tertiary';
        break;
      case 'qua':
        modifierClass = modifierClass + 'quaternary';
        break;
      default:
        modifierClass = "";
    }
  }
  else {
    modifierClass = ""
  }

  return(
    <div className={"button " + modifierClass} onClick={func}>{text}</div>
  );
}

export default button;