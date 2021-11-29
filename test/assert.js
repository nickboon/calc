// see https://chiamakaikeanyi.dev/coloured-console-log-in-browser-devtools/
export default class Assert {
	sut(sut) {
		console.log(`%c ${sut?.name || 'e2e'} tests`, 'text-decoration: underline');
	}

	true(expectation, test) {
		const result = test();
		console.log(
			`%c${expectation}: ${result ? '🗸' : '🕱'}`,
			`color: #${result ? '0f0' : 'f00'}`
		);
	}
}
