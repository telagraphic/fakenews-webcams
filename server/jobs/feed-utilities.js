function upperCaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseAllWordsExceptFirstLetters(string) {
  return string.replace(/\w\S*/g, function (word) {
    return word.charAt(0) + word.slice(1).toLowerCase();
  });
}

function properCase(string) {
  return upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(string));
}

function addProtocol(imgURL) {
  let url = 'https://';
  return url.concat(imgURL);
}

module.exports = {
  properCase : properCase,
  addProtocol: addProtocol
}
