const pos = require('./index.js');
pos.init();
pos.unset(['noun','preposition']);
let line = pos.snippet('I like cheese on toast.',0,0,0);
console.log(line);
console.log(pos.title('non shedding dogs info','p','tips',0));
console.log(pos.intro('tips',['how to train a dog','training a dog','dog training'],0,'','an activity'));
console.log(pos.tags(['dogs','puppies','puppy training']));
