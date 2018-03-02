const rand = require('bmjs-random');
const shuffle = require('bmjs-shuffle');

module.exports = {
  adjective: ['best','the best','amazing','great','greatest','most amazing','cool','coolest','good','super','superb','unbelievable','incredible','fantastic','terrific','outstanding'],
  singular: ['picture','photo','photograph','image','pic','snap','snapshot'],
  plural: ['pictures','photos','photographs','images','pics','snaps','snapshots'],
  uncountable: ['imagery'],
  intro: function(keywordList,plural,determiner,nounType) {
    if (!keywordList || !keywordList.length) {
      console.log('Unable to generate intro text for list template without keyword list.');
      return;
    }
    while (keywordList.length < 3) {
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
      `${keywordOne} ${plural ? 'are' : 'is'} ${nounType ? nounType : rand('something','a topic','one of those things','a thing','a subject','an area')} ${rand('many','a lot of','a good number of','a great number of','a great deal of','a good deal of')} people ${rand('want to know more about','are interested in learning more about','are interested in','are curious about','are searching for information about','want to learn about','are looking for')}.`,
      `${nounType ? nounType : rand('something','a topic','one of those things','a thing','a subject','an area')} ${rand('many','a lot of','a good number of','a great number of','a great deal of','a good deal of')} people ${rand('want to know more about','are interested in learning more about','are interested in','are curious about','are searching for information about','want to learn about','are looking for')} is ${keywordOne}.`,
      `${rand('looking for','interested in','are you interested in learning more about','do you want to know more about','are you curious about','are you interested in')} ${keywordOne}?`
    ];
    let lineTwo = [
      `${rand('here are','these are','this video features','today we feature','this video shows','in this video we feature','the following are')} ${rand('some of the top','some of the best','a selection of','a variety of','a number of')} ${rand('pictures for your viewing pleasure','pictures for you to enjoy','pictures to look at','pictures to enjoy','pictures')} of ${keywordTwo}.`,
      `${rand('some of the top','some of the best','a selection of','a variety of','a number of')} ${rand('pictures for your viewing pleasure','pictures for you to enjoy','pictures to look at','pictures to enjoy','pictures')} of ${keywordTwo} ${rand('are shown in this video','are featured in this video','are featured by us today','are featured by us in this video','we feature today','are featured today')}.`,
    ];
    let lineThree = [
      `${rand('please share','please leave a comment and share this video','please share this video','please like and share','please comment and share','please like and share this video')} with ${rand('anyone interested in','anyone who might enjoy seeing pictures of','anybody who might be interested looking at pictures of','anyone who needs to see pictures of')} ${keywordThree}!`,
      `${rand('please leave a comment','please like and leave a comment','please share and leave a comment')} ${rand('with your own tips for','if you have anymore tips for','with your own ideas about','if you have anything to add on','if you have any further advice about','if you have anything else to say about','if you have your own ideas about')} ${keywordThree}!`,
      `if you enjoyed ${rand('this video about','these pictures of','watching this video on','looking at these pictures of','seeing these pictures of')} ${keywordThree}, ${rand('please share','please leave a comment and share','please share this video','please like and share','please comment and share','please like and share this video')}!`,
      `do you ${rand('have more to say about','have anymore advice about','have your own tips about','have anything to add about')} ${keywordThree}? ${rand('Please leave a comment','Please like and leave a comment','Please share and leave a comment')} ${rand('with your own tips','if you have anymore tips','with your own ideas','if you have anything to add','if you have any further advice','if you have anything else to say','if you have your own ideas')} ${rand('below','in the comments section below')}.`,
    ];
    return {lineOne: rand(...lineOne), lineTwo: rand(...lineTwo), lineThree: rand(...lineThree)};
  }
};
