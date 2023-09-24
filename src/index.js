import "./style.scss";

import { generateRandomColor, getRandomIntFromRange } from "./utils";

/**
 * @type { HTMLCanvasElement }
 */
const canvas = document.querySelector("#workflow");
const context = canvas.getContext("2d");
const startTime = Date.now();
let elapsedTime = 0;

let mousePos = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("mousemove", e => {
    mousePos = {
        x: e.clientX,
        y: e.clientY,
    }
})


class Particle {
    constructor(effect) {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.radians = Math.random() * Math.PI * 2;
        this.velocity = 0.01;
        this.effect = effect;
        this.radius = getRandomIntFromRange(5, 10);
        this.distanceFromCenter = getRandomIntFromRange(20, 100);
        this.color = generateRandomColor();
        this.lastMouse = { x: this.x, y: this.y };
    }

    update() {
        this.lastPos = {
            x: this.x,
            y: this.y
        }
        this.lastMouse.x += (mousePos.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mousePos.y - this.lastMouse.y) * 0.05;

        this.radians += this.velocity;

        this.x = mousePos.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = mousePos.y + Math.sin(this.radians) * this.distanceFromCenter;

        this.draw();
    }

    draw() {
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = this.radius;
        context.moveTo(this.lastPos.x, this.lastPos.y);
        context.lineTo(this.x, this.y);
        context.stroke();
        context.closePath();
    }
}

class Effect {
    constructor() {
        this.particlesCount = 100;
        this.particles = [];
    }

    animate() {
        context.globalAlpha = 2;
        context.fillStyle = "rgba(255, 255, 255, 0.05)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        // context.clearRect(0, 0, canvas.width, canvas.height);

        for (const particle of this.particles) {
            particle.update();
        }

        window.requestAnimationFrame(this.animate.bind(this));
    }

    init() {
        for (let i = 0; i < this.particlesCount; i++) {
            this.particles.push(new Particle(
                this
            ));
        }

        this.animate();
    }
}

const effect = new Effect();

effect.init();
