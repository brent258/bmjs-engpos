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
        let obj = {};
        let num = $('.span.sensenum').text();
        let pos = $('span.titleType').first().text();
        let synonyms = $('.blockSyn .form.type-syn .orth').map(function(i,el) {
          return $(this).text();
        }).get().sort().filter((el,index,arr) => el.length && arr.indexOf(el) === index);
        if (!synonyms.length || num) {
          reject('Invalid search response');
        }
        obj.synonyms = synonyms;
        obj.pos = pos;
        resolve(obj);
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
