export const debounce = (func, delay) => {
  let timeout = null;
  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const throttle = (func, delay) => {
  let isCalled = false;
  return function (...args) {
    if (isCalled == false) {
      func(...args);
      isCalled = true;
      setTimeout(() => {
        isCalled = false;
      }, delay);
    }
  };
};
