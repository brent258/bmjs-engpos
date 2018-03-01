const rand = require('bmjs-random');
const shuffle = require('bmjs-shuffle');

module.exports = {
  adjective: ['useful','helpful','important','critical','the most important','the top','top','best','the best'],
  singular: ['tip','idea','thing to keep in mind','thing to consider'],
  plural: ['tips','ideas','things to keep in mind','things to consider'],
  uncountable: ['guidance','advice','info','information'],
  intro: function(keywordList,plural,determiner,nounType) {
    if (!keywordList || !keywordList.length) {
      console.log('Unable to generate intro text for tips template without keyword list.');
      return;
    }
    if (keywordList.length === 1) {
      keywordList.push(keywordList[0]);
      keywordList.push(keywordList[0]);
    }
    keywordList = shuffle(keywordList);
    let keywordOne = keywordList[0];
    let keywordTwo = keywordList[1];
    let keywordThree = keywordList[2];
    if (plural === undefined) plural = false;
    determiner = (determiner === 'the' || determiner === 'a') ? determiner : '';
    if (determiner) {
      keywordOne = determiner + ' ' + keywordOne;
      keywordTwo = determiner + ' ' + keywordTwo;
      keywordThree = determiner + ' ' + keywordThree;
      keywordOne = keywordOne.replace(/^a\s(a|e|i|o|u)/i,'an $1').replace(/^an\s(uni|eu)/i,'a $1');
      keywordTwo = keywordTwo.replace(/^a\s(a|e|i|o|u)/i,'an $1').replace(/^an\s(uni|eu)/i,'a $1');
      keywordThree = keywordThree.replace(/^a\s(a|e|i|o|u)/i,'an $1').replace(/^an\s(uni|eu)/i,'a $1');
    }
    let lineOne = [
      `${keywordOne} ${plural ? 'are' : 'is'} ${nounType ? nounType : rand('something','a topic','one of those things','a thing','a subject','an area')} ${rand('many','a lot of','a good number of','a great number of','a great deal of','a good deal of')} people ${rand('need help with','are interested in','could use some help with','may need help with','may need assistance for','could need more information on','could use some more info on','need to find out more about')}.`,
      `${nounType ? nounType : rand('something','a topic','one of those things','a thing','a subject','an area')} ${rand('many','a lot of','a good number of','a great number of','a great deal of','a good deal of')} people ${rand('need help with','are interested in','could use some help with','may need help with','may need assistance for','could need more information on','could use some more info on','need to find out more about')} is ${keywordOne}.`,
    ];
    let lineTwo = [
      `${rand('here are','these are','this video goes through','this video features','today we go through','this video talks about','in this video we talk about','the following are')} ${rand('some of the','a few of the','some','a few')} ${rand('top tips','important things to consider','things to keep in mind')} ${rand('to help you get started with','to get you on your way with','to help with','to help out with','to point you in the right direction with','to put you on a good path with')} ${keywordTwo}.`,
      `${rand('some of the','a few of the','some','a few')} ${rand('top tips','important things to consider','things to keep in mind')} ${rand('to help you get started with','to get you on your way with','to help with','to help out with','to point you in the right direction with','to put you on a good path with')} ${keywordTwo} ${rand('are gone through in this video','are featured in this video','are gone through by us today','are talked about in this video','are talked about by us in this video','we go through today','are featured today')}.`,
    ];
    let lineThree = [
      `${rand('please share','please leave a comment and share this video','please share this video','please like and share','please comment and share','please like and share this video')} with ${rand('anyone interested in','anyone who might need help with','anybody who might be interested in','anyone who needs to know more about')} ${keywordThree}!`,
      `${rand('please leave a comment','please like and leave a comment','please share and leave a comment')} ${rand('with your own tips for','if you have anymore tips for','with your own ideas about','if you have anything to add on','if you have any further advice about','if you have anything else to say about','if you have your own ideas about')} ${keywordThree}!`,
    ];
    return {lineOne: rand(...lineOne), lineTwo: rand(...lineTwo), lineThree: rand(...lineThree)};
  }
};
