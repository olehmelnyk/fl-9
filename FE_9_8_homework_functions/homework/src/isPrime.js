function isPrime(integer) {
    for(let i = 2; i < integer; i++) {
        if(integer % i === 0) {
            return false;
        }
    }

    return integer !== 1;
}