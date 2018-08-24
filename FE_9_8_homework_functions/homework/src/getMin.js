function getMin() {
    // return Math.min(...arguments); // <- the preferred option, but sure - I can make my own min() function

    let min = arguments[0];

    for(let i = 1; i <= arguments.length; i++) {
        if(arguments[i] < min) {
            min = arguments[i];
        }
    }

    return min;
}