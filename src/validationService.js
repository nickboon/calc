export default class ValidationService {
	static get defaultOperator() {
		return 'add';
	}

	static get errorMessages() {
		return {
			invalidNumber: 'Invalid number!',
			invalidOperator: 'Invalid operator!',
		};
	}

	validate(params) {
		const errors = [];

		const operator = params['operator'] || ValidationService.defaultOperator;
		if (operator !== 'add') {
			errors.push(ValidationService.errorMessages.invalidOperator);
		}

		const firstNumber = parseFloat(params['firstnumber']);
		if (Number.isNaN(firstNumber))
			errors.push(ValidationService.errorMessages.invalidNumber);

		const secondNumber = parseFloat(params['secondnumber']);
		if (Number.isNaN(secondNumber))
			errors.push(ValidationService.errorMessages.invalidNumber);

		return {
			firstNumber,
			secondNumber,
			operator,
			errors,
		};
	}
}
