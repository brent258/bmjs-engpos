const expect = require('chai').expect;
const pos = require('../index');

describe('POS', () => {

  it('should return an object', () => {
    expect(pos).to.be.an('object');
    expect(pos).to.not.be.undefined;
  });

  it('split should return a sentence object with word and tags', () => {
    let obj = pos.split('This is a sample sentence.');
    expect(obj).to.be.an('object');
    expect(obj).to.have.property('words');
    expect(obj).to.have.property('tags');
  });

  it('join should return a string from a sentence object', () => {
    let string = 'This is a sample sentence.';
    let obj = pos.split(string);
    let joined = pos.join(obj);
    expect(joined).to.be.a('string');
    expect(joined).to.equal(string);
  });

  it('replace should return a new sentence object from a sentence object', () => {
    pos.init();
    let string = 'This is a good sentence.';
    let obj = pos.split(string);
    let replaced = pos.replace(obj);
    expect(replaced).to.be.an('object');
    expect(replaced).to.not.deep.equal(obj);
  });

  it('capitalcase should return a correctly capitalized sentence', () => {
    let string = 'this is a good sentence.';
    expect(pos.capitalcase(string)).to.not.equal(string);
    expect(pos.capitalcase(string)).to.equal('This is a good sentence.');
  });

  it('titlecase should return a correctly capitalized sentence', () => {
    let string = 'this is a good sentence.';
    expect(pos.titlecase(string)).to.not.equal(string);
    expect(pos.titlecase(string)).to.equal('This Is A Good Sentence.');
  });

  it('components should return an array from a sentence object', () => {
    let string = 'This is a good sentence.';
    let obj = pos.split(string);
    let components = pos.components(obj);
    expect(components).to.be.an('array');
    expect(components[0]).to.equal('A good sentence');
  });

  it('strip should remove common words from a sentence', () => {
    expect(pos.strip('He isn\'t happy.')).to.equal('Not happy.');
  });

  it('print should return a sentence string from an array and options', () => {
    expect(pos.print(['this is a sentence','this is a second sentence'])).to.equal('This is a sentence. This is a second sentence.\n');
  });

  it('snippets should return a sentence string from an array and options', () => {
    expect(pos.snippets(['this is a sentence','this is a second sentence'])).to.equal('Is a sentence. A second sentence.\n');
  });

  it('snippet should return a truncated string from a sentence object', () => {
    expect(pos.snippet('This is a good sentence.')).to.equal('A good sentence');
  });

  it('keyword should return correct keyword from letter', () => {
    expect(pos.keyword('s')).to.equal('SINGULAR');
    expect(pos.keyword('p')).to.equal('PLURAL');
    expect(pos.keyword('g')).to.equal('GERUND');
    expect(pos.keyword('v')).to.equal('VERB');
    expect(pos.keyword('q')).to.equal('QUESTION');
  });

  it('template should return a template object from string', () => {
    expect(pos.template('tips')).to.be.an('object');
  });

  it('title should return a correctly formatted string', () => {
    let text = pos.title('training a dog','g','facts',9);
    expect(text).to.be.a('string');
  });

  it('intro should return a correctly formatted string', () => {
    let text = pos.intro('facts',['dog training','training a dog']);
    expect(text).to.be.a('string');
  });

  it('promo should return a correctly formatted string', () => {
    let text = pos.promo('training a dog','http://heartmydog.com');
    expect(text).to.be.a('string');
  });

  it('tags should return a correctly formatted string', () => {
    let text = pos.tags(['dog training','training a dog']);
    expect(text).to.be.a('string');
  });

  it('license should return a correctly formatted string', () => {
    let text = pos.license(true);
    expect(text).to.be.a('string');
  });

});
