const amount = parseFloat(prompt('Enter amount of money', '0'));
const discount = parseFloat(prompt('Enter discount', '0'));

if ( validateInput(amount) || validateInput(discount)) {
    console.log('Invalid data');
} else {
    const saved = amount / 100 * discount;
    const priceWithDiscount = amount - saved;

    console.log(`
Price without discount: ${+amount.toFixed(2)}
Discount: ${+discount.toFixed(2)}%
Price with discount: ${+priceWithDiscount.toFixed(2)}
Saved:  ${+saved.toFixed(2)}
    `);
}

function validateInput(number) {
    return isNaN(number) || typeof number !== 'number' || number < 0;
}