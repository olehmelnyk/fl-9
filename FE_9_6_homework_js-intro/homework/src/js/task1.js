const amount = parseFloat(prompt('Enter amount of money', '0'));
const discount = parseFloat(prompt('Enter discount', '0'));

const outputTemplate = (amount, discount, priceWithDiscount, saved) => `
Price without discount: ${+amount.toFixed(2)}
Discount: ${+discount.toFixed(2)}%
Price with discount: ${+priceWithDiscount.toFixed(2)}
Saved: ${+saved.toFixed(2)}
`;

let output;

if (validateInput(amount) || validateInput(discount) || discount > 100) {
    output = 'Invalid data';
} else {
    const saved = amount / 100 * discount;
    const priceWithDiscount = amount - saved;
    output = outputTemplate(amount, discount, priceWithDiscount, saved);
}

function validateInput(number) {
    return isNaN(number) || typeof number !== 'number' || number < 0;
}

console.log(output);