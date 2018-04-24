function observe(obj) {
  // define property for each key
  Object.keys(obj).forEach(key => {
    let internalValue = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        console.log(key, 'is:', internalValue);
        return internalValue;
      },
      set(value) {
        internalValue = value;
        console.log('setting', key, 'to:', internalValue);
      }
    });
  });
}

const obj = {
  number: 42
};

observe(obj);

obj.number; // should log: '"number" is: 123'
obj.number = 13; // should log: 'setting "number" to: 234'
obj.number; // should log: '"number" is: 234'
