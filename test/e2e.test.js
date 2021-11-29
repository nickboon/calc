import Assert from './assert.js';
const assert = new Assert();

fetch('http://localhost:5500/src')
	.then((response) => response.text())
	.then((data) => {
		assert.sut();
		assert.true('Should see hello world', () => data.includes('Hello world'));
	});
