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

  replace: function(sentenceObject) {
    if (!sentenceObject || typeof sentenceObject !== 'object' || !sentenceObject.words || !sentenceObject.tags || sentenceObject.words.length !== sentenceObject.tags.length) {
      console.log('No sentence object found to replace.');
      return;
    }
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
        if (synonyms && synonyms[search] && synonyms[search][key]) {
          if (synonyms[search][key].senses.length && synonyms[search][key].senses.length < 2) {
            result = rand(...synonyms[search][key].all);
          }
          else if (synonyms[search][key].common.length > 1) {
            result = rand(...synonyms[search][key].common);
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
    let replacedObj = this.replace(obj);
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
        else if (this.matchTag(filteredObject.tags[i],true) === 'verb' && this.matchTag(filteredObject.tags[i+1],true) === 'verb' && this.matchTag(filteredObject.tags[i+2],true) === 'noun') {
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
        else if (this.matchTag(filteredObject.tags[i],true) === 'noun' && this.matchTag(filteredObject.tags[i+1],true) === 'preposition' && this.matchTag(filteredObject.tags[i+2],true) === 'noun') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'noun' && this.matchTag(filteredObject.tags[i+1],true) === 'verb' && this.matchTag(filteredObject.tags[i+2],true) === 'noun') {
          matched = true;
        }
        else if (this.matchTag(filteredObject.tags[i],true) === 'noun' && this.matchTag(filteredObject.tags[i+1],true) === 'verb' && this.matchTag(filteredObject.tags[i+2],true) === 'adjective') {
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
        else if (this.matchTag(filteredObject.tags[i],true) === 'verb' && this.matchTag(filteredObject.tags[i+1],true) === 'verb') {
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

  strip: function(phrase) {
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

  print: function(sentences,spin,strip,randomize,list) {
    if (!sentences || typeof sentences !== 'object' || !sentences[0]) {
      console.log('Unable to print sentence.');
      return [];
    }
    let lines = [];
    for (let i = 0; i < sentences.length; i++) {
      let line;
      if (spin) {
        line = this.spin(sentences[i]);
      }
      else {
        line = sentences[i];
      }
      if (strip) line = this.strip(line);
      if (!line.match(/[\.\!\?]$/g)) line += '.';
      if (!line.match(/^[A-Z]/g)) line = this.capitalcase(line);
      lines.push(line);
    }
    if (lines.length && randomize) lines = shuffle(lines);
    if (list) {
      return '- ' + lines.join('\n- ') + '\n';
    }
    else {
      return lines.join(' ') + '\n';
    }
  },

  snippet: function(sentence,spin,strip,randomize) {
    if (!sentence || typeof sentence !== 'string') {
      console.log('Unable to print snippet.');
      return '';
    }
    let lines = [];
    let obj = this.split(sentence);
    if (spin) obj = this.replace(obj);
    let components = this.components(obj);
    if (!components.length) return '';
    for (let j = 0; j < components.length; j++) {
      let line = components[j];
      if (strip) line = this.strip(line);
      if (!line.match(/^[A-Z]/g)) line = this.capitalcase(line);
      lines.push(line);
    }
    if (randomize) lines = shuffle(lines);
    return lines[0];
  },

  snippets: function(sentences,spin,strip,randomize,list) {
    if (!sentences || typeof sentences !== 'object' || !sentences[0]) {
      console.log('Unable to print sentence.');
      return [];
    }
    let lines = [];
    for (let i = 0; i < sentences.length; i++) {
      let line = this.snippet(sentences[i],spin,strip,false);
      if (!line) continue;
      if (!line.match(/[\.\!\?]$/g)) line += '.';
      lines.push(line);
    }
    if (lines.length && randomize) lines = shuffle(lines);
    if (list) {
      return '- ' + lines.join('\n- ') + '\n';
    }
    else {
      return lines.join(' ') + '\n';
    }
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

  keyword: function(type) {
    if (!type || typeof type !== 'string') {
      console.log('Unable to detect keyword to check for type.');
      return;
    }
    switch (type[0].toUpperCase()) {
      case 'S':
      return 'SINGULAR';
      case 'P':
      return 'PLURAL';
      case 'Q':
      return 'QUESTION';
      case 'V':
      return 'VERB';
      case 'G':
      return 'GERUND';
      default: return 'SINGULAR';
    }
  },

  template: function(keyword) {
    switch (keyword) {
      case 'tips':
        return temp.tips;
      case 'pitfalls':
        return temp.pitfalls;
      case 'list':
        return temp.list;
      case 'products':
        return temp.products;
      case 'review':
        return temp.review;
      case 'facts':
        return temp.facts;
      case 'guide':
        return temp.guide;
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

  title: function(keyword,type,template,int) {
    if (!keyword || typeof keyword !== 'string' || !type || typeof type !== 'string' || !template || typeof template !== 'string') {
      console.log('Invalid arguments for generating title.');
      return;
    }
    if (!int || typeof int !== 'number') int = 0;
    let keywordType = this.keyword(type);
    let temp = this.template(template);
    let adj = rand(...temp.adjective);
    let num;
    if (int) {
      num = adj.includes('the ') ? this.numberFromInt(int) + ' of' : this.numberFromInt(int);
    }
    let noun;
    let splitKeyword = keyword.split(' ');
    if (!temp.plural.length || !temp.singular.length) {
      noun = '';
    }
    else if (int === 1) {
      noun = rand(...temp.singular);
      for (let i = 0; i < splitKeyword.length; i++) {
        if (temp.singular.includes(splitKeyword[i])) {
          noun = '';
          break;
        }
      }
    }
    else {
      noun = rand(...temp.plural);
      for (let i = 0; i < splitKeyword.length; i++) {
        if (temp.plural.includes(splitKeyword[i]) || temp.uncountable.includes(splitKeyword[i])) {
          noun = '';
          break;
        }
      }
    }
    if (noun && !num && temp.uncountable.length) noun = true === rand(true,false,false,false) ? rand(...temp.uncountable) : noun;
    let generatedTitle = '';
    switch (keywordType) {
      case 'VERB':
      if (num) {
        generatedTitle = rand(
          `${num} ${adj} ${noun} to ${keyword}`,
          `${keyword} - ${num} ${adj} ${noun}`,
          `${num.replace(' of','')} ${noun} to ${keyword}`,
          `${keyword} - ${num.replace(' of','')} ${noun}`
        );
      }
      else {
        generatedTitle = rand(
          `${adj} ${noun} to ${keyword}`,
          `${keyword} - ${adj} ${noun}`,
          `${noun} to ${keyword}`,
          `${keyword} - ${noun}`
        );
      }
      break;
      case 'GERUND':
      if (num) {
        generatedTitle = rand(
          `${num} ${adj} ${noun} for ${keyword}`,
          `${keyword} - ${num} ${adj} ${noun}`,
          `${num.replace(' of','')} ${noun} for ${keyword}`,
          `${keyword} - ${num.replace(' of','')} ${noun}`
        );
      }
      else {
        generatedTitle = rand(
          `${adj} ${noun} for ${keyword}`,
          `${keyword} - ${adj} ${noun}`,
          `${noun} for ${keyword}`,
          `${keyword} - ${noun}`
        );
      }
      break;
      case 'QUESTION':
      if (num) {
        generatedTitle = rand(
          `${num} ${adj} ${noun} for ${keyword}?`,
          `${keyword}? ${num} ${adj} ${noun}`,
          `${num.replace(' of','')} ${noun} for ${keyword}?`,
          `${keyword}? ${num.replace(' of','')} ${noun}`,
          `${keyword}?`
        );
      }
      else {
        generatedTitle = rand(
          `${adj} ${noun} for ${keyword}?`,
          `${keyword}? ${adj} ${noun}`,
          `${noun} for ${keyword}?`,
          `${keyword}? ${noun}`,
          `${keyword}?`
        );
      }
      break;
      default:
      if (noun) {
        if (num) {
          generatedTitle = rand(
            `${num} ${adj} ${keyword} ${noun}`,
            `${keyword} - ${num} ${adj} ${noun}`,
            `${num.replace(' of','')} ${keyword} ${noun}`,
            `${keyword} - ${num.replace(' of','')} ${noun}`
          );
        }
        else {
          generatedTitle = rand(
            `${adj} ${keyword} ${noun}`,
            `${keyword} - ${adj} ${noun}`,
            `${keyword} ${noun}`,
            `${keyword} - ${noun}`
          );
        }
      }
      else {
        if (num) {
          generatedTitle = rand(
            `${num} ${adj} ${keyword}`,
            `${num.replace(' of','')} ${keyword}`
          );
        }
        else {
          generatedTitle = rand(
            `${adj} ${keyword}`,
            `${keyword}`
          );
        }
      }
      break;
    }
    return this.titlecase(generatedTitle);
  },

  intro: function(template,keywordList,plural,determiner,nounType) {
    if (!keywordList || typeof keywordList !== 'object' || !template || typeof template !== 'string') {
      console.log('Invalid arguments for generating intro.');
      return;
    }
    let temp = this.template(template);
    let lines = temp.intro(keywordList,plural,determiner,nounType);
    return this.capitalcase(lines.lineOne) + ' ' + this.capitalcase(lines.lineTwo) + ' ' + this.capitalcase(lines.lineThree);
  },

  tags: function(keywordList) {
    if (!keywordList || typeof keywordList !== 'object') {
      console.log('Invalid arguments for generating tags.');
      return;
    }
    keywordList = shuffle(keywordList);
    return keywordList.join(',');
  },

  promo: function(keyword,link,determiner) {
    if (!keyword || typeof keyword !== 'string' || !link || typeof link !== 'string') {
      console.log('Invalid arguments for generating promo.');
      return;
    }
    determiner = (determiner === 'the' || determiner === 'a') ? determiner : '';
    if (determiner) {
      keyword = determiner + ' ' + keyword;
      keyword = keyword.replace(/^a\s(a|e|i|o|u)/i,'an $1').replace(/^an\s(uni|eu)/i,'a $1');
    }
    let text = [
      `${rand('visit','check out','take a look at')} ${link} ${rand('to find out more about','to learn more about','if you want more info on','for more information about')} ${keyword}.`,
      `${rand('find out more about','learn more about','more info on','more information about','get more info on')} ${keyword}: ${link}`,
      `${rand('want to find out more about','want to learn more about','want more info on','want more information about','want to get more info on')} ${keyword}? ${rand('Visit','Check out','Take a look at')} ${link}`,
    ];
    return this.capitalcase(rand(...text));
  },

  license: function(copyright) {
    let text = '';
    if (!copyright) {
      text = `${rand('all images','all image contents','any and all images')} ${rand('used','included','shown','presented','published')} ${rand('in the course of','during','throughout','in','within')} this video are ${rand('permitted','allowed','acceptable','accepted')} for commercial use under Creative Commons or unrestricted licenses and ${rand('proper','correct','the right')} attribution is ${rand('given','provided','mentioned','needed')} where ${rand('required','necessary','suitable','needed')}.`;
    }
    else {
      text = `${rand('all images','all image contents','any and all images')} ${rand('used','included','shown','presented','published')} ${rand('in the course of','during','throughout','in','within')} this video are ${rand('permitted','allowed','acceptable','accepted')} for commercial use under fair use policy and ${rand('remain','stay','are')} the property of ${rand('their','the')} ${rand('respective','original')} copyright ${rand('holder','holders','owner','owners')}.`;
    }
    return this.capitalcase(text);
  },

};
