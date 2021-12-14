import Assert from './assert.js';
import ValidationService from '../src/validationService.js';

const assert = new Assert();
const sut = new ValidationService();

assert.sut(ValidationService);

const validAddParameter = 'add';
const validFirstNumber = '2';
const validSecondNumber = '5';
const getValidParams = () => ({
	operator: validAddParameter,
	firstnumber: validFirstNumber,
	secondnumber: validSecondNumber,
});

assert.true('Valid params should be returned', () => {
	// act
	const actual = sut.validate(getValidParams());

	// assert
	return (
		actual.firstNumber === 2 &&
		actual.secondNumber === 5 &&
		actual.operator === validAddParameter
	);
});

assert.true('Invalid operator should return error message', () => {
	// arrange
	const invalidOperatorParams = getValidParams();
	invalidOperatorParams.operator = 'invalid';

	// act
	const actual = sut.validate(invalidOperatorParams);

	// assert
	return (
		ValidationService.invalidOperatorErrorMessage === actual.errors[0] &&
		actual.errors.length === 1
	);
});

assert.throws('Default operator should be readonly', () => {
	// act
	ValidationService.defaultOperator = 'new value';
});

assert.true('Default operator should be "add"', () => {
	// assert
	return 'add' === ValidationService.defaultOperator;
});

assert.true('No operator should return default', () => {
	// arrange
	const nullOperatorParams = getValidParams();
	delete nullOperatorParams.operator;

	// act
	const actual = sut.validate(nullOperatorParams);

	// assert
	return actual.operator === ValidationService.defaultOperator;
});

assert.true('No operator should be valid', () => {
	// arrange
	const nullOperatorParams = getValidParams();
	delete nullOperatorParams.operator;

	// act
	const actual = sut.validate(nullOperatorParams);

	// assert
	return actual.errors.length === 0;
});

assert.true('Invalid operator should return expected error', () => {
	// arrange
	const invalidOperatorParams = getValidParams();
	invalidOperatorParams.operator = 'Invalid';

	// act
	const actual = sut.validate(invalidOperatorParams);

	// assert
	return (
		ValidationService.invalidOperatorErrorMessage === actual.errors[0] &&
		actual.errors.length === 1
	);
});

assert.true('Negative numbers should be valid', () => {
	// arrange
	const minusNumberParams = getValidParams();
	minusNumberParams.firstnumber = '-1';

	// act
	const actual = sut.validate(minusNumberParams);

	// assert
	return -1 === actual.firstNumber;
});

assert.true('Invalid numbers should result in error message', () => {
	// arrange
	const invalidNumberParams = getValidParams();
	invalidNumberParams.firstnumber = 'not a number';

	// act
	const actual = sut.validate(invalidNumberParams);

	// assert
	return ValidationService.invalidNumberErrorMessage === actual.errors[0];
});

// Single number should result in error message
// No number should result in error message
