export default function splitText(text) {
	let returnWord = '';

	for (var i = 0; i < text.length; i++) {
			returnWord += '<span>' + text.charAt(i) + '</span>';
	}

	return returnWord;
}