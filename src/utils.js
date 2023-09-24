export function distance(ax, ay, bx, by) {
    const xDistance = bx - ax;
    const yDistance = by - ay;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

export function getRandomIntFromRange(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

export function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

export function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocityX - otherParticle.velocityX;
    const yVelocityDiff = particle.velocityY - otherParticle.velocityY;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        const u1 = rotate({
            x: particle.velocityX,
            y: particle.velocityY
        }, angle);
        
        const u2 = rotate({
            x: otherParticle.velocityX,
            y: otherParticle.velocityY
        }, angle);
        
        const v1 = {
            x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
            y: u1.y
        }
        console.log();
        const v2 = {
            x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
            y: u2.y
        }

        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        particle.velocityX = vFinal1.x;
        particle.velocityY = vFinal1.y;

        otherParticle.velocityX = vFinal2.x;
        otherParticle.velocityY = vFinal2.y;
    }
}

export function generateRandomColor() {
    const _randomInt = () => Math.random() * 255;

    return `rgb(${_randomInt()}, ${_randomInt()}, ${_randomInt()})`;
}