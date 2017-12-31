# bmjs-engpos
An English language utility for extracting interesting parts from a string of text a re-printing them in a selection of formats. Also includes options for replacing recognized terms from an in-built thesaurus, filtering out common stopwords and randomizing the output order.

```javascript
const pos = require('bmjs-engpos');
let sentence = 'An English language utility for extracting interesting parts from a string of text and re-printing them in a selection of formats. Also includes options for replacing recognized terms from an in-built thesaurus, filtering out common stopwords and randomizing the output order.';
```
***prettyPrint():*** Prints a paragraph-like string of text (sentence: *String*,spin: *Bool*,strip: *Bool*,randomize: *Bool*) -> *String*
```javascript
let printed = pos.prettyPrint(sentence,true,true,true);
console.log(printed);

/* Includes options for replacing recognized terms from in-built thesaurus. English language advantageousness for extracting thought-provoking parts from string of text. Re-printing them in selection of formats. Filtering out common stopwords and randomizing manufacturing order. */
```
***prettyPrintList():*** Prints a list-like string of text (sentence: *String*,spin: *Bool*,strip: *Bool*,randomize: *Bool*) -> *String*
```javascript
let printed = pos.prettyPrintList(sentence,true,true,true);
console.log(printed);

/* - Filtering out common stopwords and randomizing outturn order.
- Includes options for replacing recognized terms from in-built thesaurus.
- English language use for extracting beguiling parts from string of text.
- Re-printing them in selection of formats. */
```
***prettyPrintSnippets():*** Returns an array of shortened snippets of text (sentence: *String*,spin: *Bool*,strip: *Bool*,randomize: *Bool*) -> *[String]*
```javascript
let printed = pos.prettyPrintSnippets(sentence,true,true,true);
console.log(printed);

/* [ 'Randomizing production order',
  'From string of text',
  'From in-built wordfinder',
  'In selection of formats' ] */
```
***prettyPrintSnippet():*** Prints one shortened string of text (sentence: *String*,spin: *Bool*,strip: *Bool*,randomize: *Bool*) -> *String*
```javascript
let printed = pos.prettyPrintSnippet(sentence,true,true,true);
console.log(printed);

/* From string of text */
```
