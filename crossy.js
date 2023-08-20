const river = document.getElementById("river");
let dist = river.offsetWidth / 10;
let h = river.offsetHeight;

class LillyPad{
    constructor(x, y, size, parent){
        this.x = x;
        this.y = y;
        this.size = size;
        this.parent = parent;
        this.hitbox = document.createElement("div");
        this.topHalf = document.createElement("div");
        this.bottomHalf = document.createElement("div");
        this.render();
    }

    resize(size, y){
        this.size = size;
        this.y = y;
    }

    render(){
        this.hitbox.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.hitbox.style.position = "absolute";
        this.parent.appendChild(this.hitbox);

        this.topHalf.classList.add("half");
        this.topHalf.style.width = `${this.size}px`;
        this.topHalf.style.height = `${this.size/2}px`;
        this.topHalf.style.borderRadius = `${this.size}px ${this.size/2}px ${this.size/3}px ${0}px`;
        this.hitbox.appendChild(this.topHalf);
        
        this.bottomHalf.classList.add("half");
        this.bottomHalf.style.width = `${this.size}px`;
        this.bottomHalf.style.height = `${this.size/2}px`;
        this.bottomHalf.style.borderRadius = `${0}px ${this.size/3}px ${this.size/2}px ${this.size}px`;
        this.hitbox.appendChild(this.bottomHalf);
    }

    step(distance){
        this.x += distance * dist;
        this.render();
    }
}

//this is hardcoded because I am short on time
const lillya = new LillyPad(0, 0, h/3, river);
const lillyb = new LillyPad(dist, 2/3*h, h/3, river);
let chungoid = 0;
river.onmousedown = (e) => {
    if (chungoid<6){
        if(chungoid%2==0){
            lillya.step(2.5)
        }else{
            lillyb.step(2.5)
        }
        chungoid++;
    }
}

function displayWindowSize(){
    dist = river.offsetWidth / 10;
    h = river.offsetHeight;
    lillya.resize(h/3, 2/3*h);
    lillyb.resize(h/3, 0);
    lillya.render();
    lillyb.render();
    console.log("resizing");
}

window.addEventListener("resize", displayWindowSize);
