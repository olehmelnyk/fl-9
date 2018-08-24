function findType(param) {
    return typeof param;
}

function forEach(array, fn) {
    for(let i = 0; i < array.length; i++) {
        fn(array[i]);
    }
}

function map(array, fn) {
    let newArray = [];

    for(let i = 0; i < array.length; i++) {
        newArray.push(fn(array[i]));
    }

    return newArray;
}

function filter(array, fn) {
    let newArray = [];

    for(let i = 0; i < array.length; i++) {
        if(fn(array[i])){
            newArray.push(array[i]);
        }
    }

    return newArray;
}

function getAdultAppleLovers(array) {
    let newArray = [];

    for(let i = 0; i < array.length; i++) {
        if(array[i].age > 18 && array[i].favoriteFruit === 'apple') {
            newArray.push(array[i].name);
        }
    }

    return newArray;
}

function keys(obj) {
    let newArray = [];

    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            newArray.push(key);
        }
    }

    return newArray;
}

function values(obj) {
    let newArray = [];

    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            newArray.push(obj[key]);
        }
    }

    return newArray;
}

function showFormattedDate(date) {
    const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return `It is ${date.getDate()} of ${shortMonthNames[date.getMonth()]}, ${date.getFullYear()}`;
}