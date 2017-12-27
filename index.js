const rand = require('bmjs-random');
const dict = require('./lib/dictionary.js');
const Tag = require('en-pos').Tag;

module.exports = {

  splitStopwords: function(sentence) {
      if (!sentence || typeof sentence !== 'string') {
        console.log('No sentence found to split.');
        return;
      }
      let filteredPhrases = sentence;
      for (let i = 0; i < dict.DeterminerSearch.phrases.length; i++) {
        filteredPhrases = filteredPhrases.replace(dict.DeterminerSearch.phrases[i].search,dict.DeterminerSearch.phrases[i].replace);
      }
      for (let i = 0; i < dict.ConjunctionSearch.phrases.length; i++) {
        filteredPhrases = filteredPhrases.replace(dict.ConjunctionSearch.phrases[i].search,dict.ConjunctionSearch.phrases[i].replace);
      }
      for (let i = 0; i < dict.PrepositionSearch.phrases.length; i++) {
        filteredPhrases = filteredPhrases.replace(dict.PrepositionSearch.phrases[i].search,dict.PrepositionSearch.phrases[i].replace);
      }
      filteredPhrases = filteredPhrases
      .replace(dict.DeterminerSearch.singleRegex,'|||||$1$2$3|||||')
      .replace(dict.DeterminerSearch.multiRegex,'|||||$1$2|||||')
      .replace(dict.ConjunctionSearch.singleRegex,'|||||$1$2$3|||||')
      .replace(dict.ConjunctionSearch.multiRegex,'|||||$1$2|||||')
      .replace(dict.PrepositionSearch.singleRegex,'|||||$1$2$3|||||')
      .replace(dict.PrepositionSearch.multiRegex,'|||||$1$2|||||')
      .replace(dict.VerbSearch.commonRegex,'|||||$2|||||')
      .replace(/\s*(\,|\:|\)|\(|\.|\?|\!)\s*/g,'|||||$1|||||')
      .replace(/\s+(\-)\s+/g,'|||||$1|||||')
      .replace(/\s*\|\|\|\|\|\s*/g,'|||||')
      .replace(/\|\|\|\|\|\|\|\|\|\|/g,'|||||');
      let filteredPhrasesArray = filteredPhrases.split('|||||');
      let stopwords = [];
      for (let i = 0; i < filteredPhrasesArray.length; i++) {
        let obj = {};
        if (filteredPhrasesArray[i]) {
          if (!filteredPhrasesArray[i].match(/[A-Za-z]/)) {
            obj.word = filteredPhrasesArray[i];
            obj.type = 'PUNCTUATION';
            stopwords.push(obj);
          }
          else if (dict.VerbSearch.commonList.includes(filteredPhrasesArray[i])) {
            obj.word = filteredPhrasesArray[i];
            obj.type = 'VERB';
            stopwords.push(obj);
          }
          else if (dict.PrepositionSearch.singleList.includes(filteredPhrasesArray[i]) || dict.PrepositionSearch.multiList.includes(filteredPhrasesArray[i])) {
            obj.word = filteredPhrasesArray[i].replace(/_/g,' ');
            obj.type = 'PREPOSITION';
            stopwords.push(obj);
          }
          else if (dict.ConjunctionSearch.singleList.includes(filteredPhrasesArray[i]) || dict.ConjunctionSearch.multiList.includes(filteredPhrasesArray[i])) {
            obj.word = filteredPhrasesArray[i].replace(/_/g,' ');
            obj.type = 'CONJUNCTION';
            stopwords.push(obj);
          }
          else if (dict.DeterminerSearch.singleList.includes(filteredPhrasesArray[i]) || dict.DeterminerSearch.multiList.includes(filteredPhrasesArray[i])) {
            obj.word = filteredPhrasesArray[i].replace(/_/g,' ');
            obj.type = 'DETERMINER';
            stopwords.push(obj);
          }
          else {
            obj.word = filteredPhrasesArray[i];
            obj.type = 'COMPONENT';
            stopwords.push(obj);
          }
        }
      }
      return stopwords;
    },

    matchTag: function(word,type) {
      if (!word || typeof word !== 'string' || !type || typeof type !== 'string') {
        console.log('Unable to find tag without word.');
      }
      let tag = new Tag([word]).initial().smooth().tags[0];
      switch (tag) {
        case 'VB':
        case 'VBP':
        case 'VBZ':
        case 'VBD':
        case 'VBN':
        case 'VBG':
        if (type.trim().toUpperCase() === 'VERB') {
          return true;
        }
        case 'NN':
        case 'NNS':
        case 'NNP':
        case 'NNPS':
        if (type.trim().toUpperCase() === 'NOUN') {
          return true;
        }
        case 'JJ':
        case 'JJR':
        case 'JJS':
        if (type.trim().toUpperCase() === 'ADJECTIVE') {
          return true;
        }
        case 'RB':
        case 'RBR':
        case 'RBS':
        if (type.trim().toUpperCase() === 'ADVERB') {
          return true;
        }
        default: return false;
      }
    },

    searchAndReplacePhrases: function(wordObject,sentence) {
      if (!wordObject || !wordObject.type || !wordObject.word) {
        console.log('Unable to search for replacement phrases without word object.');
        return;
      }
      let uppercased = wordObject.word[0].match(/[A-Z]/) ? true : false;
      let search = uppercased ? wordObject.word.toLowerCase() : wordObject.word;
      let type = wordObject.type;
      let result;
      if (type === 'PREPOSITION') {
        result = dict.PrepositionReplace(search);
      }
      else if (type === 'CONJUNCTION') {
        result = dict.ConjunctionReplace(search);
      }
      else if (type === 'DETERMINER') {
        result = dict.DeterminerReplace(search);
      }
      else {
        result = search;
      }
      if (uppercased && result.length > 1) {
        sentence.push(result[0].toUpperCase() + result.slice(1));
      }
      else {
        sentence.push(result);
      }
    },

    searchAndReplaceDictionary: function(searchTerm,nextWord,sentence) {
      let letter = searchTerm[0].toLowerCase();
      let uppercased = searchTerm[0].match(/[A-Z]/) ? true : false;
      let search = uppercased ? searchTerm.toLowerCase() : searchTerm;
      let synonyms = dict[letter];
      let result;
      if (nextWord.type !== 'PUNCTUATION' && synonyms && synonyms[search + ' ' + nextWord.word]) {
        result = rand(...synonyms[search + ' ' + nextWord.word].synonyms);
      }
      else if (synonyms && synonyms[search] && this.matchTag(search,synonyms[search].pos)) {
        result = rand(...synonyms[search].synonyms);
      }
      else {
        result = search;
      }
      if (uppercased && result.length > 1) {
        sentence.push(result[0].toUpperCase() + result.slice(1));
      }
      else {
        sentence.push(result);
      }
    },

    findComponents: function(obj) {
      if (!obj || typeof obj !== 'object') {
        console.log('Unable to find sentence components without sentence object.');
        return;
      }
      let components = [];
      for (let i = 0; i < obj.length; i++) {
        let nextWord = '';
        if (i < obj.length-1) {
          nextWord = obj[i+1];
        }
        let nextNextWord = '';
        if (i < obj.length-2) {
          nextNextWord = obj[i+2];
        }
        if (obj[i].type === 'COMPONENT' && nextWord.type !== 'PUNCTUATION' && nextNextWord && nextNextWord.type === 'COMPONENT') {
          let component = obj[i].word + ' ' + nextWord.word + ' ' + nextNextWord.word;
          components.push(component);
          i += 2;
        }
      }
      console.log(components);



    },

    swap: function(obj) {
      if (!obj || typeof obj !== 'object') {
        console.log('No sentence object found.');
        return;
      }
      let swappedObjects = [];
      for (let i = 0; i < obj.length; i++) {
        let phrase = [];
        let nextWord = '';
        if (i < obj.length-1) {
          nextWord = obj[i+1];
        }
        if (obj[i].type === 'COMPONENT') {
          if (obj[i].word.match(/\s/)) {
            let words = obj[i].word.split(' ');
            for (let j = 0; j < words.length; j++) {
              this.searchAndReplaceDictionary(words[j],nextWord,phrase);
            }
          }
          else {
            this.searchAndReplaceDictionary(obj[i].word,nextWord,phrase);
          }
          let newObject = {
            word: phrase.join(' '),
            type: 'COMPONENT'
          }
          swappedObjects.push(newObject);
        }
        else {
          this.searchAndReplacePhrases(obj[i],phrase);
          let newObject = {
            word: phrase.join(' '),
            type: obj[i].type
          }
          swappedObjects.push(newObject);
        }
      }
      return swappedObjects;
    }


};
