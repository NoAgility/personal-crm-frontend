// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const disabledMsg = ["Rendering components directly into document.body is discouraged"];

const filteredErrorFunc = (err) => {
	const find = async () => {
		for (var i = 0; i < disabledMsg.length; i++) {
			if (err.includes(disabledMsg[i])) {
				return true;
			}
		}
		return false;
	};
	find().then(res => res || console.info(err));
}

global.console = {
	log: jest.fn(), // console.log are ignored in tests

	// Keep native behaviour for other methods, use those to print out things in your own tests, not `console.log`
	error: filteredErrorFunc,
	warn: console.warn,
	info: console.info,
	debug: console.debug,
};