const pos = require('./index.js');
pos.init();
let obj = pos.split('Dog training classes and a good trainer can help you improve your behavior which will translate to success with your dog.');
console.log(obj);
console.log(pos.components(obj));
