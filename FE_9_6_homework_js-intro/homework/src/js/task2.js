const a = parseFloat(prompt('a Length', '0'));
const b = parseFloat(prompt('b Length', '0'));
const angle = parseFloat(prompt('angle', '0'));

if(validateInput(a) || validateInput(b) || validateInput(angle)){
    console.log('Invalid data')
}else{
    const c = getSideC(a, b, angle);
    const perimeter = getPerimeter(a, b, c);
    const area = getArea(perimeter/2, a, b, c);

    console.log(`
c length: ${+c.toFixed(2)} 
Triangle square: ${+area.toFixed(2)}
Triangle perimeter: ${+perimeter.toFixed(2)}
    `);
}

function validateInput(number) {
    return isNaN(number) || typeof number !== 'number' || number < 0;
}

function getSideC(sideA, sideB, angle){
    const ANGLE_SUM = 180;
    const gamma = Math.PI/ANGLE_SUM * parseFloat(angle);
    return Math.sqrt(a*a + b*b - 2 * a * b * Math.cos(gamma));
}

function getPerimeter(a, b, c) {
    return a + b + c;
}

function getArea(perimeter, a, b, c){
    return Math.sqrt(perimeter * ((perimeter - a) * (perimeter - b) * (perimeter - c)));
}