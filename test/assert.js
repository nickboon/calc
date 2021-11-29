// see https://chiamakaikeanyi.dev/coloured-console-log-in-browser-devtools/
export default class Assert {
	true(expectation, test) {
		const result = test();
		console.log(
			`%c${expectation}: ${result ? '🗸' : '🕱'}`,
			`color: #${result ? '0f0' : 'f00'}`
		);
	}
}
