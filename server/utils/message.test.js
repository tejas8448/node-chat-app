const expect = require('expect');
let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should return object with message', () => {
        let result = generateMessage('tejas', 'Hello world');
        expect(result.from).toBe('tejas');
        expect(result.text).toBe('Hello world');
        expect(result.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let result = generateLocationMessage('Tejas',1,20);
        expect(result.from).toBe('Tejas');
        expect(result.createdAt).toBeA('number');
        expect(result.url).toBe('https://www.google.com/maps?q=1,20');

    });
});