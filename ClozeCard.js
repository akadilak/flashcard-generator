var ClozeCard = function(text, cloze) {
  // cloze-deletion validation
  var textWordsArr = text.split(" ");

  var clozeFound = false;

  // array of words of full text made earlier is run through a for-loop to test if there is a match
  for(var i = 0; i < textWordsArr.length; i++) {
    if(textWordsArr[i].toUpperCase() === cloze.toUpperCase()) {
      clozeFound = true;
    } else if(textWordsArr[i].toUpperCase() === (cloze.toUpperCase() + "?") || textWordsArr[i].toUpperCase() === (cloze.toUpperCase() + ".") || textWordsArr[i].toUpperCase() === (cloze.toUpperCase() + "!") || textWordsArr[i].toUpperCase() === (cloze.toUpperCase() + ",") || textWordsArr[i].toUpperCase() === (cloze.toUpperCase() + ";") || textWordsArr[i].toUpperCase() === (cloze.toUpperCase() + ":")) {
      clozeFound = true;
    }
  }

  // if match is not found, throw error * * * and if found, proceed with constructor
  if(clozeFound === false) {
    throw "The cloze deletion does not appear in the full text. Please try again.";
  } else {
    this.text = text;
    this.cloze = cloze;

    this.getFullText = function() {
      return this.text;
    };
    this.getCloze = function() {
      return this.cloze;
    };
    this.getPartial = function() {
      return text.replace(cloze, "...");
    };
  }
};

// for exporting
module.exports = ClozeCard;