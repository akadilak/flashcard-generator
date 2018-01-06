var BasicCard = require("./basicCard.js");
var ClozeCard = require("./clozeCard.js");
var inquirer = require("inquirer");

var cardIndex = 1;
var cardCount;
var cardsArr = [];
var reviewIndex = 0;
var correctCount = 0;

var choice = function() {
    // get user input
    inquirer.prompt([{
        name: 'cardSelection',
        message: 'What kind of flashcard would you like to create?',
        type: 'list',
        choices: [{
            name: 'Basic Flashcards'
        }, {
            name: 'Cloze Flashcards'
        }]

            // once user input is received
    }]).then(function(answer) {

            if (answer.cardSelection === 'Basic Flashcards') {
                var begin = function() {
                    inquirer.prompt([
                        {
                            type: "input",
                            message: "How many Basic Flashcards would you like to make today?",
                            name: "quantity"
                        }
                    ]).then(function(answers) {
                        // data validation 
                        if(isNaN(answers.quantity) === false) {
                            cardCount = answers.quantity;
                            console.log("");
                            console.log(" ************ ~ CREATE YOUR CARDS ~ ************");
                            createBasicCard();
                        } else {
                            console.log("Sorry, to continue you must enter a number.");
                            console.log("");
                            begin();
                        }
                    });
                };

                // creating card 
                var createBasicCard = function() {
                    if(cardsArr.length < cardCount) {
                        inquirer.prompt([
                            {
                                type: "input",
                                message: "Front of Flashcard #" + cardIndex + ":",
                                name: "front"
                            },
                            {
                                type: "input",
                                message: " Back of Flashcard #" + cardIndex + ":",
                                name: "back"
                            }
                        ]).then(function(answers) {
                            var newCard = new BasicCard(answers.front, answers.back);
                            cardsArr.push(newCard);

                            newCard.printCard();

                            cardIndex++;

                            createBasicCard();
                        });
                    } else {
                        console.log(" ************ ~ NOW LET'S SEE WHAT YOU KNOW ~ ************");
                        review();
                    }
                };

                // to review cards that were made
                var review = function() {
                    if(reviewIndex < cardCount) {
                        inquirer.prompt([
                            {
                                type: "input",
                                message: cardsArr[reviewIndex].getFront(),
                                name: "back"
                            }
                        ]).then(function(answers) {

                            if(answers.back.toUpperCase() === cardsArr[reviewIndex].getBack().toUpperCase()) {
                                correctCount++;
                                console.log("");
                                console.log("    Congratulations, you're correct!");
                                console.log("");
                            } else {
                                console.log("");
                                console.log("    Sorry, That's incorrect!");
                                console.log("");
                            }

                            reviewIndex++;

                            review();
                        });
                    } else {
                        console.log("************ ~ RESULTS ~ ************");
                        console.log("Correct: " + correctCount + "  |  " + "Incorrect: " + (cardCount - correctCount));
                        console.log("");
                    }
                };

                console.log("");
                console.log(" ************ ~ HELLO, WELCOME TO THE FLASHCARD GENERATOR 5000 ~ ************");


                begin();
            } 

            else if (answer.cardSelection === 'Cloze Flashcards') {
                var begin = function() {
                    inquirer.prompt([
                        {
                            type: "input",
                            message: "How many Cloze-Deleted Flashcards would you like to make today?",
                            name: "quantity"
                        }
                    ]).then(function(answers) {
                        if(isNaN(answers.quantity) === false) {
                            cardCount = answers.quantity;
                            console.log("");
                            console.log(" ************ ~ CREATE YOUR CARDS ~ ************");
                            createClozeCard();
                        } else {
                            console.log("Sorry, you must enter a number.");
                            console.log("");
                            begin();
                        }
                    });
                };

                // main card-creation function
                var createClozeCard = function() {
                    if(cardsArr.length < cardCount) {
                        inquirer.prompt([
                            {
                                type: "input",
                                message: "     Full Text of Card #" + cardIndex + ":",
                                name: "text"
                            },
                            {
                                type: "input",
                                message: "Cloze Deletion of Card #" + cardIndex + ":",
                                name: "cloze"
                            }
                        ]).then(function(answers) {
                            var newCard = new ClozeCard(answers.text, answers.cloze);

                            cardsArr.push(newCard);

                            var clozeStartIndex = newCard.getFullText().toUpperCase().indexOf(newCard.getCloze().toUpperCase());
                            var clozeLength = newCard.getCloze().length;
                            // console.log(clozeStartIndex, clozeLength);

                            console.log("");
                            console.log("    " + newCard.getFullText().replace(newCard.getFullText().substring(clozeStartIndex, clozeStartIndex + clozeLength), "[" + newCard.getFullText().substring(clozeStartIndex, clozeStartIndex + clozeLength) + "]"));
                            console.log("");

                            cardIndex++;

                            createClozeCard();
                        // catches error thrown if promise is unhandled
                        }).catch(function(err) {
                            console.log("");
                            console.log("     " + err);
                            console.log("");

                            createClozeCard();
                        });
                    } else {
                        console.log(" ************ ~ NOW LET'S SEE WHAT YOU KNOW ~ ************");
                        review();
                    }
                };

                // review now that cards have been created
                var review = function() {
                    if(reviewIndex < cardCount) {
                        inquirer.prompt([
                            {
                                type: "input",
                                message: cardsArr[reviewIndex].getPartial(),
                                name: "cloze"
                            }
                        ]).then(function(answers) {

                            if(answers.cloze.toUpperCase() === cardsArr[reviewIndex].getCloze().toUpperCase()) {
                                correctCount++;
                                console.log("");
                                console.log("    Congratulations, you're correct!");
                                console.log("");
                            } else {
                                console.log("");
                                console.log("    Sorry, That's incorrect!");
                                console.log("");
                            }

                            reviewIndex++;

                            review();
                        });
                    } else {
                        console.log("************ ~ RESULTS ~ ************");
                        console.log("Correct: " + correctCount + "  |  " + "Incorrect: " + (cardCount - correctCount));
                        console.log("");
                    }
                };

                console.log("");
                console.log(" ************ ~ HELLO, WELCOME TO THE FLASHCARD GENERATOR 5000 ~ ************");

                begin();
            }
        });
}
          
choice();

