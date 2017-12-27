const expect = require('chai').expect;
const pos = require('../index');

describe('POS', () => {

  it('should return an object', () => {
    expect(pos).to.be.an('object');
    expect(pos).to.have.property('splitStopwords');
    expect(pos).to.not.be.undefined;
  });

  it('split stopwords should break sentences on special keywords', () => {
    let check1 = pos.splitStopwords('they are good in terms of health.');
    expect(check1).to.deep.equal([
      {word: 'they', type: 'COMPONENT'},
      {word: 'are', type: 'VERB'},
      {word: 'good', type: 'COMPONENT'},
      {word: 'in terms of', type: 'PREPOSITION'},
      {word: 'health', type: 'COMPONENT'},
      {word: '.', type: 'PUNCTUATION'}
    ]);
  });

  it('match tags should return true or false if word matches found', () => {
    let check1 = pos.matchTag('eat','verb');
    let check2 = pos.matchTag('hairy','verb');
    let check3 = pos.matchTag('hairy','adjective');
    let check4 = pos.matchTag('apple','noun');
    let check5 = pos.matchTag('particularly','adverb');
    expect(check1).to.equal(true);
    expect(check2).to.equal(false);
    expect(check3).to.equal(true);
    expect(check4).to.equal(true);
    expect(check5).to.equal(true);
  });

  it('swap should take sentence object and return replaced object', () => {
    let obj = pos.splitStopwords('With regards to Abduction, are (extremely Abhorrent) in terms of personality.');
    expect(pos.swap(obj)).to.be.an('array');
    expect(pos.swap(obj)).to.not.deep.equal(obj);
  });

  it('find components should return an array of extracted components', () => {
    let obj = pos.splitStopwords('Tibetan terriers are proof that hypoallergenic doesnt mean no hair. They make our list because they shed minimally, but this bushy breed still requires a lot of grooming. Fun Fact: These fluffy dogs were once the companions to Buddhist monks and the guard dogs of nomadic herdsmen.');
    let swapped = pos.swap(obj);
    pos.findComponents(swapped);
  });

});
