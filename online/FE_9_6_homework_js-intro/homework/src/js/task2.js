const sideA = parseFloat(prompt('Enter side a length', '0'));
const sideB = parseFloat(prompt('Enter side b length', '0'));
const angle = parseFloat(prompt('Enter angle', '0'));

const ANGLE_SUM = 180;

const outputTemplate = (sideC, square, perimeter) => `
c length: ${+sideC.toFixed(2)} 
Triangle square: ${+square.toFixed(2)}
Triangle perimeter: ${+perimeter.toFixed(2)}
`;

let output;

if (validateInput(sideA) || validateInput(sideB) || validateInput(angle) || angle > ANGLE_SUM) {
    output = 'Invalid data';
} else {
    const sideC = getSideC(sideA, sideB, angle);
    const perimeter = sideA + sideB + sideC;
    const square = getSquare(perimeter/2, sideA, sideB, sideC);
    output = outputTemplate(sideC, square, perimeter);
}

function validateInput(number) {
    return isNaN(number) || typeof number !== 'number' || number < 0;
}

function getSideC(sideA, sideB, angle) {    
    const gamma = Math.PI / ANGLE_SUM * angle;
    return Math.sqrt(sideA*sideA + sideB*sideB - 2 * sideA * sideB * Math.cos(gamma));
}

function getSquare(perimeter, sideA, sideB, sideC) {
    return Math.sqrt(perimeter * ((perimeter - sideA) * (perimeter - sideB) * (perimeter - sideC)));
}

console.log(output);