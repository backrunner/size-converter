const { should } = require('chai');
const { convertFileSize } = require('../main');

should();

describe('Test the convert function', () => {
  it('Low to high', () => {
    convertFileSize('1bytes', 'KB', 1000).should.deep.equal({ number: 0.001, string: '0.001KB' });
    convertFileSize('1024KB', 'mb').should.deep.equal({ number: 1, string: '1MB' });
  });
  it('High to low', () => {
    convertFileSize('4mb', 'kb').should.deep.equal({ number: 4096, string: '4096KB' });
    convertFileSize('2GB', 'Kb').should.deep.equal({ number: 2 * 1024 * 1024, string: `${2 * 1024 * 1024}KB` });
  });
  it('Same unit', () => {
    convertFileSize('1mb', 'mb').should.deep.equal({ number: 1, string: '1MB' });
    convertFileSize('2223Gb', 'GB').should.deep.equal({ number: 2223, string: '2223GB' });
    convertFileSize('121KB', 'kb').should.deep.equal({ number: 121, string: '121KB' });
  });
});
