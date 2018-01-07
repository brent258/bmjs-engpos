const fs = require('fs');
const thesaurus = require('./collins.js');

module.exports.search = function(sourceFilename,saveFilename) {
  if (!sourceFilename || !saveFilename || typeof sourceFilename !== 'string' || typeof saveFilename !== 'string') {
    throw new Error('Unable to build source without input and output filenames.');
  }
  try {
    let data = fs.readFileSync(sourceFilename,'utf8');
    let parsedData = data.replace(/\n/g,'').replace(/;\s*([A-Za-z\s]*informal|North\sAmerican|rare|literary|Scottish|Latin|British|South\sAfrican|archaic)\s*/gi,', ').replace(/;/g,', ').replace(/[^a-zA-Z,\s\-]/g,'').replace(/\s*,\s*/g,',').split(',').sort().filter((el,index,arr) => el.length && arr.indexOf(el) === index);
    let phrases = '';
    let singleKeywords = [];
    let multiKeywords = [];
    for (let i = 0; i < parsedData.length; i++) {
      let keyword = parsedData[i].trim().toLowerCase();
      let capitalizedKeyword = keyword[0].toUpperCase() + keyword.slice(1);
      if (keyword.match(/\s/)) {
        if (i < parsedData.length-1) {
          phrases += `\n\t\t{search: /\\b${keyword.replace(/\s/g,'\\s')}\\s/g, replace: '${keyword.replace(/\s/g,'_')} '},\n\t\t{search: /\\b${capitalizedKeyword.replace(/\s/g,'\\s')}\\s/g, replace: '${capitalizedKeyword.replace(/\s/g,'_')} '},`;
        }
        else {
          phrases += `\n\t\t{search: /\\b${keyword.replace(/\s/g,'\\s')}\\s/gi, replace: '${keyword.replace(/\s/g,'_')} '}`;
        }
        multiKeywords.push(keyword.replace(/\s/g,'_'));
        multiKeywords.push(capitalizedKeyword.replace(/\s/g,'_'));
      }
      else {
        singleKeywords.push(keyword);
        singleKeywords.push(capitalizedKeyword);
      }
    }
    singleList = singleKeywords.map(value => '\'' + value + '\'').join(',');
    multiList = multiKeywords.map(value => '\'' + value + '\'').join(',');
    let saveFile = `module.exports = {\n\tphrases: [${phrases}\n\t],\n\tsingleRegex: /(\\b)(${singleKeywords.join('|')})(\\b[^_])/gi,\n\tmultiRegex: /(\\b)(${multiKeywords.join('|')})(\\b)/gi,\n\tsingleList: [${singleList}],\n\tmultiList: [${multiList}]\n};`;
    fs.writeFile(saveFilename,saveFile,'utf8', error => {
      if (error) console.error(`Unable to build file: ${saveFilename}`);
      console.log(`Finished building file: ${saveFilename}`);
    });
  } catch (error) {
    throw error;
  }
};

