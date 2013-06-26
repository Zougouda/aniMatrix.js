//Animatrix.js
//
////Author: Cyril ANNETTE (cyril.annette@supinfo.com)
//use: new Matrix(DOM dom_element_containing_the_matrix(default "body"), your_custom_message(default empty), number_of_new_letter_by_frame(default4), your_width(default 800px), your_height(default(600px)

function Matrix(domElement, message, spawnNumberByFrame, width, height)
{
    this.maxWidth = 800;
    this.maxHeight = 600;
    this.displayRate = 1000/60;
    this.defaultLetterByFrame = 5;
    
    this.domElement = (isset(domElement)) ? domElement: document.querySelector("body");
    this.message = (isset(message)) ? message : null;
    this.letterByFrame = (isset(spawnNumberByFrame)) ? spawnNumberByFrame : this.defaultLetterByFrame;
    this.width = (isset(width)) ? width : this.maxWidth;
    this.height = (isset(height)) ? height : this.maxHeight;
    
    this.main = function()
    {
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("id", "animatedMatrix");
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);
        this.domElement.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = "10px Arial";
        
        //        this.letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        //        this.letters = ["0", "1"];
        this.letters = ["0", "1", "ｦ", "ｧ", "ｨ", "ｩ", "ｪ", "ｪ", "ｫ", "ｬ", "ｮ", "ｯ", "ｱ", "ｲ", "ｳ", "ｵ", "ｶ", "ｷ", "ｸ", "ｹ", "ｻ", "ｽ", "ｾ", "ﾈ", "ﾔ", "ﾒ", "ﾇ"];
        this.movingElements = {};
        this.elementsIndex = 0;
        
        var self = this;
                
        window.setInterval(function(){
            self.game(self);
        }, this.displayRate);
    }
    
    this.game = function(obj)
    {
        obj.ctx.clearRect(0, 0, obj.width, obj.height);
        //BACKGROUND DRAWING
        obj.ctx.fillStyle = "rgba(0,0,0,1)";
        obj.ctx.fillRect(0, 0, obj.width, obj.height);
        
        for(var i = 0; i < obj.letterByFrame; i++)
        {
            obj.spawnLetter();
        }
        
        this.ctx.font = "10px Arial";
        for(i in obj.movingElements)
        {
            obj.movingElements[i].draw();
            obj.movingElements[i].update();
        }
        
        this.displayMessage();
    }
    
    this.spawnLetter = function()
    {
        var x = Math.random() * this.width >> 0;
        var y = 0;
        var letter = this.letters[Math.random() * this.letters.length >> 0];
        var letterObject = new MatrixLetter(x, y, letter, Math.random()*10+0.5);
        letterObject.matrix = this;
        letterObject.id = this.elementsIndex;
        this.movingElements[this.elementsIndex] = letterObject;
        this.elementsIndex++;
    }
    
    this.displayMessage = function()
    {
        this.ctx.font = "42px Helvetica";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "top";
        this.ctx.fillText(this.message , this.width / 2, this.height / 2);
    }
    
    this.main();
}

function MatrixLetter(x, y, letter, speed)
{
    this.x = x;
    this.y = y;
    this.letter = letter;
    this.speed = (isset(speed)) ? speed : 500;
    
    this.draw = function()
    {
        this.matrix.ctx.fillStyle = "rgba(0,255,0,1)";
        this.matrix.ctx.fillText(letter, this.x, this.y);
    }
    
    this.update = function()
    {
        this.y += this.speed;
        if(this.y > this.matrix.height)
        {
            delete this.matrix.movingElements[this.id];
            delete this;
        }
    }
}

function isset(myVariable)
{
    return (typeof myVariable != "undefined") ? true : false;
}