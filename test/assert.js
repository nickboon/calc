// see https://chiamakaikeanyi.dev/coloured-console-log-in-browser-devtools/
export default class Assert {
	static #logExpectation = (expectation, result) => {
		console.log(
			`%c${expectation}: ${result ? '🗸' : '🕱'}`,
			`color: #${result ? '0f0' : 'f00'}`
		);
	};

	sut(sut) {
		console.log(`%c${sut?.name || 'e2e'} tests`, 'text-decoration: underline');
	}

	true(expectation, test) {
		Assert.#logExpectation(expectation, test());
	}

	throws(expectation, test) {
		let result = false;
		try {
			test();
		} catch (error) {
			result = true;
		}

		Assert.#logExpectation(expectation, result);
	}
}
