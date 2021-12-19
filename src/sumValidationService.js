export default class SumValidationService {
	static get errorMessages() {
		return {
			invalidFirstNumber: 'Invalid first number!',
			invalidSecondNumber: 'Invalid second number!',
			invalidOperator: 'Invalid operator!',
		};
	}

	validate(sum) {
		const errors = [];

		const operator = sum['operator'];
		if (operator !== 'add')
			errors.push(SumValidationService.errorMessages.invalidOperator);

		const firstNumber = parseFloat(sum['firstnumber']);
		if (Number.isNaN(firstNumber))
			errors.push(SumValidationService.errorMessages.invalidFirstNumber);

		const secondNumber = parseFloat(sum['secondnumber']);
		if (Number.isNaN(secondNumber))
			errors.push(SumValidationService.errorMessages.invalidSecondNumber);

		return {
			firstNumber,
			secondNumber,
			operator,
			errors,
		};
	}
}
