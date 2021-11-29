export default class ValidationService {
	constructor() {
		this.unexpectedOperatorErrorMessage = 'Unexpected operator!';
		this.invalidNumberErrorMessage = 'Invalid number!';
	}

	validate(params) {
		const errors = [];

		if (params['operator'] !== 'add')
			errors.push(this.unexpectedOperatorErrorMessage);

		const firstNumber = parseFloat(params['firstnumber']);
		if (Number.isNaN(firstNumber)) errors.push(this.invalidNumberErrorMessage);

		const secondNumber = parseFloat(params['secondnumber']);
		if (Number.isNaN(secondNumber)) errors.push(this.invalidNumberErrorMessage);

		return {
			firstNumber,
			secondNumber,
			operator: params['operator'],
			errors,
		};
	}
}
