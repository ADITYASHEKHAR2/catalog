const fs = require('fs');

function decodeValue(base, value) {
    let result = 0;
    let power = 1;

    for (let i = value.length - 1; i >= 0; --i) {
        let digit;
        if (value[i] >= '0' && value[i] <= '9') {
            digit = value[i] - '0'; 
        } else if (value[i] >= 'A' && value[i] <= 'Z') {
            digit = value.charCodeAt(i) - 'A'.charCodeAt(0) + 10; 
        } else if (value[i] >= 'a' && value[i] <= 'z') {
            digit = value.charCodeAt(i) - 'a'.charCodeAt(0) + 10; 
        } else {
            throw new Error(`Invalid character in value: ${value[i]}`);
        }

        if (digit >= base) {
            throw new Error(`Digit ${digit} is not valid for base ${base}`);
        }

        result += digit * power;
        power *= base;
    }
    return result;
}

function lagrangeInterpolation(points, k) {
    let c = 0.0;

    for (let i = 0; i < k; ++i) {
        let term = points[i][1]; 
        for (let j = 0; j < k; ++j) {
            if (i !== j) {
                term *= (0 - points[j][0]) / (points[i][0] - points[j][0]);
            }
        }
        c += term;
    }
    return c;
}

const input = require('./ss.json'); 

function main() {
    const n = input.keys.n;
    const k = input.keys.k;

    const points = [];

    for (const key in input) {
        if (key !== "keys") {
            const x = parseInt(key); 
            const base = parseInt(input[key].base); 
            const y_encoded = input[key].value; 
            const y = decodeValue(base, y_encoded); 
            points.push([x, y]); 
        }
    }

    const secret = lagrangeInterpolation(points, k); 
    console.log(`constant term c = ${Math.round(secret)}`); 
}

main();  
