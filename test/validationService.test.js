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
	ValidationService.defaultOperator = 'new value';
});

assert.equal(
	'Default operator should be "add"',
	'add',
	() => ValidationService.defaultOperator
);

assert.equal(
	'No operator should return default',
	ValidationService.defaultOperator,
	() => {
		const nullOperatorParams = getValidParams();
		delete nullOperatorParams.operator;
		return sut.validate(nullOperatorParams).operator;
	}
);

assert.equal('No operator should be valid', 0, () => {
	// arrange
	const nullOperatorParams = getValidParams();
	delete nullOperatorParams.operator;

	//act
	return sut.validate(nullOperatorParams).errors.length;
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

assert.equal('Negative numbers should be valid', -1, () => {
	// arrange
	const minusNumberParams = getValidParams();
	minusNumberParams.firstnumber = '-1';

	// act
	return sut.validate(minusNumberParams).firstNumber;
});

assert.true('Invalid numbers should result in error message', () => {
	// arrange
	const invalidNumberParams = getValidParams();
	invalidNumberParams.firstnumber = 'not a number';

	// act
	const actual = sut.validate(invalidNumberParams);

	//assert
	return (
		ValidationService.invalidNumberErrorMessage === actual.errors[0] &&
		actual.errors.length === 1
	);
});

// Single number should result in error message
// No number should result in error message
