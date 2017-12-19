const build = require('./src/build-src.js');

build.search('src/prepositions.txt','lib/preposition-search.js');
build.replace('src/prepositions.txt','lib/preposition-replace.js');
