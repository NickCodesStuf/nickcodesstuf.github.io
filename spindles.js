const ELEMENT_THICKNESS = 2;
const DISC_COLORS = ["#FF99C8", "#FCF6BD", "#D0F4DE", "#A9DEF9", "#E4C1F9"];

var drag;

document.onmousemove = (e) => {
    if (drag != null){ //gets rid of a dumb error
        drag.element.style.left = e.pageX + "px";
        drag.element.style.top = e.pageY + "px";
    }
}

document.ontouchmove = (e) => {
    if (drag != null){
        disk.element.style.transform = `translate(50%, 50%)`
        drag.element.style.left = e.pageX + "px";
        drag.element.style.top = e.pageY + "px";
    }
}

class Stack{
    constructor(parts){
        this.parts = parts;
    }
    getTop(){return this.parts[this.parts.length-1];}
    setTop(part){this.parts.push(part);}
    takeTop(){
        let top = this.parts[this.parts.length-1];
        this.parts.pop();
        return top;
    }
}

class Disk{
    constructor(size, parent){
        this.size = size;
        this.color = DISC_COLORS[size%DISC_COLORS.length];
        this.element = document.createElement("div");
        this.element.classList.add("disk");
        this.element.style.width = `${ELEMENT_THICKNESS + size * 1}vw`;
        this.element.style.height = `${ELEMENT_THICKNESS}vw`
        this.element.style.backgroundColor = this.color;
        this.parent = parent;
    }
}

class Dowel{
    constructor(height, width, parent=document.body, interactive=false){
        //The main element
        this.hitbox = document.createElement("div");
        this.hitbox.classList.add("dowel");
        this.hitbox.style.width = `${width}vw`;
        this.hitbox.style.height = `${height + ELEMENT_THICKNESS}vw`;
        parent.appendChild(this.hitbox);
        //The Shaft
        this.shaft = document.createElement("div");
        this.shaft.classList.add("shaft");
        this.shaft.style.height = `${height}vw`;
        this.shaft.style.width = `${ELEMENT_THICKNESS}vw`
        this.hitbox.appendChild(this.shaft);
        //The base
        this.bottom = document.createElement("div");
        this.bottom.classList.add("bottom");
        this.bottom.style.width = `${width}vw`;
        this.bottom.style.height = `${ELEMENT_THICKNESS}vw`
        this.bottom.style.transform = `translate(0%, ${height}vw`;
        this.hitbox.appendChild(this.bottom);
        //stack
        this.stack = new Stack([]);
        this.height = height;
        this.width = width;
        //event Listener
        if (interactive){
            this.hitbox.onmousedown = (e) => {
                if (drag == null){
                    const disk = this.stack.takeTop();
                    disk.element.style.transform = `translate(0px, 0px)`
                    disk.element.style.left = e.pageX + "px";
                    disk.element.style.top = e.pageY + "px";
                    document.body.appendChild(disk.element);
                    drag = disk;
                }
                else{
                    this.addDisk(drag.size);
                    drag.element.remove();
                    drag = null;
                }
            }
            this.hitbox.touchstart = (e) => {
                if (drag == null){
                    const disk = this.stack.takeTop();
                    drag = disk;
                }else{
                    this.addDisk(drag.size);
                    drag.element.remove();
                    drag = null
                }
            }
        }
    }
    renderDisks(){
        let translationCount = 1;
        this.stack.parts.forEach((disk) => {
            this.hitbox.appendChild(disk.element);
            disk.element.style.transform = `translate(0%, ${this.height - ELEMENT_THICKNESS * translationCount}vw)`
            translationCount++;
        });
    }
    addDisk(size){
        if (this.stack.parts.length == 0 || size <= this.stack.getTop().size){
            this.stack.setTop(new Disk(size, this));
            this.renderDisks();
        }else{
            if(drag != null){
                drag.parent.addDisk(drag.size);
            }
        }
    }
    takeDisk(){
        const tempDisk = this.stack.takeTop();
        tempDisk.element.remove();
        return tempDisk.size;
    }
    findLength(){
        return this.stack.parts.length
    }
}

//This is perhaps the ugliest code that I have ever written
const challangeA = new Dowel(25, 25, document.getElementById("challenge"), true);
const challangeB = new Dowel(25, 25, document.getElementById("challenge"), true);
const challangeC = new Dowel(25, 25, document.getElementById("challenge"), true);
for (let i = 7; i >= 0; i--) {challangeA.addDisk(i+3);}

const simpleA = new Dowel(25, 25, document.getElementById("simpleton"), true);
const simpleB = new Dowel(25, 25, document.getElementById("simpleton"), true);
simpleA.addDisk(3);

const impossibleA = new Dowel(25, 25, document.getElementById("impossible"), true);
const impossibleB = new Dowel(25, 25, document.getElementById("impossible"), true);
for (let i = 1; i >= 0; i--) {impossibleA.addDisk(i+3);}

const simpleOneA = new Dowel(25, 25, document.getElementById("simpleOne"), true);
const simpleOneB = new Dowel(25, 25, document.getElementById("simpleOne"), true);
const simpleOneC = new Dowel(25, 25, document.getElementById("simpleOne"), true);
simpleOneA.addDisk(3);

const simpleTwoA = new Dowel(25, 25, document.getElementById("simpleTwo"), true);
const simpleTwoB = new Dowel(25, 25, document.getElementById("simpleTwo"), true);
const simpleTwoC = new Dowel(25, 25, document.getElementById("simpleTwo"), true);
for (let i = 1; i >= 0; i--) {simpleTwoA.addDisk(i+3);}

