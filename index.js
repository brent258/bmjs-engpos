const rand = require('bmjs-random');
const dict = require('./lib/dictionary.js');
const Tag = require('en-pos').Tag;
const shuffle = require('bmjs-shuffle');

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
      .replace(/\s*(\,|\:|\)|\(|\.|\?|\!|\;)\s*/g,'|||||$1|||||')
      .replace(/\s+(\-)\s+/g,'|||||$1|||||')
      .replace(/([A-Za-z]+\-)\|\|\|\|\|/g,'$1')
      .replace(/\s*\|\|\|\|\|\s*/g,'|||||')
      .replace(/\|\|\|\|\|\|\|\|\|\|/g,'|||||');
      let filteredPhrasesArray = filteredPhrases.replace(/\s*\|\|\|\|\|\s*/g,' ').split(' ');
      let tags = new Tag(filteredPhrasesArray).initial().smooth().tags;
      let stopwords = [];
      for (let i = 0; i < filteredPhrasesArray.length; i++) {
        let obj = {};
        if (filteredPhrasesArray[i] && tags[i]) {
          if (!filteredPhrasesArray[i].match(/[A-Za-z]/)) {
            obj.word = filteredPhrasesArray[i];
            obj.type = 'PUNCTUATION';
            obj.pos = tags[i];
            stopwords.push(obj);
          }
          else if (dict.PrepositionSearch.singleList.includes(filteredPhrasesArray[i]) || dict.PrepositionSearch.multiList.includes(filteredPhrasesArray[i])) {
            obj.word = filteredPhrasesArray[i].replace(/_/g,' ');
            obj.type = 'PREPOSITION';
            obj.pos = tags[i];
            stopwords.push(obj);
          }
          else if (dict.ConjunctionSearch.singleList.includes(filteredPhrasesArray[i]) || dict.ConjunctionSearch.multiList.includes(filteredPhrasesArray[i])) {
            obj.word = filteredPhrasesArray[i].replace(/_/g,' ');
            obj.type = 'CONJUNCTION';
            obj.pos = tags[i];
            stopwords.push(obj);
          }
          else if (dict.DeterminerSearch.singleList.includes(filteredPhrasesArray[i]) || dict.DeterminerSearch.multiList.includes(filteredPhrasesArray[i])) {
            obj.word = filteredPhrasesArray[i].replace(/_/g,' ');
            obj.type = 'DETERMINER';
            obj.pos = tags[i];
            stopwords.push(obj);
          }
          else {
            obj.word = filteredPhrasesArray[i];
            obj.type = 'COMPONENT';
            obj.pos = tags[i];
            stopwords.push(obj);
          }
        }
      }
      return stopwords;
    },

    matchTag: function(pos,type) {
      if (!pos || typeof pos !== 'string' || !type || typeof type !== 'string') {
        console.log('Unable to find tag without word.');
        return;
      }
      switch (pos.toUpperCase()) {
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

    searchAndReplacePhrases: function(wordObject,sentence,spin) {
      if (!wordObject || !wordObject.type || !wordObject.word) {
        console.log('Unable to search for replacement phrases without word object.');
        return;
      }
      let uppercased = wordObject.word[0].match(/[A-Z]/) ? true : false;
      let search = uppercased ? wordObject.word.toLowerCase() : wordObject.word;
      let type = wordObject.type;
      let result;
      if (type === 'PREPOSITION' && spin) {
        result = dict.PrepositionReplace(search);
      }
      else if (type === 'CONJUNCTION' && spin) {
        result = dict.ConjunctionReplace(search);
      }
      else if (type === 'DETERMINER' && spin) {
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

    searchAndReplaceDictionary: function(searchObject,sentence,spin) {
      let letter = searchObject.word[0].toLowerCase();
      let uppercased = searchObject.word[0].match(/[A-Z]/) ? true : false;
      let search = uppercased ? searchObject.word.toLowerCase() : searchObject.word;
      let synonyms = dict[letter];
      let result;
      if (spin && synonyms && synonyms[search] && this.matchTag(searchObject.pos,synonyms[search].pos)) {
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

    stripCommonWords: function(phrase) {
      if (!phrase || typeof phrase !== 'string') {
        console.log('Unable to strip words without string.');
        return;
      }
      return phrase
      .replace(/^(i|you|it|he|she|they|this|these|that|those|we|i\'m|he\'s|she\'s|we\'re|you\'re|there|there\'re|there\'s)\s/gi,'')
      .replace(/\b(isn\'t|aren\'t|wasn\'t|weren\'t|hasn\'t|haven\'t|can\'t\sbe|cannot\sbe|won\'t\sbe|mightn\'t\sbe|wouldn\'t\sbe|shouldn\'t\sbe)\b/gi,'not')
      .replace(/\b(the|a|an|is|are|was|were|to\sbe|can\sbe|may\sbe|might\sbe|could\sbe|should\sbe|will\sbe|would\sbe|it\'s|they\'re|my|your|his|her|its|their|our)\b/gi,'')
      .replace(/\s+/g,' ')
      .trim();
    },

    isQuestion: function(phrase) {
      if (!phrase || typeof phrase !== 'string') {
        console.log('Unable to detect question without string.');
        return;
      }
      if (phrase.match(/^(how|why|when|what|which)*\s*(do|does|did|doesn\'t|didn\'t|don\'t|have|has|had|haven\'t|hadn\'t|hasn\'t|is|are|was|were|isn\'t|aren\'t|wasn\'t|weren\'t|can|might|may|will|would|could|should|can\'t|mightn\'t|won\'t|wouldn\'t|couldn\'t|shouldn\'t)\s(i|my|you|your|he|his|she|her|it|its|they|their|we|our|this|that|these|those)/gi)) {
        return true;
      }
      return false;
    },

    findComponents: function(obj,strip) {
      if (!obj || typeof obj !== 'object') {
        console.log('Unable to find sentence components without sentence object.');
        return;
      }
      let components = [];
      for (let i = 0; i < obj.length; i++) {
        if (i < obj.length-6) {
          if (obj[i].type === 'COMPONENT' && obj[i+1].type === 'NONCOMPONENT' && obj[i+2].type === 'COMPONENT' && obj[i+3].type === 'NONCOMPONENT' && obj[i+4].type === 'COMPONENT' && obj[i+5].type === 'NONCOMPONENT' && obj[i+6].type === 'COMPONENT') {
            let list = [obj[i].word,obj[i+1].word,obj[i+2].word,obj[i+3].word,obj[i+4].word,obj[i+5].word,obj[i+6].word];
            let snippet = [];
            let index = list.length-1;
            while (index > -1) {
              let shortString = snippet.join(' ') + this.stripCommonWords(list[index]);
              let longString = snippet.join(' ') + list[index];
              if (strip && shortString.length < 30) {
                snippet.push(this.stripCommonWords(list[index]));
                index--;
                continue;
              }
              else if (longString.length < 30) {
                snippet.push(list[index]);
                index--;
                continue;
              }
              break;
            }
            if (strip) {
              components.push({long: this.stripCommonWords(list.join(' ')), short: snippet.reverse().join(' ').replace(/\s+/g,' ').trim()});
            }
            else {
              components.push({long: list.join(' '), short: snippet.reverse().join(' ').replace(/\s+/g,' ').trim()});
            }
            i += 6;
            continue;
          }
        }
        if (i < obj.length-4) {
          if (obj[i].type === 'COMPONENT' && obj[i+1].type === 'NONCOMPONENT' && obj[i+2].type === 'COMPONENT' && obj[i+3].type === 'NONCOMPONENT' && obj[i+4].type === 'COMPONENT') {
            let list = [obj[i].word,obj[i+1].word,obj[i+2].word,obj[i+3].word,obj[i+4].word];
            let snippet = [];
            let index = list.length-1;
            while (index > -1) {
              let shortString = snippet.join(' ') + this.stripCommonWords(list[index]);
              let longString = snippet.join(' ') + list[index];
              if (strip && shortString.length < 30) {
                snippet.push(this.stripCommonWords(list[index]));
                index--;
                continue;
              }
              else if (longString.length < 30) {
                snippet.push(list[index]);
                index--;
                continue;
              }
              break;
            }
            if (strip) {
              components.push({long: this.stripCommonWords(list.join(' ')), short: snippet.reverse().join(' ').replace(/\s+/g,' ').trim()});
            }
            else {
              components.push({long: list.join(' '), short: snippet.reverse().join(' ').replace(/\s+/g,' ').trim()});
            }
            i += 4;
            continue;
          }
        }
        if (i < obj.length-2) {
          if (obj[i].type === 'COMPONENT' && obj[i+1].type === 'NONCOMPONENT' && obj[i+2].type === 'COMPONENT') {
            let list = [obj[i].word,obj[i+1].word,obj[i+2].word];
            let snippet = [];
            let index = list.length-1;
            while (index > -1) {
              let shortString = snippet.join(' ') + this.stripCommonWords(list[index]);
              let longString = snippet.join(' ') + list[index];
              if (strip && shortString.length < 30) {
                snippet.push(this.stripCommonWords(list[index]));
                index--;
                continue;
              }
              else if (longString.length < 30) {
                snippet.push(list[index]);
                index--;
                continue;
              }
              break;
            }
            if (strip) {
              components.push({long: this.stripCommonWords(list.join(' ')), short: snippet.reverse().join(' ').replace(/\s+/g,' ').trim()});
            }
            else {
              components.push({long: list.join(' '), short: snippet.reverse().join(' ').replace(/\s+/g,' ').trim()});
            }
            i += 2;
            continue;
          }
        }
      }
      return components;
    },

    swap: function(obj,spin) {
      if (!obj || typeof obj !== 'object') {
        console.log('No sentence object found.');
        return;
      }
      let swappedObjects = [];
      for (let i = 0; i < obj.length; i++) {
        let phrase = [];
        if (obj[i].type === 'COMPONENT') {
          this.searchAndReplaceDictionary(obj[i],phrase,spin);
          let newObject = {
            word: phrase.join(' '),
            type: 'COMPONENT',
            pos: obj[i].pos
          }
          swappedObjects.push(newObject);
        }
        else {
          this.searchAndReplacePhrases(obj[i],phrase,spin);
          let newObject = {
            word: phrase.join(' '),
            type: obj[i].type,
            pos: obj[i].pos
          }
          swappedObjects.push(newObject);
        }
      }
      let mergedObjects = [];
      for (let i = 0; i < swappedObjects.length; i++) {
        let index = mergedObjects.length-1 || 0;
        if (mergedObjects[index] && mergedObjects[index].type === 'COMPONENT' && (swappedObjects[i].type === 'COMPONENT' || swappedObjects[i].type === 'DETERMINER')) {
          mergedObjects[index].word += ' ' + swappedObjects[i].word;
        }
        else if (mergedObjects[index] && mergedObjects[index].type === 'NONCOMPONENT' && (swappedObjects[i].type === 'PREPOSITION' || swappedObjects[i].type === 'CONJUNCTION' || swappedObjects[i].type === 'VERB')) {
          mergedObjects[index].word += ' ' + swappedObjects[i].word;
        }
        else {
          if (swappedObjects[i].type === 'DETERMINER' || swappedObjects[i].type === 'COMPONENT') {
            mergedObjects.push({word: swappedObjects[i].word, type: 'COMPONENT'});
          }
          else if (swappedObjects[i].type === 'PREPOSITION' || swappedObjects[i].type === 'CONJUNCTION' || swappedObjects[i].type === 'VERB') {
            mergedObjects.push({word: swappedObjects[i].word, type: 'NONCOMPONENT'});
          }
          else if (swappedObjects[i].type === 'PUNCTUATION') {
            mergedObjects.push({word: swappedObjects[i].word, type: 'PUNCTUATION'});
          }
        }
      }
      return mergedObjects;
    },

    prettyPrint: function(sentence,spin,strip,randomize) {
      if (!sentence || typeof sentence !== 'string') {
        console.log('Unable to print sentence.');
        return;
      }
      let obj = this.splitStopwords(sentence);
      let swapped = this.swap(obj,spin);
      let components = randomize ? shuffle(this.findComponents(swapped,strip)) : this.findComponents(swapped,strip);
      if (components.length) {
        let sentencesToPrint = [];
        for (let i = 0; i < components.length; i++) {
          let punc = this.isQuestion(components[i].long) ? '?' : '.';
          let component = components[i].long[0].toUpperCase() + components[i].long.slice(1) + punc;
          sentencesToPrint.push(component);
        }
        return sentencesToPrint.join(' ') + '\n';
      }
      return '';
    },

    prettyPrintList: function(sentence,spin,strip,randomize) {
      if (!sentence || typeof sentence !== 'string') {
        console.log('Unable to print sentence.');
        return;
      }
      let obj = this.splitStopwords(sentence);
      let swapped = this.swap(obj,spin);
      let components = randomize ? shuffle(this.findComponents(swapped,strip)) : this.findComponents(swapped,strip);
      if (components.length) {
        let sentencesToPrint = [];
        for (let i = 0; i < components.length; i++) {
          let punc = this.isQuestion(components[i].long) ? '?' : '.';
          let component = '- ' + components[i].long[0].toUpperCase() + components[i].long.slice(1) + punc;
          sentencesToPrint.push(component);
        }
        return sentencesToPrint.join('\n') + '\n';
      }
      return '';
    },

    prettyPrintSnippet: function(sentence,spin,strip,randomize) {
      if (!sentence || typeof sentence !== 'string') {
        console.log('Unable to print sentence.');
        return;
      }
      let obj = this.splitStopwords(sentence);
      let swapped = this.swap(obj,spin);
      let components = randomize ? shuffle(this.findComponents(swapped,strip)) : this.findComponents(swapped,strip);
      if (components.length) {
        for (let i = 0; i < components.length; i++) {
          if (!components[i].short.length || components[i].short.length > 30) {
            continue;
          }
          let punc = this.isQuestion(components[i].long) ? '?' : '';
          let component = components[i].short[0].toUpperCase() + components[i].short.slice(1) + punc;
          return component;
        }
      }
      return '';
    },

    prettyPrintSnippets: function(sentence,spin,strip,randomize) {
      if (!sentence || typeof sentence !== 'string') {
        console.log('Unable to print sentence.');
        return;
      }
      let obj = this.splitStopwords(sentence);
      let swapped = this.swap(obj,spin);
      let components = randomize ? shuffle(this.findComponents(swapped,strip)) : this.findComponents(swapped,strip);
      if (components.length) {
        let items = [];
        for (let i = 0; i < components.length; i++) {
          if (!components[i].short.length || components[i].short.length > 30) {
            continue;
          }
          let punc = this.isQuestion(components[i].long) ? '?' : '';
          items.push(components[i].short[0].toUpperCase() + components[i].short.slice(1) + punc);
        }
        return items;
      }
      return [];
    },

};
