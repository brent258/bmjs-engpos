const expect = require('chai').expect;
const pos = require('../index');

describe('POS', () => {

  it('should return an object', () => {
    expect(pos).to.be.an('object');
    expect(pos).to.have.property('splitStopwords');
    expect(pos).to.not.be.undefined;
  });

  it('split stopwords should break sentences on special keywords', () => {
    let check1 = pos.splitStopwords('they are good in connection with health.');
    expect(check1).to.deep.equal(['they','are','good','in_terms_of','health','.']);
    console.log(check1);
  });

});