module.exports.replace = function(sourceFilename,saveFilename) {
  if (!sourceFilename || !saveFilename || typeof sourceFilename !== 'string' || typeof saveFilename !== 'string') {
    throw new Error('Unable to build source without input and output filenames.');
  }
  try {
    let data = fs.readFileSync(sourceFilename,'utf8');
    let parsedData = data.replace(/,\n/g,'\n').replace(/\n\n/g,'\n').replace(/;\s*([A-Za-z\s]*informal|North\sAmerican|rare|literary|Scottish|Latin|British|South\sAfrican|archaic)\s*/gi,', ').replace(/;/g,', ').replace(/[^a-zA-Z,\s\-\n]/g,'').replace(/\s*,\s*/g,',').split('\n');
    let functions = '';
    let sortedObject = {};
    let currentProp;
    let propIndex = 1;
    for (let i = 0; i < parsedData.length; i++) {
      if (parsedData[i].trim().match(/[A-Z]+/)) {
        currentProp = parsedData[i].split(',')[0].trim().toLowerCase();
        sortedObject[currentProp] = {};
        propIndex = 1;
        sortedObject[currentProp][propIndex] = [];
        continue;
      }
      if (sortedObject[currentProp][propIndex] && typeof sortedObject[currentProp][propIndex] === 'object') {
        sortedObject[currentProp][propIndex].push(...parsedData[i].trim().toLowerCase().split(',').sort().filter((el,index,arr) => el.length));
        propIndex++
        sortedObject[currentProp][propIndex] = [];
      }
    }
    let switchCases = [];
    for (let prop in sortedObject) {
      for (let index in sortedObject[prop]) {
        if (!sortedObject[prop][index].length) {
          continue;
        }
        let obj = [prop,...sortedObject[prop][index]];
        let values = obj.sort().filter((el,index,arr) => arr.indexOf(el) === index).map(value => `'${value}'`).join(',');
        let keys = obj.sort().filter((el,index,arr) => el.match(/\s/) && arr.indexOf(el) === index).map(value => `case '${value}':`).join('\n\t\t');
        if (keys) {
          switchCases.push(`\n\t\t${keys}\n\t\t\treturn rand(...[${values}]);`);
        }
      }
    }
    switchCases = switchCases.sort().filter((el,index,arr) => arr.indexOf(el) === index).join('');
    let saveFile = `const rand = require('bmjs-random');\n\nmodule.exports = function(word) {\n\tswitch (word) {${switchCases}\n\t\tdefault: return word;\n\t}\n};`;
    fs.writeFile(saveFilename,saveFile,'utf8', error => {
      if (error) console.error(`Unable to build file: ${saveFilename}`);
      console.log(`Finished building file: ${saveFilename}`);
    });
  } catch (error) {
    throw error;
  }
};

module.exports.wordlist = function(letter,dir,linkList,wordList,index) {
  if (!letter) letter = 'a';
  if (!dir) dir = 'src';
  if (!linkList) linkList = [];
  if (!wordList) wordList = [];
  if (typeof index !== 'number') index = 0;
  if (!linkList.length) {
    thesaurus.linklist(letter).then(links => {
      linkList = links;
      this.wordlist(letter,dir,linkList,wordList,index);
    }).catch(error => console.log(error));
  }
  else {
    thesaurus.wordlist(linkList[index]).then(words => {
      console.log('Adding links at index: ' + letter + index);
      wordList.push(...words);
      index++;
      if (index < linkList.length) {
        this.wordlist(letter,dir,linkList,wordList,index);
      }
      else {
        fs.writeFile(dir+'/'+letter+'-wordlist.txt',wordList.join('\n'),'utf8',error => {
          if (error) console.log(error);
          console.log('Finished writing wordlist: ' + letter);
        });
      }
    }).catch(error => console.log(error));
  }
};

module.exports.filterWords = function(file) {
  if (!file || typeof file !== 'string') {
    throw new Error('Unable to build source without filename.');
  }
  try {
    return fs.readFileSync(file,'utf8').split('\n').filter(el => !el.match(/[^a-z\s\-]/) && !el.match(/(\ssomething\b|\ssomeone\b|\sor\s|\syour\s|\syourself\b|\soneself\b)/));
  }
  catch (error) {
    throw error;
  }
};

module.exports.getWords = function(words,letter,dir,obj,index) {
  if (!words || typeof words !== 'object') {
    throw new Error('Unable to build source without wordlist.');
  }
  if (!letter) letter = 'a';
  if (!dir) dir = 'lib';
  if (!obj) obj = {};
  if (typeof index !== 'number') index = 0;
  thesaurus.synonyms(words[index]).then(syn => {
    let kw = words[index];
    console.log('Adding keyword to dictionary: ' + kw);
    obj[kw] = syn;
    index++;
    if (index < words.length) {
      this.getWords(words,letter,dir,obj,index);
    }
    else {
      fs.writeFile(dir+'/'+letter+'-data.json',JSON.stringify(obj),error => {
        if (error) console.log(error);
        console.log('Finished writing data: ' + letter);
      });
    }
  })
  .catch(error => {
    let kw = words[index];
    console.log('Error retrieving keyword: ' + kw);
    index++;
    if (index < words.length) {
      this.getWords(words,letter,dir,obj,index);
    }
    else {
      fs.writeFile(dir+'/'+letter+'-data.json',JSON.stringify(obj),error => {
        if (error) console.log(error);
        console.log('Finished writing data: ' + letter);
      });
    }
  });

};
