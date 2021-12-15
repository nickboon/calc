// see https://chiamakaikeanyi.dev/coloured-console-log-in-browser-devtools/
export default class Assert {
	static #logExpectation(expectation, result) {
		console.log(
			`%c${expectation}: ${result ? '🗸' : '🕱'}`,
			`color: #${result ? '0f0' : 'f00'}`
		);
	}

	static #logActual(expected, actual) {
		console.log(
			`%cExpected: "${expected}". Actual: "${actual}"`,
			'color: #f00'
		);
	}

	sut(sut) {
		console.log(`%c${sut?.name || 'e2e'} tests`, 'text-decoration: underline');
	}

	true(expectation, test) {
		Assert.#logExpectation(expectation, test());
	}

	equal(expectation, expected, test) {
		const actual = test();
		const isEqual = expected === actual;
		this.true(expectation, () => isEqual);
		if (!isEqual) Assert.#logActual(expected, actual);
	}

	throws(expectation, test) {
		let isError = false;
		try {
			test();
		} catch (error) {
			isError = true;
		}
		Assert.#logExpectation(expectation, isError);
	}
}
