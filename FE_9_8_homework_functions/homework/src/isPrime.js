function isPrime(number) {
    let isPrime = true;
    let minPrime = 2;
    const divider = 2;
    const halfNumber = number / divider;

    if(number < minPrime) {
        return false
    }
    
    for(let i = minPrime; i <= halfNumber; i++) {
        if(number % i === 0) {
            isPrime = false;
            
            break;
        }
    }

    return isPrime;
}