const simpleThreeA = new Dowel(25, 25, document.getElementById("simpleThree"), true);
const simpleThreeB = new Dowel(25, 25, document.getElementById("simpleThree"), true);
const simpleThreeC = new Dowel(25, 25, document.getElementById("simpleThree"), true);
for (let i = 2; i >= 0; i--) {simpleThreeA.addDisk(i+3);}

const simpleFourA = new Dowel(25, 25, document.getElementById("simpleFour"), true);
const simpleFourB = new Dowel(25, 25, document.getElementById("simpleFour"), true);
const simpleFourC = new Dowel(25, 25, document.getElementById("simpleFour"), true);
for (let i = 3; i >= 0; i--) {simpleFourA.addDisk(i+3);}

//animated examples
const annotationOneElement = document.getElementById("annotationOne");
const solutionOneDiv = document.getElementById("solutionOne");
const solutionOneA = new Dowel(25, 25, solutionOneDiv, false);
const solutionOneB = new Dowel(25, 25, solutionOneDiv, false);
const solutionOneC = new Dowel(25, 25, solutionOneDiv, false);
solutionOneA.addDisk(3);
let solutionOneCounter = 1;
function stepSolutionOne(step){
    switch(step%2){
        case 1:
            solutionOneC.addDisk(solutionOneA.takeDisk());
            annotationOneElement.innerHTML = "P1 solved";
            break;
        case 0:
            for (let i = 0; i < solutionOneC.findLength()+1; i++) {var loose = solutionOneC.takeDisk();}
            annotationOneElement.innerHTML = "starting position";
            solutionOneA.addDisk(3);
    }
}
solutionOneDiv.onmousedown = (e) => {stepSolutionOne(solutionOneCounter++);};
solutionOneDiv.touchstart = (e) => {stepSolutionOne(solutionOneCounter++);};


const annotationTwoElement = document.getElementById("annotationTwo");
const solutionTwoDiv = document.getElementById("solutionTwo");
const solutionTwoA = new Dowel(25, 25, solutionTwoDiv, false);
const solutionTwoB = new Dowel(25, 25, solutionTwoDiv, false);
const solutionTwoC = new Dowel(25, 25, solutionTwoDiv, false);
for (let i = 1; i >= 0; i--) {solutionTwoA.addDisk(i+3);}
let solutionTwoCounter = 1;
function stepSolutionTwo(step){
    switch(step%4){
        case 1:
            solutionTwoB.addDisk(solutionTwoA.takeDisk());
            annotationTwoElement.innerHTML = "P1'";
            break;
        case 2:
            solutionTwoC.addDisk(solutionTwoA.takeDisk());
            annotationTwoElement.innerHTML = "Move the base";
            break;
        case 3:
            solutionTwoC.addDisk(solutionTwoB.takeDisk());
            annotationTwoElement.innerHTML = "P2 solved";
            break;
        case 0:
            annotationTwoElement.innerHTML = "starting position";
            for (let i = 0; i < 2; i++) {var loose = solutionTwoC.takeDisk();}
            for (let i = 1; i >= 0; i--) {solutionTwoA.addDisk(i+3);}
    }
}
solutionTwoDiv.onmousedown = (e) => {stepSolutionTwo(solutionTwoCounter++);};
solutionTwoDiv.touchstart = (e) => {stepSolutionTwo(solutionTwoCounter++);};


const annotationThreeElement = document.getElementById("annotationThree");
const solutionThreeDiv = document.getElementById("solutionThree");
const solutionThreeA = new Dowel(25, 25, solutionThreeDiv, false);
const solutionThreeB = new Dowel(25, 25, solutionThreeDiv, false);
const solutionThreeC = new Dowel(25, 25, solutionThreeDiv, false);
for (let i = 2; i >= 0; i--) {solutionThreeA.addDisk(i+3);}
let solutionThreeCounter = 1;
function stepSolutionThree(step){
    switch(step%8){
        case 1:
            solutionThreeC.addDisk(solutionThreeA.takeDisk());
            annotationThreeElement.innerHTML = "P1 => P2'";
            break;
        case 2:
            solutionThreeB.addDisk(solutionThreeA.takeDisk());
            annotationThreeElement.innerHTML = "P2'";
            break;
        case 3:
            solutionThreeB.addDisk(solutionThreeC.takeDisk());
            break;
        case 4:
            solutionThreeC.addDisk(solutionThreeA.takeDisk());
            annotationThreeElement.innerHTML = "move base";
            break;
        case 5:
            solutionThreeA.addDisk(solutionThreeB.takeDisk());
            annotationThreeElement.innerHTML = "P2";
            break;
        case 6:
            solutionThreeC.addDisk(solutionThreeB.takeDisk());
            break;
        case 7:
            solutionThreeC.addDisk(solutionThreeA.takeDisk());
            annotationThreeElement.innerHTML = "P3 solved";
            break;
        case 0:
            for (let i = 0; i < 3; i++) {var loose = solutionThreeC.takeDisk();}
            for (let i = 2; i >= 0; i--) {solutionThreeA.addDisk(i+3);}
    }
}
solutionThreeDiv.onmousedown = (e) => {stepSolutionThree(solutionThreeCounter++);};
solutionThreeDiv.touchstart = (e) => {stepSolutionThree(solutionThreeCounter++);};