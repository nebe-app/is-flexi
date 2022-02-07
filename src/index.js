const cheerio = require('cheerio');
const { readFile } = require('fs').promises;
const { exists } = require('fs-extra');

module.exports = async function isFlexi(filePath) {
	if (typeof filePath !== 'string') {
		throw new Error('Supplied filePath must be a string.');
	}

	// https://regex101.com/r/dPlkvL/1
	// matches file path if it contains .html or .xhtml extension
	if (!filePath.match(/\.(html|xhtml)/)) {
		throw new Error('Supplied filePath must be a .html or .xhtml file.');
	}

	// if index.html doesn't exist, it's not flexi ;)
	if (!await exists(filePath)) {
		return false;
	}

	const markup = await readFile(filePath, { encoding: 'utf8' });

	// load index.html markup into cheerio
	const $ = cheerio.load(markup);
	// attempt to target main element inside index.html with attributes that determine it's flexi state
	const mainElem = $('main[data-min-width][data-max-width][data-min-ratio][data-max-ratio]');

	// if element wasn't found, resize is not flexi
	if (mainElem.length < 1) {
		return false;
	}

	// another requirement for a flexi resize is a scaler element as a direct descendant of main flexi element
	const scalerElem = $('> [data-scaler]', mainElem[0]);

	// if scaler exists, we can finally determine, that resize is indeed flexi
	return scalerElem.length > 0;
};
