function observe(obj) {
  // define property for each key
  Object.keys(obj).forEach(key => {
    let internalValue = obj[key];
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        console.log(key, 'is:', internalValue);
        dep.depend();
        return internalValue;
      },
      set(value) {
        internalValue = value;
        console.log('setting', key, 'to:', internalValue);
        dep.notify();
      }
    });
  });
}

class Dep {
  constructor() {
    this.observers = [];
  }
  depend() {
    if(externalUpdate) {
      this.observers.push(externalUpdate);
    }
  }
  notify() {
    this.observers.forEach(obs => obs());
  }
}

let externalUpdate;
function autorun(update) {
  let externalUpdate = update;
  update();
}

const state = {
  count: 0
};

observe(state);

autorun(() => {
  console.log(state.count)
});
// should immediately log "count is: 0"

state.count++;
// should log "count is: 1"
