const cheerio = require('cheerio');
const request = require('request-promise');

module.exports.synonyms = function(word) {
  if (!word || typeof word !== 'string') {
    console.error('Unable to search for synonyms without word.');
  }
  let options = {
    method: 'GET',
    uri: 'https://www.collinsdictionary.com/dictionary/english-thesaurus/' + word.replace(/[^A-Za-z]/g,'-'),
    gzip: true
  };
  return new Promise((resolve,reject) => {
    request(options).then(html => {
      try {
        html = html.replace(/(\s*\n\s*|\s*\r\s*)/g,'');
        let $ = cheerio.load(html);
        let sectionsCount = $('.hom').get().length;
        let section = $('.hom').first();
        let obj = {};
        for (let i = 0; i < sectionsCount; i++) {
          let txt = section.text();
          if (txt) {
            let pos = section.find('.titleType').first().text();
            if (!obj[pos]) obj[pos] = {};
            let senseCount = section.find('.sensenum').get().length || 1;
            let sense = section.find('.sense').first();
            for (let j = 0; j < senseCount; j++) {
              let txt = sense.text();
              if (txt) {
                let synonyms = sense.find('.form.type-syn .orth').map(function(i,el) {
                  return $(this).text().replace(/[^a-zA-Z\-\'\s]/g,'');
                }).get().filter(el => !el.match(/(\ssomething\b|\ssomeone\b|\sor\s|\syour\s|\syourself\b|\soneself\b)/));
                if (!synonyms.includes(word) && synonyms.length) synonyms.push(word);
                if (!obj[pos].all || !obj[pos].all.length) obj[pos].all = [];
                if (!obj[pos].senses || !obj[pos].senses.length) obj[pos].senses = [];
                if (synonyms.length) obj[pos].all.push(...synonyms);
                if (synonyms.length) obj[pos].senses.push(synonyms);
              }
              sense = sense.next('.sense');
            }
            let sortedWords = obj[pos].all.sort();
            obj[pos].all = sortedWords.filter((el,index,arr) => arr.indexOf(el) === index);
            obj[pos].common = [];
            for (let j = 0; j < sortedWords.length; j++) {
              if (j > 0 && !obj[pos].common.includes(sortedWords[j]) && sortedWords[j] === sortedWords[j-1]) {
                obj[pos].common.push(sortedWords[j]);
              }
            }
          }
          section = section.next('.hom');
        }
        if (Object.keys(obj).length) {
          resolve(obj);
        }
        else {
          reject('No object found for: ' + word);
        }
      }
      catch (error) {
        reject(error);
      }
    })
    .catch(error => reject(error));
  });
};

module.exports.linklist = function(letter) {
  if (!letter || typeof letter !== 'string') {
    console.error('Unable to search for links without letter.');
  }
  let options = {
    method: 'GET',
    uri: 'https://www.collinsdictionary.com/browse/english-thesaurus/synonyms-starting-with-' + letter.toLowerCase(),
    gzip: true
  };
  return new Promise((resolve,reject) => {
    request(options).then(html => {
      try {
        html = html.replace(/(\s*\n\s*|\s*\r\s*)/g,'');
        let $ = cheerio.load(html);
        let links = $('.columns2.browse-list li a').map(function(i,el) {
          return $(this).attr('href');
        }).get();
        resolve(links);
      }
      catch (error) {
        reject(error);
      }
    })
    .catch(error => reject(error));
  });
};

module.exports.wordlist = function(url) {
  if (!url || typeof url !== 'string') {
    console.error('Unable to search for words without url.');
  }
  let options = {
    method: 'GET',
    uri: url,
    gzip: true
  };
  return new Promise((resolve,reject) => {
    request(options).then(html => {
      try {
        html = html.replace(/(\s*\n\s*|\s*\r\s*)/g,'');
        let $ = cheerio.load(html);
        let words = $('.columns2.browse-list li a').map(function(i,el) {
          return $(this).text();
        }).get();
        resolve(words);
      }
      catch (error) {
        reject(error);
      }
    })
    .catch(error => reject(error));
  });
};
