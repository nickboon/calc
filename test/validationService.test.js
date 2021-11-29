import Assert from './assert.js';
import ValidationService from '../src/validationService.js';

const assert = new Assert();
const validAddParameter = 'add';
const validationService = new ValidationService();
const getValidParams = () => ({
	operator: validAddParameter,
	firstnumber: '2',
	secondnumber: '5',
});

assert.true('Valid params should be returned', () => {
	// act
	const actual = validationService.validate(getValidParams());

	// assert
	return (
		actual.firstNumber === 2 &&
		actual.secondNumber === 5 &&
		actual.operator === validAddParameter
	);
});

assert.true('No operator should default to addition', () => {
	// arrange
	const nullOperatorParams = getValidParams();
	delete nullOperatorParams.operator;

	// act
	const actual = validationService.validate(nullOperatorParams);

	// assert
	return actual.operator === validAddParameter;
});

assert.true('Unexpected operator should return expected error', () => {
	// arrange
	const invalidOperatorParams = getValidParams();
	invalidOperatorParams.operator = 'Unexpected';

	// act
	const actual = validationService.validate(invalidOperatorParams);

	// assert
	return validationService.unexpectedOperatorErrorMessage === actual.errors[0];
});

assert.true('Negative numbers should be valid', () => {
	// arrange
	const minusNumberParams = getValidParams();
	minusNumberParams.firstnumber = '-1';

	// act
	const actual = validationService.validate(minusNumberParams);

	// assert
	return -1 === actual.firstNumber;
});

assert.true('Invalid numbers should result in error message', () => {
	// arrange
	const invalidNumberParams = getValidParams();
	invalidNumberParams.firstnumber = 'not a number';

	// act
	const actual = validationService.validate(invalidNumberParams);

	// assert
	return validationService.invalidNumberErrorMessage === actual.errors[0];
});

// Single number should result in error message
// No number should result in error message
