var test = require('tape');
var AddService = require('../src/addService.js');
var sut = new AddService();

test('Should return the sum of 2 given numbers', (assert) => {
	assert.equal(sut.add(2, 3), 5);

	assert.end();
});

test('Should be able to add negative numbers', (assert) => {
	assert.equal(sut.add(-2, -3), -5);

	assert.end();
});

test('Should be able to add decimals', (assert) => {
	assert.equal(sut.add(2.3, 3.7), 6);

	assert.end();
});
