export default class ValidationService {
	static #defaultOperator = 'add';
	static #invalidNumberErrorMessage = 'Invalid number!';
	static #invalidOperatorErrorMessage = 'Invalid operator!';
	static get defaultOperator() {
		return ValidationService.#defaultOperator;
	}
	static get invalidNumberErrorMessage() {
		return ValidationService.#invalidNumberErrorMessage;
	}
	static get invalidOperatorErrorMessage() {
		return ValidationService.#invalidOperatorErrorMessage;
	}

	validate(params) {
		const errors = [];

		const operator = params['operator'] || ValidationService.defaultOperator;
		if (operator !== 'add') {
			errors.push(ValidationService.#invalidOperatorErrorMessage);
		}

		const firstNumber = parseFloat(params['firstnumber']);
		if (Number.isNaN(firstNumber))
			errors.push(ValidationService.#invalidNumberErrorMessage);

		const secondNumber = parseFloat(params['secondnumber']);
		if (Number.isNaN(secondNumber))
			errors.push(ValidationService.#invalidNumberErrorMessage);

		return {
			firstNumber,
			secondNumber,
			operator,
			errors,
		};
	}
}
