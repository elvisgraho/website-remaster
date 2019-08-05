const replaceAt = (string, index, replace) => {
  return string.substring(0, index) + replace + string.substring(index + 1);
}


const shuffleString = (string) => {
  /*
    This function shuffles the string
    The shuffle has a bias -> the last letter will alwats be first
    ! We make sure that it is a copy and not the reference
  */
  let returnString = string.slice();

  let stringLenght = returnString.length - 1

  let firstLetter = returnString[0];
  let currentLetter = returnString[stringLenght]

  returnString = replaceAt(returnString, 0, currentLetter);
  returnString = replaceAt(returnString, stringLenght, firstLetter);

  for (let i = stringLenght; i > 1; i--) {
    //I dont want to touch the first letter, because of our animation drawback
    const j = Math.floor(Math.random() * i) + 1;

    currentLetter = returnString[i];

    returnString = replaceAt(returnString, i, returnString[j]);
    returnString = replaceAt(returnString, j, currentLetter);
  }

  return returnString.slice();
}

export default shuffleString;