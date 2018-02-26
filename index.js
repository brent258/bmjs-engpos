const rand = require('bmjs-random');
const dict = require('./lib/dictionary/dictionary.js');
const temp = require('./lib/templates/templates.js');
const Tag = require('en-pos').Tag;
const shuffle = require('bmjs-shuffle');

module.exports = {

  thesaurusOptions: {},

  init: function() {
    this.thesaurusOptions.adjective = true;
    this.thesaurusOptions.noun = true;
    this.thesaurusOptions.verb = true;
    this.thesaurusOptions.adverb = true;
  },

  unset: function(options) {
    if (!options || !options.length || (typeof options === 'object' && !options[0])) {
      return;
    }
    if (typeof options === 'string') {
      options = [options];
    }
    for (let i = 0; i < options.length; i++) {
      switch (options[i].toLowerCase()) {
        case 'adjective':
        this.thesaurusOptions.adjective = false;
        break;
        case 'verb':
        this.thesaurusOptions.verb = false;
        break;
        case 'adverb':
        this.thesaurusOptions.adverb = false;
        break;
        case 'noun':
        this.thesaurusOptions.noun = false;
        break;
      }
    }
  },

  split: function(sentence) {
    if (!sentence || typeof sentence !== 'string') {
      console.log('No sentence found to split.');
      return;
    }
    let parsedSentence = sentence
    .replace(/\s+(\-)\s+/g,'|||||$1|||||')
    .replace(/([\w]+)(\.|\,|\!|\?|\;+)/g,'$1|||||*>*$2')
    .replace(/\s+(\")(.+)(\")\s+/g,'|||||$1*<*|||||$2|||||*>*$3|||||')
    .replace(/\s+(\()(.+)(\))\s+/g,'|||||$1*<*|||||$2|||||*>*$3|||||')
    .replace(/([A-Za-z]+\-)\|\|\|\|\|/g,'$1')
    .replace(/\s+/g,'|||||')
    .replace(/\|\|\|\|\|\|\|\|\|\|/g,'|||||');
    let parsedSentenceSplit = parsedSentence.split('|||||');
    let tags = new Tag(parsedSentenceSplit).initial().smooth().tags;
    let parsedTags = [];
    for (let i = 0; i < tags.length; i++) {
      if (!parsedSentenceSplit[i].match(/[a-zA-Z]/)) {
        parsedTags.push('PUNC');
      }
      else {
        parsedTags.push(tags[i]);
      }
    }
    return {words: parsedSentenceSplit, tags: parsedTags};
  },

  join: function(sentenceObject) {
    if (!sentenceObject || typeof sentenceObject !== 'object' || !sentenceObject.words) {
      console.log('No sentence object found to join.');
      return;
    }
    let sentence = sentenceObject.words.join(' ');
    sentence = sentence
    .replace(/\s\*\>\*/g,'')
    .replace(/\*\<\*\s/g,'')
    return sentence;
  },

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

    matchTag: function(pos) {
      if (!pos || typeof pos !== 'string') {
        console.log('Unable to find tag without part of speech tag.');
        return;
      }
      switch (pos.toUpperCase()) {
        case 'VB':
        case 'VBP':
        case 'VBZ':
        case 'VBD':
        case 'VBN':
        case 'VBG':
        if (this.thesaurusOptions.verb) {
          return 'verb';
        }
        case 'NN':
        case 'NNS':
        case 'NNP':
        case 'NNPS':
        if (this.thesaurusOptions.noun) {
          return 'noun';
        }
        case 'JJ':
        case 'JJR':
        case 'JJS':
        if (this.thesaurusOptions.adjective) {
          return 'adjective';
        }
        case 'RB':
        case 'RBR':
        case 'RBS':
        if (this.thesaurusOptions.adverb) {
          return 'adverb';
        }
        default: return undefined;
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
      let key = this.matchTag(searchObject.pos);
      if (spin && synonyms && synonyms[search] && synonyms[search][key]) {
        if (synonyms[search][key].senses.length && synonyms[search][key].senses.length < 5) {
          result = rand(...synonyms[search][key].all);
        }
        else {
          if (synonyms[search][key].common.length > 5) {
            result = rand(...synonyms[search][key].common);
          }
          else {
            result = rand(...synonyms[search][key].senses[0]);
          }
        }
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
      if (phrase.match(/^(how|why|when|what|which)*\s*(do|does|did|doesn\'t|didn\'t|don\'t|have|has|had|haven\'t|hadn\'t|hasn\'t|is|are|was|were|isn\'t|aren\'t|wasn\'t|weren\'t|can|might|may|will|would|could|should|can\'t|mightn\'t|won\'t|wouldn\'t|couldn\'t|shouldn\'t)/gi)) {
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

    validateSentence: function(sentence) {
      if (!sentence || typeof sentence !== 'string') {
        console.log('Unable to detect sentence for validation.');
        return;
      }
      if (!(sentence.match(dict.PrepositionSearch.singleRegex) || sentence.match(dict.ConjunctionSearch.singleRegex) || sentence.match(dict.DeterminerSearch.singleRegex))) return false;
      if (sentence.match(dict.VerbSearch.commonRegex) || sentence.match(dict.VerbSearch.contractionRegex)) return true;
      return false;
    },

    keywordType: function(keyword) {
      if (!keyword || typeof keyword !== 'string') {
        console.log('Unable to detect keyword to check for type.');
        return;
      }
      if (this.isQuestion(keyword)) return 'QUESTION';
      let wordSplit = keyword.split(' ');
      if (wordSplit.includes('and') || wordSplit.includes('or')) return 'PLURAL';
      let tags = new Tag(wordSplit).initial().smooth().tags;
      if (tags.indexOf('WRB') === 0) return 'SINGULAR';
      if (tags.indexOf('VB') === 0) return 'VERB';
      if (tags.indexOf('VBG') === 0 || wordSplit[0].match(/[a-z]+ing$/)) return 'GERUND';
      if (tags.includes('NN') && tags.includes('NNS')) {
        if (tags.indexOf('TO') > tags.indexOf('NN') && tags.indexOf('TO') < tags.indexOf('NNS')) return 'SINGULAR';
        if (tags.indexOf('TO') > tags.indexOf('NNS') && tags.indexOf('TO') < tags.indexOf('NN')) return 'PLURAL';
        if (tags.indexOf('IN') > tags.indexOf('NN') && tags.indexOf('IN') < tags.indexOf('NNS')) return 'SINGULAR';
        if (tags.indexOf('IN') > tags.indexOf('NNS') && tags.indexOf('IN') < tags.indexOf('NN')) return 'PLURAL';
        if (tags.indexOf('CC') > tags.indexOf('NN') && tags.indexOf('CC') < tags.indexOf('NNS')) return 'SINGULAR';
        if (tags.indexOf('CC') > tags.indexOf('NNS') && tags.indexOf('CC') < tags.indexOf('NN')) return 'PLURAL';
        if (tags.indexOf('WDT') > tags.indexOf('NN') && tags.indexOf('WDT') < tags.indexOf('NNS')) return 'SINGULAR';
        if (tags.indexOf('WDT') > tags.indexOf('NNS') && tags.indexOf('WDT') < tags.indexOf('NN')) return 'PLURAL';
        if (tags.indexOf('NN') > tags.indexOf('NNS')) return 'SINGULAR';
        if (tags.indexOf('NNS') > tags.indexOf('NN')) return 'PLURAL';
      }
      else if (tags.includes('NN')) {
        return 'SINGULAR';
      }
      else if (tags.includes('NNS')) {
        return 'PLURAL';
      }
      return 'SINGULAR';
    },

    templateFromKeyword: function(keyword) {
      switch (keyword) {
        case 'tips':
          return temp.tips;
        default: return temp.tips;
      }
    },

    numberFromInt: function(int) {
      switch (int) {
        case 1:
        return rand('one','1');
        case 2:
        return rand('two','2');
        case 3:
        return rand('three','3');
        case 4:
        return rand('four','4');
        case 5:
        return rand('five','5');
        case 6:
        return rand('six','6');
        case 7:
        return rand('seven','7');
        case 8:
        return rand('eight','8');
        case 9:
        return rand('nine','9');
        case 10:
        return rand('ten','10');
        case 11:
        return rand('eleven','11');
        case 12:
        return rand('twelve','12');
        case 13:
        return rand('thirteen','13');
        case 14:
        return rand('fourteen','14');
        case 15:
        return rand('fifteen','15');
        case 16:
        return rand('sixteen','16');
        case 17:
        return rand('seventeen','17');
        case 18:
        return rand('eighteen','18');
        case 19:
        return rand('ninteen','19');
        case 20:
        return rand('twenty','20');
        default: return '' + int;
      }
    },

    titlecase: function(phrase) {
      if (!phrase || typeof phrase !== 'string') {
        console.log('Unable to convert into titlecase without string.');
        return;
      }
      return phrase.split(' ').map(el => {
        if (el.length > 1) {
          return el[0].toUpperCase() + el.slice(1);
        }
        else {
          return el.toUpperCase();
        }
      }).join(' ');
    },

    title: function(keyword,int,type) {
      if (!keyword || !int || typeof keyword !== 'string' || typeof int !== 'number') {
        console.log('Invalid arguments for generating title.');
        return;
      }
      let temp = this.templateFromKeyword(type);
      let noun = int > 1 ? rand(...temp.plural) : rand(...temp.singular);
      if (keyword.includes(' ' + noun) || keyword.includes(noun + ' ')) noun = '';
      let adj = rand(...temp.adjective);
      let num = adj.includes('the ') ? this.numberFromInt(int) + ' of' : this.numberFromInt(int);
      let typeOfKeyword = this.keywordType(keyword);
      let generatedTitle = '';
      switch (typeOfKeyword) {
        case 'VERB':
          generatedTitle = rand(
            `${num} ${adj} ${noun} to ${keyword}`,
            `${keyword} - ${num} ${adj} ${noun}`,
            `${num} ${noun} to ${keyword}`,
            `${keyword} - ${num} ${noun}`
          );
          break;
        case 'GERUND':
          generatedTitle = rand(
            `${num} ${adj} ${noun} for ${keyword}`,
            `${keyword} - ${num} ${adj} ${noun}`,
            `${num} ${noun} for ${keyword}`,
            `${keyword} - ${num} ${noun}`
          );
          break;
        case 'QUESTION':
          generatedTitle = rand(
            `${num} ${adj} ${noun} for ${keyword}?`,
            `${keyword}? ${num} ${adj} ${noun}`,
            `${num} ${noun} for ${keyword}?`,
            `${keyword}? ${num} ${noun}`,
            `${keyword}?`
          );
          break;
        default:
          if (noun) {
            generatedTitle = rand(
              `${num} ${adj} ${keyword} ${noun}`,
              `${keyword} - ${num} ${adj} ${noun}`,
              `${num} ${keyword} ${noun}`,
              `${keyword} - ${num} ${noun}`
            );
          }
          else {
            generatedTitle = rand(
              `${num} ${adj} ${keyword}`,
              `${keyword} - ${num} ${adj} ${noun}`,
              `${num} ${keyword}`,
              `${keyword} - ${num} ${noun}`
            );
          }
          break;
        }
        return this.titlecase(generatedTitle);
    }

};
