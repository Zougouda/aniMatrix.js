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


    //REQUEST ANIMATION FRAME
    window.requestAnimFrame = function(){
        return (
                window.requestAnimationFrame       || 
                window.webkitRequestAnimationFrame || 
                window.mozRequestAnimationFrame    || 
                window.oRequestAnimationFrame      || 
                window.msRequestAnimationFrame     || 
                function(/* function */ callback){
                    window.setTimeout(DISPLAY_RATE);
                }
               );
    }();

    this.main = function()
    {
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("id", "animatedMatrix");
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);
        this.domElement.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        //        this.letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        //        this.letters = ["0", "1"];
        this.letters = ["0", "1", "ｦ", "ｧ", "ｨ", "ｩ", "ｪ", "ｪ", "ｫ", "ｬ", "ｮ", "ｯ", "ｱ", "ｲ", "ｳ", "ｵ", "ｶ", "ｷ", "ｸ", "ｹ", "ｻ", "ｽ", "ｾ", "ﾈ", "ﾔ", "ﾒ", "ﾇ"];
        this.movingElements = {};
        this.elementsIndex = 0;

        var self = this;

        this.mouseListener = 
            this.canvas.addEventListener("mousemove", function(event){
                if(isset(self.mouseX))
                self.lastMouseX = self.mouseX;
            self.mouseX = event.pageX;

            if(isset(self.mouseY))
                self.lastMouseY = self.mouseY;
            self.mouseY = event.pageY;

            if(isset(self.lastMouseX) && isset(self.lastMouseY) )
            {
                for(i in self.movingElements){
                    var theElement = self.movingElements[i];
                    theElement.x += ( ( self.lastMouseX - self.mouseX)/10*theElement.speed );
                    //theElement.y += ( ( self.lastMouseY -  self.mouseY )/10*theElement.speed );
                }
            }
            });    

        /*window.setInterval(function(){
            self.game(self);
        }, this.displayRate);*/

        self.game(self);
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

        for(i in obj.movingElements)
        {
            obj.movingElements[i].draw();
            obj.movingElements[i].update();
        }

        this.displayMessage();

       requestAnimFrame(function(){
          obj.game(obj); 
       });
    }

    this.spawnLetter = function()
    {
        var x = Math.random() * this.width >> 0;
        var y = 0;
        var letter = this.letters[Math.random() * this.letters.length >> 0];
        var letterObject = new MatrixLetter(x, y, letter, Math.random()*(10-0.5)+0.5);
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
    this.speed = (isset(speed)) ? speed : 1;
    this.size = 2*this.speed;

    this.draw = function()
    {
        this.matrix.ctx.font = this.size + "px Arial";
        this.matrix.ctx.fillStyle = "rgba(0,255,0,1)";
        this.matrix.ctx.fillText(letter, this.x, this.y);
        this.matrix.ctx.fillStyle = "rgba(0,255,0,0.6)";
        this.matrix.ctx.fillText(letter, this.x, this.y - this.size);
        this.matrix.ctx.fillStyle = "rgba(0,255,0,0.2)";
        this.matrix.ctx.fillText(letter, this.x, this.y - this.size*2);
        this.matrix.ctx.fillStyle = "rgba(0,255,0,1)";
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
