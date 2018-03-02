const pos = require('./index.js');
pos.init();
console.log(pos.title('training a dog','g','facts',9));
console.log(pos.promo('training a dog','http://heartmydog.com'));
console.log(pos.intro('facts',['dog training','training a dog']));
console.log(pos.license(true));
console.log(pos.tags(['dog training','training a dog']));
