const rand = require('bmjs-random');
const shuffle = require('bmjs-shuffle');

module.exports = {
  adjective: ['interesting','notable','noteworthy','amazing','top','most interesting','most amazing','great'],
  singular: ['fact','fact to know'],
  plural: ['facts','facts to know'],
  uncountable: ['info','information'],
  intro: function(keywordList,plural,determiner,nounType) {
    if (!keywordList || !keywordList.length) {
      console.log('Unable to generate intro text for facts template without keyword list.');
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
      `${rand('looking for','interested in','are you interested in learning more about','do you want to know more about','are you curious about','are you interested in')} ${keywordOne}?`,
    ];
    let lineTwo = [
      `${rand('here are','these are','this video goes through','this video features','today we go through','this video talks about','in this video we talk about','the following are')} ${rand('some of the','a few of the')} ${'most interesting facts','most interesting bits of info','more interesting tidbits'} ${'you can find out about','to learn about','you will want to learn about','when it comes to'} ${keywordTwo}.`,
      `${rand('some of the','a few of the')} ${'most interesting facts','most interesting bits of info','more interesting tidbits'} ${'you can find out about','to learn about','you will want to learn about','when it comes to'} ${keywordTwo} ${rand('are gone through in this video','are featured in this video','are gone through by us today','are talked about in this video','are talked about by us in this video','we go through today','are featured today')}.`,
    ];
    let lineThree = [
      `${rand('please share','please leave a comment and share this video','please share this video','please like and share','please comment and share','please like and share this video')} with ${rand('anyone interested in','anyone who might be curious about','anybody who might be interested in','anyone who needs to know more about')} ${keywordThree}!`,
      `${rand('please leave a comment','please like and leave a comment','please share and leave a comment')} ${rand('with your own info for','if you have anymore facts about','with your own info about','if you have anything to add on','if you have any further info about','if you have anything else to say about','if you have your own facts about')} ${keywordThree}!`,
      `if you enjoyed ${rand('this video about','watching and learning about','watching this video on','learning all about','learning more about')} ${keywordThree}, ${rand('please share','please leave a comment and share','please share it','please like and share','please comment and share','please like and share it')}!`,
      `do you ${rand('have more to say about','have anymore info about','have your own facts about','have anything to add about')} ${keywordThree}? ${rand('Please leave a comment','Please like and leave a comment','Please share and leave a comment')} ${rand('with your own facts','if you have anymore facts','with your own info','if you have anything to add','if you have any further info','if you have anything else to say','if you have your own ideas')} ${rand('below','in the comments section below')}.`,
    ];
    return {lineOne: rand(...lineOne), lineTwo: rand(...lineTwo), lineThree: rand(...lineThree)};
  }
};
