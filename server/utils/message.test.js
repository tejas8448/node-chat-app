const expect = require('expect');
let {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should return object with message', () => {
        let result = generateMessage('tejas', 'Hello world');
        expect(result.from).toBe('tejas');
        expect(result.text).toBe('Hello world');
        expect(result.createdAt).toBeA('number');
    });
});