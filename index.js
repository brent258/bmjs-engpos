const rand = require('bmjs-random');
const shuffle = require('bmjs-shuffle');
const dict = require('./lib/dictionary/dictionary.js');
const temp = require('./lib/templates/templates.js');
const Tag = require('en-pos').Tag;

module.exports = {

  thesaurusOptions: {
    adjective: false,
    noun: false,
    verb: false,
    adverb: false,
    preposition: false,
    conjunction: false,
    determiner: false,
    modal: false
  },

  init: function() {
    this.thesaurusOptions.adjective = true;
    this.thesaurusOptions.noun = true;
    this.thesaurusOptions.verb = true;
    this.thesaurusOptions.adverb = true;
    this.thesaurusOptions.preposition = true;
    this.thesaurusOptions.conjunction = true;
    this.thesaurusOptions.determiner = true;
    this.thesaurusOptions.modal = true;
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
        case 'preposition':
        this.thesaurusOptions.preposition = false;
        break;
        case 'conjunction':
        this.thesaurusOptions.conjunction = false;
        break;
        case 'determiner':
        this.thesaurusOptions.determiner = false;
        break;
        case 'modal':
        this.thesaurusOptions.modal = false;
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
    .replace(/\s+(\-)\s+/g,' $1 ')
    .replace(/\s+\"(.+)\"\s+/g,' "*<* $1 *>*" ')
    .replace(/\s+\((.+)\)\s+/g,' (*<* $1 *>*) ')
    .replace(/([\w]+)(\.|\,|\!|\?|\;+)/g,'$1 *>*$2')
    .replace(/\s+/g,'|||||')
    .replace(/\|\|\|\|\|\|\|\|\|\|/g,'|||||');
    let parsedSentenceSplit = parsedSentence.split('|||||');
    let tags = new Tag(parsedSentenceSplit).initial().smooth().tags;
    let parsedTags = [];
    for (let i = 0; i < tags.length; i++) {
      if (!parsedSentenceSplit[i].match(/[a-zA-Z0-9]/)) {
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

  matchTag: function(pos,override) {
    if (!pos || typeof pos !== 'string') {
      console.log('Unable to find tag without part of speech tag.');
      return;
    }
    switch (pos) {
      case 'VB':
      case 'VBP':
      case 'VBZ':
      case 'VBD':
      case 'VBN':
      case 'VBG':
      if (this.thesaurusOptions.verb || override) {
        return 'verb';
      }
      case 'NN':
      case 'NNS':
      case 'NNP':
      case 'NNPS':
      case 'PRP':
      if (this.thesaurusOptions.noun || override) {
        return 'noun';
      }
      case 'JJ':
      case 'JJR':
      case 'JJS':
      if (this.thesaurusOptions.adjective || override) {
        return 'adjective';
      }
      case 'RB':
      case 'RBR':
      case 'RBS':
      if (this.thesaurusOptions.adverb || override) {
        return 'adverb';
      }
      case 'IN':
      if (this.thesaurusOptions.preposition || override) {
        return 'preposition';
      }
      case 'CC':
      if (this.thesaurusOptions.conjunction || override) {
        return 'conjunction';
      }
      case 'DT':
      case 'PRP$':
      if (this.thesaurusOptions.determiner || override) {
        return 'determiner';
      }
      case 'MD':
      if (this.thesaurusOptions.modal || override) {
        return 'modal';
      }
      default: return undefined;
    }
  },

  replace: function(sentenceObject,spin) {
    if (!sentenceObject || typeof sentenceObject !== 'object' || !sentenceObject.words || !sentenceObject.tags || sentenceObject.words.length !== sentenceObject.tags.length) {
      console.log('No sentence object found to replace.');
      return;
    }
    if (spin === undefined) spin = true;
    let swappedWords = [];
    for (let i = 0; i < sentenceObject.tags.length; i++) {
      let phrase = [];
      if (sentenceObject.tags[i] !== 'PUNC') {
        let letter = sentenceObject.words[i][0].toLowerCase();
        let uppercased = sentenceObject.words[i][0].match(/[A-Z]/) ? true : false;
        let search = uppercased ? sentenceObject.words[i].toLowerCase() : sentenceObject.words[i];
        let synonyms = dict[letter];
        let result;
        let key = this.matchTag(sentenceObject.tags[i]);
        if (spin && synonyms && synonyms[search] && synonyms[search][key]) {
          if (synonyms[search][key].senses.length && synonyms[search][key].senses.length < 2) {
            result = rand(...synonyms[search][key].all);
          }
          else if (synonyms[search][key].common.length > 1) {
            result = rand(...synonyms[search][key].common);
          }
          else if (synonyms[search][key].senses.length && synonyms[search][key].senses.length < 5) {
            result = rand(...synonyms[search][key].senses[0]);
          }
          else {
            result = search;
          }
        }
        else {
          result = search;
        }
        if (uppercased && result.length > 1) {
          swappedWords.push(result[0].toUpperCase() + result.slice(1));
        }
        else if (uppercased) {
          swappedWords.push(result.toUpperCase());
        }
        else {
          swappedWords.push(result);
        }
      }
      else {
        swappedWords.push(sentenceObject.words[i]);
      }
    }
    return {words: swappedWords, tags: sentenceObject.tags};
  },

  spin: function(sentence) {
    if (!sentence || typeof sentence !== 'string') {
      console.log('No sentence found to spin.');
      return;
    }
    let obj = this.split(sentence);
    let replacedObj = this.replace(obj,true);
    let joinedObj = this.join(replacedObj);
    return joinedObj;
  },

  capitalcase: function(phrase) {
    if (!phrase || typeof phrase !== 'string') {
      console.log('Unable to convert into capitalcase without phrase string.');
      return;
    }
    if (phrase.length > 1) {
      return phrase[0].toUpperCase() + phrase.slice(1);
    }
    else {
      return phrase.toUpperCase();
    }
  },

  titlecase: function(phrase) {
    if (!phrase || typeof phrase !== 'string') {
      console.log('Unable to convert into titlecase without phrase string.');
      return;
    }
    let obj = this.split(phrase);
    let words = obj.words.map(el => {
      if (el.length > 1) {
        return this.capitalcase(el);
      }
      else {
        return el.toUpperCase();
      }
    });
    let joinedObj = this.join({words: words, tags: obj.tags});
    return joinedObj;
  },

  components: function(sentenceObject) {
    if (!sentenceObject || typeof sentenceObject !== 'object' || !sentenceObject.words || !sentenceObject.tags || sentenceObject.words.length !== sentenceObject.tags.length) {
      console.log('No sentence object found to search for components.');
      return [];
    }
    let phrases = [];
    let filteredObject = {words: [], tags: []};
    for (let i = 0; i < sentenceObject.words.length; i++) {
      if (sentenceObject.tags[i] !== 'PUNC') {
        filteredObject.words.push(sentenceObject.words[i]);
        filteredObject.tags.push(sentenceObject.tags[i]);
      }
    }
    for (let i = 0; i < filteredObject.words.length; i++) {
      let matched = false;
      if (i < filteredObject.tags.length-2) {
        if (this.matchTag(filteredObject.tags[i],true) === 'adverb' && this.matchTag(filteredObject.tags[i+1],true) === 'adjective' && this.matchTag(filteredObject.tags[i+2],true) === 'noun') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'adverb' && this.matchTag(filteredObject.tags[i+1],true) === 'verb' && this.matchTag(filteredObject.tags[i+2],true) === 'noun') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'verb' && this.matchTag(filteredObject.tags[i+1],true) === 'determiner' && this.matchTag(filteredObject.tags[i+2],true) === 'noun') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'verb' && this.matchTag(filteredObject.tags[i+1],true) === 'adjective' && this.matchTag(filteredObject.tags[i+2],true) === 'noun') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'modal' && this.matchTag(filteredObject.tags[i+1],true) === 'verb' && this.matchTag(filteredObject.tags[i+2],true) === 'adverb') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'modal' && this.matchTag(filteredObject.tags[i+1],true) === 'verb' && this.matchTag(filteredObject.tags[i+2],true) === 'noun') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'modal' && this.matchTag(filteredObject.tags[i+1],true) === 'verb' && this.matchTag(filteredObject.tags[i+2],true) === 'adjective') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'adjective' && this.matchTag(filteredObject.tags[i+1],true) === 'preposition' && this.matchTag(filteredObject.tags[i+2],true) === 'noun') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'adjective' && this.matchTag(filteredObject.tags[i+1],true) === 'adjective' && this.matchTag(filteredObject.tags[i+2],true) === 'noun') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'adjective' && this.matchTag(filteredObject.tags[i+1],true) === 'adverb' && this.matchTag(filteredObject.tags[i+2],true) === 'noun') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'adjective' && this.matchTag(filteredObject.tags[i+1],true) === 'conjunction' && this.matchTag(filteredObject.tags[i+2],true) === 'adjective') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'noun' && this.matchTag(filteredObject.tags[i+1],true) === 'noun' && this.matchTag(filteredObject.tags[i+2],true) === 'noun') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'determiner' && this.matchTag(filteredObject.tags[i+1],true) === 'adjective' && this.matchTag(filteredObject.tags[i+2],true) === 'noun') {
          matched = true;
        }
        if (matched) {
          let phrase = filteredObject.words[i] + ' ' + filteredObject.words[i+1] + ' ' + filteredObject.words[i+2];
          phrases.push(this.capitalcase(phrase));
          i += 2;
        }
      }
      if (i < filteredObject.tags.length-1 && !matched) {
        if (this.matchTag(filteredObject.tags[i],true) === 'adjective' && this.matchTag(filteredObject.tags[i+1],true) === 'noun') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'adjective' && this.matchTag(filteredObject.tags[i+1],true) === 'adverb') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'adverb' && this.matchTag(filteredObject.tags[i+1],true) === 'adjective') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'adverb' && this.matchTag(filteredObject.tags[i+1],true) === 'verb') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'verb' && this.matchTag(filteredObject.tags[i+1],true) === 'adjective') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'verb' && this.matchTag(filteredObject.tags[i+1],true) === 'noun') {
          matched = true;
        }
        if (matched) {
          let phrase = filteredObject.words[i] + ' ' + filteredObject.words[i+1];
          phrases.push(this.capitalcase(phrase));
          i += 1;
        }
      }
    }
    return phrases;
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
    if (phrase.match(/^(how|why|when|what|which)\s(do|does|did|doesn\'t|didn\'t|don\'t|have|has|had|haven\'t|hadn\'t|hasn\'t|is|are|was|were|isn\'t|aren\'t|wasn\'t|weren\'t|can|might|may|will|would|could|should|can\'t|mightn\'t|won\'t|wouldn\'t|couldn\'t|shouldn\'t)/gi)) {
      return true;
    }
    return false;
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
