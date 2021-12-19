import Assert from './assert.js';
import SumValidationService from '../src/sumValidationService.js';

const assert = new Assert();
const sut = new SumValidationService();
let expected;

assert.sutIs(SumValidationService);

const getValidSum = () => ({
	operator: 'add',
	firstnumber: '2',
	secondnumber: '5',
});

assert.true('Valid sum properties should be returned', () => {
	// act
	const actual = sut.validate(getValidSum());

	// assert
	return (
		actual.firstNumber === 2 &&
		actual.secondNumber === 5 &&
		actual.operator === 'add'
	);
});

assert.equal(
	'Valid sum properties should return no error message',
	(expected = 0),
	() => {
		// act
		const actual = sut.validate(getValidSum());

		// assert
		return actual.errors.length;
	}
);

assert.true(
	'Invalid operator should return invalid operator error message',
	() => {
		// arrange
		const invalidOperatorSum = getValidSum();
		invalidOperatorSum.operator = 'Invalid';

		// act
		const actual = sut.validate(invalidOperatorSum);

		// assert
		return (
			SumValidationService.errorMessages.invalidOperator === actual.errors[0] &&
			actual.errors.length === 1
		);
	}
);

assert.true(
	'Missing operator value should return invalid operator message error message',
	() => {
		// arrange
		const invalidOperatorSum = getValidSum();
		invalidOperatorSum.operator = '';

		// act
		const actual = sut.validate(invalidOperatorSum);

		// assert
		return (
			SumValidationService.errorMessages.invalidOperator === actual.errors[0] &&
			actual.errors.length === 1
		);
	}
);

assert.true(
	'Missing operator property should return invalid operator message error message',
	() => {
		// arrange
		const invalidOperatorSum = getValidSum();
		delete invalidOperatorSum.operator;

		// act
		const actual = sut.validate(invalidOperatorSum);

		// assert
		return (
			SumValidationService.errorMessages.invalidOperator === actual.errors[0] &&
			actual.errors.length === 1
		);
	}
);

assert.equal('Negative numbers should be valid', (expected = -1), () => {
	// arrange
	const negativeNumberSum = getValidSum();
	negativeNumberSum.firstnumber = '-1';

	// act
	const actual = sut.validate(negativeNumberSum);

	// assert
	return actual.firstNumber;
});

assert.true(
	'Invalid numbers should result in expected invalid number error message',
	() => {
		// arrange
		const invalidNumberSum = getValidSum();
		invalidNumberSum.firstnumber = 'not a number';

		// act
		const actual = sut.validate(invalidNumberSum);

		//assert
		return (
			SumValidationService.errorMessages.invalidFirstNumber ===
				actual.errors[0] && actual.errors.length === 1
		);
	}
);

assert.true(
	'Missing number property should result in expected invalid number error message',
	() => {
		//arrange
		const missingNumberSum = getValidSum();
		delete missingNumberSum.firstnumber;

		//act
		const actual = sut.validate(missingNumberSum);

		// assert
		return (
			SumValidationService.errorMessages.invalidFirstNumber ===
				actual.errors[0] && actual.errors.length === 1
		);
	}
);

// Single number should result in error message ('first/second number missing')
// No numbers should result in error message ('both numbers mising')

// ('operator=');
// firnumber = undefined;
// secondnumber = undefined;
// operator = '';

// 'please follow the format {firstnumber=} followed by {secondnumber=} etc'(
// 	'firstNumberIsMissnig'
// );
// ('secondNumberIsMissnig');

// ('firstnumber=&secondnumber=&operator=');
// firstnumber = '';
// secondnumber = '';
// operator = '';

// firstnumber = 'firstNumberIsMissing';
// secondnumber = 'firstNumberIsMissing';
