const pos = require('./index.js');
pos.init();
let obj = pos.split('This can be one of the more difficult commands in dog obedience training');
console.log(obj);
console.log(pos.components(obj));
