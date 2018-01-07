const expect = require('chai').expect;
const pos = require('../index');

describe('POS', () => {

  it('should return an object', () => {
    expect(pos).to.be.an('object');
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
    pos.init();
    pos.unset('noun');
    let sentence = pos.prettyPrint('An English language utility for extracting interesting parts from a string of text and re-printing them in a selection of formats. Also includes options for replacing recognized terms from an in-built thesaurus, filtering out common stopwords and randomizing the output order.',true,true,true);
    expect(sentence).to.be.a('string');
  });

  it('pretty print list should print a randomized paragraph in list form', () => {
    pos.init();
    let sentence = pos.prettyPrintList('An English language utility for extracting interesting parts from a string of text and re-printing them in a selection of formats. Also includes options for replacing recognized terms from an in-built thesaurus, filtering out common stopwords and randomizing the output order.',true,true,true);
    expect(sentence).to.be.a('string');
  });

  it('snippet should print a random component if found under 30 characters', () => {
    pos.init();
    let sentence = pos.prettyPrintSnippet('An English language utility for extracting interesting parts from a string of text and re-printing them in a selection of formats. Also includes options for replacing recognized terms from an in-built thesaurus, filtering out common stopwords and randomizing the output order.',true,true,true);
    expect(sentence).to.be.a('string');
  });

  it('snippets should extract array of components if found under 30 characters', () => {
    pos.init();
    let sentence = pos.prettyPrintSnippets('An English language utility for extracting interesting parts from a string of text and re-printing them in a selection of formats. Also includes options for replacing recognized terms from an in-built thesaurus, filtering out common stopwords and randomizing the output order.',true,true,true);
    expect(sentence).to.be.an('array');
  });

  it('is question should detect question phrases', () => {
    let q1 = pos.isQuestion('does he like ham');
    let q2 = pos.isQuestion('he likes ham');
    expect(q1).to.equal(true);
    expect(q2).to.equal(false);
  });

  it('validate sentence should correctly identify complete sentence phrases', () => {
    expect(pos.validateSentence('Dog shedding is a big problem for many pet owners')).to.equal(true);
    expect(pos.validateSentence('Bob isn\'t sitting on the table')).to.equal(true);
    expect(pos.validateSentence('He likes cheese')).to.equal(false);
  });

  it('keyword type should identify verb, gerund, plural or singular keywords', () => {
    expect(pos.keywordType('how do you train your dog')).to.equal('QUESTION');
    expect(pos.keywordType('why do dogs eat grass')).to.equal('QUESTION');
    expect(pos.keywordType('how to train your dog')).to.equal('SINGULAR');
    expect(pos.keywordType('ways to train your dog')).to.equal('PLURAL');
    expect(pos.keywordType('birds of a feather')).to.equal('PLURAL');
    expect(pos.keywordType('the birds and the bees')).to.equal('PLURAL');
    expect(pos.keywordType('non shedding dog')).to.equal('SINGULAR');
    expect(pos.keywordType('teach your dog to sit')).to.equal('VERB');
    expect(pos.keywordType('training your dog')).to.equal('GERUND');
  });

  it('template from keyword should return a keyword template object', () => {
    let temp = pos.templateFromKeyword('tips');
    expect(temp).to.be.an('object');
    expect(temp).to.have.property('safewords');
    expect(temp).to.have.property('adjective');
    expect(temp).to.have.property('singular');
    expect(temp).to.have.property('plural');
  });

  it('number from int should return a number string', () => {
    let num = pos.numberFromInt(5);
    expect(num).to.be.a('string');
  });

  it('titlecase should capitalize first letter of each word', () => {
    expect(pos.titlecase('how to train a dog')).to.equal('How To Train A Dog');
  });

  it('title should return a stylized title string', () => {
    let title = pos.title('how do you teach your dog to sit',5,'tips');
  });

  it('init should set default values for thesaurus options', () => {
    pos.init();
    expect(pos.thesaurusOptions).to.have.property('adjective');
    expect(pos.thesaurusOptions.adjective).to.equal(true);
    expect(pos.thesaurusOptions).to.have.property('noun');
    expect(pos.thesaurusOptions.noun).to.equal(true);
    expect(pos.thesaurusOptions).to.have.property('verb');
    expect(pos.thesaurusOptions.verb).to.equal(true);
    expect(pos.thesaurusOptions).to.have.property('adverb');
    expect(pos.thesaurusOptions.adverb).to.equal(true);
  });

  it('unset should disable correct thesaurus options', () => {
    pos.init();
    pos.unset('adjective');
    expect(pos.thesaurusOptions.adjective).to.equal(false);
    pos.init();
    pos.unset(['verb','adverb','noun','adjective']);
    expect(pos.thesaurusOptions.adjective).to.equal(false);
    expect(pos.thesaurusOptions.noun).to.equal(false);
    expect(pos.thesaurusOptions.adverb).to.equal(false);
    expect(pos.thesaurusOptions.verb).to.equal(false);
  });

});
