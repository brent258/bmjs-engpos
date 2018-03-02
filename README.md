# bmjs-engpos
An English language utility for extracting interesting parts from a string of text a re-printing them in a selection of formats. Also includes options for replacing recognized terms from an in-built thesaurus, filtering out common stopwords and randomizing the output order.
```javascript
const pos = require('bmjs-engpos');
```
***unset():*** Disable options (adjective, verb, noun, adverb, preposition, conjunction, determiner, modal) for word replacement in in-built thesaurus (options: *String* | *[String]*)
```javascript
pos.init();
pos.unset(['verb','noun']);
```
***print():*** Prints a paragraph-like string of text (sentences: *String*,spin: *Bool*,strip: *Bool*,randomize: *Bool*,list: *Bool*) -> *String*
```javascript
let sentences = ['this is a first sentence','this is a second sentence.'];
let print = pos.print(sentences,true,true,true,false);
console.log(print);
/*
This is a first sentence. This is a additional sentence.
*/
```
***snippets():*** Prints a string of truncated text components (sentences: *String*,spin: *Bool*,strip: *Bool*,randomize: *Bool*,list: *Bool*) -> *String*
```javascript
let sentences = ['this is a first sentence','this is a second sentence.'];
let snippets = pos.snippets(sentences,true,true,true,true);
console.log(snippets);
/*
- First sentence.
- Second sentence.
*/
```
