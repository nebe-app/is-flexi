const path = require('path');
const isFlexi = require('../src/index');

test('it should be flexi', async () => {
	await expect(isFlexi(path.join(__dirname, '../examples/flexi.html'))).resolves.toBe(true);
});

test('it should not be flexi', async () => {
	await expect(isFlexi(path.join(__dirname, '../examples/not-flexi.html'))).resolves.toBe(false);
});

test('it should return falsy, if the file doesn\'t exist at the provided filePath', async () => {
	await expect(isFlexi(path.join(__dirname, '../examples/cic.html'))).resolves.toBe(false);
});

test('it should return falsy, if the file doesn\'t contain scaler element', async () => {
	await expect(isFlexi(path.join(__dirname, '../examples/not-flexi-missing-scaler.html'))).resolves.toBe(false);
});

test('it should throw an error if filePath is not a string', async () => {
	await expect(isFlexi({})).rejects.toThrowError(new Error('Supplied filePath must be a string.'));

	await expect(isFlexi(undefined)).rejects.toThrowError(new Error('Supplied filePath must be a string.'));

	await expect(isFlexi(NaN)).rejects.toThrowError(new Error('Supplied filePath must be a string.'));

	await expect(isFlexi(300)).rejects.toThrowError(new Error('Supplied filePath must be a string.'));
});

test('it should throw an error if filePath is not a .html or .xhtml file', async () => {
	await expect(isFlexi(path.join(__dirname, '../examples/flexi.jpg'))).rejects.toThrowError('Supplied filePath must be a .html or .xhtml file.');

	await expect(isFlexi(path.join(__dirname, '../examples/flexi.png'))).rejects.toThrowError('Supplied filePath must be a .html or .xhtml file.');
});