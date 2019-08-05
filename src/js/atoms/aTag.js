import React from 'react';


const aTag = (href, text, className = "") => {

  return (
    <a className={className} href={href} rel="noopener noreferrer" target="_blank">{text}</a>
  )
}


export default aTag;