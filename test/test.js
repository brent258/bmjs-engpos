const expect = require('chai').expect;
const pos = require('../index');

describe('POS', () => {

  it('should return an object', () => {
    expect(pos).to.be.an('object');
    expect(pos).to.have.property('splitStopwords');
    expect(pos).to.not.be.undefined;
  });

  it('split stopwords should break sentences on special keywords', () => {
    let result = pos.splitStopwords('they are good in terms of health.');
    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
    expect(result[0]).to.have.property('pos');
    expect(result[0]).to.have.property('type');
    expect(result[0]).to.have.property('word');
  });

  it('swap should take sentence object and return replaced object', () => {
    let obj = pos.splitStopwords('With regards to Abduction, are (extremely Abhorrent) in terms of personality.');
    expect(pos.swap(obj)).to.be.an('array');
    expect(pos.swap(obj)).to.not.deep.equal(obj);
  });

  it('find components should return an array of extracted components', () => {
    let obj = pos.splitStopwords('Non-shedding and hypoallergenic dogs seem to be more popular than ever. With dog allergies so common, many pet lovers are seeking hypoallergenic dog breeds - sometimes paying thousands of dollars to get them. And still others are going hypoallergenic for the hair, or lack of it. Dog shedding is a big problem for many pet owners, but it\'s another strike off the list for owners of hypoallergenic dog breeds.  ');
    let swapped = pos.swap(obj);
    let comps = pos.findComponents(swapped);
    expect(comps).to.be.an('array');
  });

  it('pretty print should print a randomized paragraph', () => {
    let sentence = pos.prettyPrint('An English language utility for extracting interesting parts from a string of text and re-printing them in a selection of formats. Also includes options for replacing recognized terms from an in-built thesaurus, filtering out common stopwords and randomizing the output order.',true,true,true);
    expect(sentence).to.be.a('string');
  });

  it('pretty print list should print a randomized paragraph in list form', () => {
    let sentence = pos.prettyPrintList('An English language utility for extracting interesting parts from a string of text and re-printing them in a selection of formats. Also includes options for replacing recognized terms from an in-built thesaurus, filtering out common stopwords and randomizing the output order.',true,true,true);
    expect(sentence).to.be.a('string');
  });

  it('snippet should print a random component if found under 30 characters', () => {
    let sentence = pos.prettyPrintSnippet('An English language utility for extracting interesting parts from a string of text and re-printing them in a selection of formats. Also includes options for replacing recognized terms from an in-built thesaurus, filtering out common stopwords and randomizing the output order.',true,true,true);
    expect(sentence).to.be.a('string');
  });

  it('snippets should extract array of components if found under 30 characters', () => {
    let sentence = pos.prettyPrintSnippets('An English language utility for extracting interesting parts from a string of text and re-printing them in a selection of formats. Also includes options for replacing recognized terms from an in-built thesaurus, filtering out common stopwords and randomizing the output order.',true,true,true);
    expect(sentence).to.be.an('array');
  });

  it('is question should detect question phrases', () => {
    let q1 = pos.isQuestion('does he like ham');
    let q2 = pos.isQuestion('he likes ham');
    expect(q1).to.equal(true);
    expect(q2).to.equal(false);
  });

});
