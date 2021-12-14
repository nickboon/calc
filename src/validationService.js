const defaultOperator = 'add';
export default class ValidationService {
	constructor() {
		this.invalidNumberErrorMessage = 'Invalid number!';
		this.invalidOperatorErrorMessage = 'Invalid operator!';
	}

	validate(params) {
		const errors = [];

		if (!params['operator']) {
			params['operator'] = defaultOperator;
		} else if (params['operator'] !== 'add') {
			errors.push(this.invalidOperatorErrorMessage);
		}

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
