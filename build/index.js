"use strict";
class Flower {
    constructor() {
        this.maxLevel = 4; // determines depth of the fractional: how many time sbranches split into segments
        this.branches = 2;
        this.sides = 5;
        this.scale = .5; // how much smaller these segments comparing to their parent branch
        this.spread = .5; // the angle in between the parents branches and their segments
        this.color = 'hsl(' + Math.random() * 360 + ',100%,50%)';
        this.RandomLineWidth = Math.floor(Math.random() * 20 + 10); // between 10 and 20;
        this.DrawFractional = () => {
            this.context.save();
            this.context.lineWidth = this.RandomLineWidth;
            this.context.strokeStyle = this.color;
            this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
            for (let i = 0; i < this.sides; i++) {
                this.context.rotate((Math.PI * 2) / this.sides);
                this.DrawBranch(0);
            }
            this.context.restore(); // whatever after restore won't be affected by transforms
        };
        this.randomizeFractionals = () => {
            this.RandomLineWidth = Math.floor(Math.random() * 20 + 10); // between 10 and 20;
            this.sides = Math.floor(Math.random() * 7 + 2); // between 2 and 9
            this.scale = Math.random() * .2 + .4; // how much smaller these segments comparing to their parent branch
            this.spread = Math.random() * 2.9 + .1; // the angle in between the parents branches and their segments
            this.color = 'hsl(' + Math.random() * 360 + ',100%,50%)';
            this.DrawFractional();
        };
        this.reset = () => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.randomizeFractionals();
        };
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.size = this.canvas.width < this.canvas.height ? this.canvas.width * .2 : this.canvas.height * .2; // the size now is linked to which one is smaller (height or width)
        this.context.fillStyle = 'coral';
        this.context.lineWidth = 10;
        this.context.lineCap = 'round';
        this.context.shadowColor = 'rgba(0,0,0,.7)';
        this.context.shadowOffsetX = 10;
        this.context.shadowOffsetY = 5;
        this.context.shadowBlur = 10;
    }
    DrawBranch(level) {
        if (level > this.maxLevel)
            return;
        this.context.beginPath();
        this.context.moveTo(0, 0); // start from
        this.context.lineTo(this.size, 0); // ends at
        this.context.stroke();
        for (let i = 0; i < this.branches; i++) {
            this.context.save();
            this.context.translate(this.size - (this.size / this.branches) * i, 0);
            this.context.scale(this.scale, this.scale);
            this.context.save();
            this.context.rotate(this.spread);
            this.DrawBranch(level + 1);
            this.context.restore();
            this.context.save();
            this.context.rotate(-this.spread);
            this.DrawBranch(level + 1);
            this.context.restore();
            this.context.restore();
        }
    }
}
const RandomFlower = new Flower();
RandomFlower.DrawFractional();
// random fractionals
document.getElementById("draw").addEventListener('click', RandomFlower.randomizeFractionals);
document.getElementById("reset").addEventListener('click', RandomFlower.reset);
