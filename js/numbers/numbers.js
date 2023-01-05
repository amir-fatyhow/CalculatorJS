let num = document.querySelector(".input-numbers");
let buttonNumbers = document.querySelector(".button-go-numbers");
let resultNumbers = document.querySelector(".result-numbers");

let sum = 0;
let prev = 0;
let next = 1;

let arr = [prev, next];

buttonNumbers.addEventListener('click', function() {
    let max = +num.value;
    while (prev + next <= +max) {
        sum = prev + next;
        arr.push(sum);

        prev = next;
        next = sum;
    }
    resultNumbers.textContent = "" + arr;
});