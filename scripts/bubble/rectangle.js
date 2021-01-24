import { ctx } from '../bubble/canvas.js'       

// pre-genesis soup
export default class Rectangle {
    constructor(x, y, width, height, color, value) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.value = value;
    }

    draw( h = this.x, v = this.y, wide = this.width, high = this.height, color = this.color) {
        if(h != this.x) {
            this.x = h;                         // this method of rectanlge class is responsible for
        }                                       // rendering the rectangles on the canvas

        if( v != this.y ) {
            this.y = v;
        }

        if( wide != this.width) {
            this.width = wide;
        }

        if( high != this.height) {
            this.height = high;
        }

        if(color != this.color) {
            this.color = color;
        }
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.font = '20px Arial';
        ctx.fillText(this.value, this.x+5, this.y-2);
    
    }
    update(destination, direction) {
        
        if(direction == "forward") {
          if(this.x < destination ) {   // the update method is responsible for the swapping animation
            this.x += 10;
          }
      
       }
     
      if(direction == "backward") {
            if(this.x > destination) {
              this.x -= 10;
            }
       }
        this.draw(this.x, this.y, this.width, this.height, this.color);
    }

    
} 
