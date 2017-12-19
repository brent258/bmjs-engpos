const rand = require('bmjs-random');
const dict = require('./lib/dictionary.js');

module.exports = {

  splitStopwords: function(sentence) {
      if (!sentence || typeof sentence !== 'string') {
        return;
      }
      let filteredPhrases = sentence;
      for (let i = 0; i < dict.PrepositionSearch.phrases.length; i++) {
        filteredPhrases = filteredPhrases.replace(dict.PrepositionSearch.phrases[i].search,dict.PrepositionSearch.phrases[i].replace);
      }
      filteredPhrases = filteredPhrases.replace(dict.PrepositionSearch.singleRegex,'|||||$1$2$3|||||')
      .replace(dict.PrepositionSearch.multiRegex,'|||||$1$2|||||')
      .replace(dict.VerbSearch.commonRegex,'|||||$2|||||')
      .replace(/(\,|\:|\-)/g,'|||||$1')
      .replace(/(\.|\?|\!)/g,'|||||$1')
      .replace(/\s*\|\|\|\|\|\s*/g,'|||||')
      .replace(/\|\|\|\|\|\|\|\|\|\|/g,'|||||');
      let filteredPhrasesArray = filteredPhrases.split('|||||');
      let stopwords = [];
      for (let i = 0; i < filteredPhrasesArray.length; i++) {
        let obj = {};
        if (filteredPhrasesArray[i].match(dict.PrepositionSearch.singleRegex) || filteredPhrasesArray[i].match(dict.PrepositionSearch.multiRegex)) {
          obj.word = filteredPhrasesArray[i].replace(/_/g,' ');
          obj.type = 'PREPOSITION';
          stopwords.push(obj);
        }
        else {
          obj.word = filteredPhrasesArray[i];
          obj.type = 'COMPONENT';
          stopwords.push(obj);
        }
      }
      return stopwords;
    },
};
