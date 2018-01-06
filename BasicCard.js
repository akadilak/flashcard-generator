var BasicCard = function(front, back) {
  this.front = front;
  this.back = back;

 
  this.getFront = function() {
    return this.front;
  };
  this.getBack = function() {
    return this.back;
  };

  // print card contents in command line
  this.printCard = function() {
    console.log("");
    console.log("    " + this.getFront() + "  |  " + this.getBack());
    console.log("");
  };
};


module.exports = BasicCard;