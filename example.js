const pos = require('./index.js');
let obj = pos.split('the quick brown foxy JUMPED over the (very) "lazy" dog.');
console.log(pos.components(obj));
