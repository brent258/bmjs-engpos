const rand = require('bmjs-random');
const shuffle = require('bmjs-shuffle');

module.exports = {
  adjective: ['best','the best','the top','top','popular','most popular','the most popular','amazing','great','the greatest','most amazing','cool','coolest','good','super','superb'],
  singular: ['review','product rating','product review'],
  plural: ['reviews','product ratings','product reviews'],
  uncountable: [],
  intro: function(keywordList,plural,determiner,nounType) {
    if (!keywordList || !keywordList.length) {
      console.log('Unable to generate intro text for products template without keyword list.');
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
      `${keywordOne} ${plural ? 'are' : 'is'} ${nounType ? nounType : rand('something','a product','one of those things','a thing','an item')} ${rand('many','a lot of','a good number of','a great number of','a great deal of','a good deal of')} people ${rand('want to know more about','are interested in learning more about','are interested in','are curious about','are searching for information about','want to learn about','are looking for','are in the market for','are shopping around for','are interested in buying')}.`,
      `${nounType ? nounType : rand('something','a product','one of those things','a thing','an item')} ${rand('many','a lot of','a good number of','a great number of','a great deal of','a good deal of')} people ${rand('want to know more about','are interested in learning more about','are interested in','are curious about','are searching for information about','want to learn about','are looking for','are in the market for','are shopping around for','are interested in buying')} is ${keywordOne}.`,
      `${rand('looking for','interested in','are you interested in learning more about','do you want to know more about','are you curious about','are you interested in','are you shopping for','are you in the market for','are you looking to buy')} ${keywordOne}?`
    ];
    let lineTwo = [
      `${rand('here are','these are','this video goes through','this video features','today we go through','this video talks about','in this video we talk about','the following are')} ${rand('some of the top','some of the best','the most popular','the most common')} ${keywordTwo} ${rand('around','available','you can find','you will find','to choose from','you can buy','on the market','available for purchase','available to buy')}.`,
      `${rand('some of the top','some of the best','the most popular','the most common','the best','the most common','the more popular')} ${keywordTwo} ${rand('around','available','you can find','you will find','to choose from','you can buy','on the market','available for purchase','available to buy')} ${rand('are gone through in this video','are featured in this video','are gone through by us today','are talked about in this video','are talked about by us in this video','we go through today','are featured today')}.`,
    ];
    let lineThree = [
      `${rand('please share','please leave a comment and share this video','please share this video','please like and share','please comment and share','please like and share this video')} with ${rand('anyone interested in','anyone who might be looking for','anybody who might be interested in','anyone who needs to know more about')} ${keywordThree}!`,
      `${rand('please leave a comment','please like and leave a comment','please share and leave a comment')} ${rand('with your own tips for','if you have anymore tips for','with your own ideas about','if you have anything to add on','if you have any further advice about','if you have anything else to say about','if you have your own ideas about')} ${keywordThree}!`,
      `if you enjoyed ${rand('this video about','watching and learning about','watching this video on','learning all about','learning more about')} ${keywordThree}, ${rand('please share','please leave a comment and share','please share it','please like and share','please comment and share','please like and share it')}!`,
      `do you ${rand('have more to say about','have anymore advice about','have your own tips about','have anything to add about')} ${keywordThree}? ${rand('Please leave a comment','Please like and leave a comment','Please share and leave a comment')} ${rand('with your own tips','if you have anymore tips','with your own ideas','if you have anything to add','if you have any further advice','if you have anything else to say','if you have your own ideas')} ${rand('below','in the comments section below')}.`,
    ];
    return {lineOne: rand(...lineOne), lineTwo: rand(...lineTwo), lineThree: rand(...lineThree)};
  }
};
