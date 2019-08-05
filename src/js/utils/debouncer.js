
const debonceFunction = (func, time) => {
  let debounceId;

  return function() {
    clearTimeout(debounceId);
    debounceId = setTimeout( () => func.apply(this, [...arguments]), time);
  };
}


export default debonceFunction;