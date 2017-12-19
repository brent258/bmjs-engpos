const fs = require('fs');

module.exports.search = function(sourceFilename,saveFilename) {
  if (!sourceFilename || !saveFilename || typeof sourceFilename !== 'string' || typeof saveFilename !== 'string') {
    throw new Error('Unable to build source without input and output filenames.');
  }
  try {
    let data = fs.readFileSync(sourceFilename,'utf8');
    let parsedData = data.replace(/\n/g,'').replace(/;\s*(informal)\s*/gi,', ').replace(/[^a-zA-Z,\s\-]/g,'').replace(/\s*,\s*/g,',').split(',').sort().filter((el,index,arr) => el.length && arr.indexOf(el) === index);
    let phrases = '';
    let singleKeywords = [];
    let multiKeywords = [];
    for (let i = 0; i < parsedData.length; i++) {
      let keyword = parsedData[i].trim().toLowerCase();
      if (keyword.match(/\s/)) {
        if (i < parsedData.length-1) {
          phrases += `\n\t\t{search: /\\b${keyword.replace(/\s/g,'\\s')}\\s/gi, replace: '${keyword.replace(/\s/g,'_')} '},`;
        }
        else {
          phrases += `\n\t\t{search: /\\b${keyword.replace(/\s/g,'\\s')}\\s/gi, replace: '${keyword.replace(/\s/g,'_')} '}`;
        }
        multiKeywords.push(keyword.replace(/\s/g,'_'));
      }
      else {
        singleKeywords.push(keyword);
      }
    }
    let saveFile = `module.exports = {\n\tphrases: [${phrases}\n\t],\n\tsingleRegex: /(\\b)(${singleKeywords.join('|')})([^_])/gi,\n\tmultiRegex: /(\\b)(${multiKeywords.join('|')})/gi\n};`;
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
    let parsedData = data.replace(/\n/g,'').replace(/;\s*(informal)\s*/gi,', ').replace(/[^a-zA-Z,\s\-]/g,'').replace(/\s*,\s*/g,',').split(',').filter((el,index,arr) => el.length);
    let functions = '';
    let sortedObject = {};
    let currentProp;
    for (let i = 0; i < parsedData.length; i++) {
      if (parsedData[i].trim().match(/[A-Z]+/)) {
        currentProp = parsedData[i].trim().toLowerCase();
        sortedObject[currentProp] = [];
      }
      if (sortedObject[currentProp] && typeof sortedObject[currentProp] === 'object') {
        sortedObject[currentProp].push(parsedData[i].trim().toLowerCase());
      }
    }
    for (let prop in sortedObject) {
      let parsedArray = sortedObject[prop].sort().filter((el,index,arr) => arr.indexOf(el) === index).map(value => `'${value}'`).join(',');
      functions += `\nobj['${prop}'] = function() {\n\treturn rand(...[${parsedArray}]);\n};`;
    }
    let saveFile = `const rand = require('bmjs-random');\n\nlet obj = {};\n${functions}\n\nmodule.exports = obj;`;
    fs.writeFile(saveFilename,saveFile,'utf8', error => {
      if (error) console.error(`Unable to build file: ${saveFilename}`);
      console.log(`Finished building file: ${saveFilename}`);
    });
  } catch (error) {
    throw error;
  }
};
